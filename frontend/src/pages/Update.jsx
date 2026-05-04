import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Added 'photo' to state to hold the EXISTING image URL string from the database
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    year: "",
    traits: "",
    emoji: "",
    photo: "",
  });

  // Separate state to hold the NEW file if the user decides to change it
  const [newPhoto, setNewPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5005/api/people/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFormData(data); // Pre-fills text AND the existing photo URL
      } catch (error) {
        console.error("Error fetching person for update", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPerson();
  }, [id]);

  // Handle text/number inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the new file input separately
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    } else {
      setNewPhoto(null); // If they clear the file input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // 1. Switch to FormData
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("emoji", formData.emoji);
      dataToSend.append("place", formData.place);
      dataToSend.append("year", formData.year);
      dataToSend.append("traits", formData.traits);

      // 2. ONLY append the photo if a NEW one was selected
      if (newPhoto) {
        dataToSend.append("photo", newPhoto);
      }

      const res = await fetch(`http://localhost:5005/api/people/${id}`, {
        method: "PUT",
        headers: {
          // ⚠️ NO "Content-Type": "application/json" allowed here!
          Authorization: `Bearer ${token}`,
        },
        body: dataToSend, // 3. Send FormData, not JSON
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.error("Failed to update person");
      }
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start pt-16 px-4 bg-gradient-to-b from-[#65C3C8] to-[#EF9FBC]/30">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl w-full max-w-md border border-white/50 p-8 space-y-4"
      >
        <h2 className="text-4xl font-bold text-center mb-2">Update Person</h2>

        {/* CURRENT PHOTO PREVIEW */}
        {formData.photo && (
          <div className="flex justify-center mb-2">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`http://localhost:5005/${formData.photo.replace(/\\/g, "/")}`}
                  alt="Current"
                />
              </div>
            </div>
          </div>
        )}

        {/* NEW PHOTO INPUT (Optional) */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">
              Change Photo (Optional)
            </span>
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Emoji</span>
          </label>
          <input
            type="text"
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Place</span>
          </label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Year</span>
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Traits</span>
          </label>
          <input
            type="text"
            name="traits"
            value={formData.traits}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="card-actions justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
