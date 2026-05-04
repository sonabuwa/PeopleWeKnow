import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const Addnew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Added 'photo' to state
  const [personForm, setpersonForm] = useState({
    name: "",
    emoji: "",
    place: "",
    year: "",
    traits: "",
    photo: null,
  });

  // 2. Updated to handle File inputs vs Text inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      // If it's the file input, grab the first file
      setpersonForm((prev) => ({
        ...prev,
        photo: files[0],
      }));
    } else {
      // If it's a normal text/number input, grab the value
      setpersonForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // 3. Create a FormData object instead of using JSON.stringify
      const formData = new FormData();
      formData.append("name", personForm.name);
      formData.append("emoji", personForm.emoji);
      formData.append("place", personForm.place);
      formData.append("year", personForm.year);
      formData.append("traits", personForm.traits);

      // Only append photo if a file was actually selected
      if (personForm.photo) {
        formData.append("photo", personForm.photo);
      }

      const res = await fetch(`https://people-we-know.onrender.com/api/people`, {
        method: "POST",
        headers: {
          // ⚠️ CRITICAL: Do NOT set 'Content-Type': 'application/json' here!
          // The browser will automatically set the correct 'multipart/form-data' boundary.
          Authorization: `Bearer ${token}`,
        },
        body: formData, // 4. Send formData instead of JSON
      });

      if (res.ok) {
        // Reset form
        setpersonForm({
          name: "",
          emoji: "",
          place: "",
          year: "",
          traits: "",
          photo: null,
        });
        e.target.reset(); // Clears the actual file input UI
        toast.success("Person added successfully!");
        navigate("/dashboard");
      } else {
        // Handle backend errors (like "Photo is required" or duplicate names)
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to create a person");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create a person");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#65C3C8] to-[#EF9FBC]/30">
      <div className="absolute top-14 left-64">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <FaLongArrowAltLeft /> Back To Dashboard
        </Link>
      </div>

      <div className="border border-white/50 shadow-2xl shadow-primary/20 p-14 rounded-3xl bg-base-100">
        <h1 className="text-4xl mb-6 text-center">Add New person You Know</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 w-full max-w-xs mx-auto"
        >
          {/* 5. ADDED THE FILE INPUT HERE */}
          <div className="flex flex-col w-full">
            <label htmlFor="photo" className="text-left mb-1 font-semibold">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*" // Restricts selection to images only
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-left mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={personForm.name}
              onChange={handleChange}
              placeholder="E.g. Sonali"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="emoji" className="text-left mb-1 font-semibold">
              Emoji
            </label>
            <input
              type="text"
              name="emoji"
              value={personForm.emoji}
              onChange={handleChange}
              placeholder="E.g. 👩‍💻"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="place" className="text-left mb-1 font-semibold">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={personForm.place}
              onChange={handleChange}
              placeholder="E.g. clg/work"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="year" className="text-left mb-1 font-semibold">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={personForm.year}
              onChange={handleChange}
              placeholder="E.g. 2020"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="traits" className="text-left mb-1 font-semibold">
              Traits
            </label>
            <input
              type="text"
              name="traits"
              value={personForm.traits}
              onChange={handleChange}
              placeholder="E.g. Crazy"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnew;
