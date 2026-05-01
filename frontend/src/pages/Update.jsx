import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  //get the id from the url
  const { id } = useParams();
  const navigate = useNavigate(); //used to go back to the profile page

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    year: "",
    traits: "",
    emoji: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5005/api/people/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFormData(data); //pre-fill the form with existing data
      } catch (error) {
        console.error("Error fetching person for update", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPerson();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5005/api/people/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), //send new data
      });
      if (res.ok) {
        //if successful send the user bback to the profile page
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
    <div className="min-h-screen w-full  flex justify-center items-start pt-16 px-4 bg-gradient-to-b from-[#65C3C8] to-[#EF9FBC]/30">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-xl w-full max-w-md border border-white/50 p-8 space-y-4"
      >
        <h2 className="text-4xl font-bold text-center mb-2">Update Person</h2>
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
            type="text"
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
          <button type="button" onClick={() => navigate("/")}>
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
