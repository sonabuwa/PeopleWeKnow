import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
       
        // ✅ Updated to Render URL
        const res = await fetch("https://people-we-know.onrender.com/api/people", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const data = await res.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching people", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPeople();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    try {
      const token = localStorage.getItem("token");
      
      // ✅ Updated to Render URL
      const res = await fetch(`https://people-we-know.onrender.com/api/people/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setPeople((prevPeople) =>
          prevPeople.filter((person) => person._id !== id),
        );
      }
    } catch (error) {
      console.error("Error deleting person:", error);
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
    <div
      className="min-h-screen w-full p-8 bg-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 31px, #cbd5e1 31px, #cbd5e1 32px)",
        backgroundSize: "100% 32px",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8 max-w-7xl mx-auto pt-4">
        {people.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 col-span-full mt-20">
            No People yet...
          </p>
        ) : (
          people.map((person) => (
            <div
              key={person._id}
              className="group relative border-2 border-dashed border-gray-500 rounded-xl bg-white/80 backdrop-blur-sm p-6 pt-16 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image sitting ON the border */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2  border-black bg-white z-10 overflow-hidden flex items-center justify-center">
                {person.photo ? (
                  <img
                    // ✅ Updated to Render URL
                    src={`https://people-we-know.onrender.com/${person.photo.replace(/\\/g, "/")}`}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm font-medium">img</span>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                  {person.name}
                </h2>
                <span className="text-2xl animate-bounce bg-red-200 rounded-full p-2">
                  {person.emoji}
                </span>
              </div>

              <div className="border-b-2 border-dashed border-gray-400 mb-4"></div>

              <div className="flex-grow space-y-2 text-gray-700 font-medium">
                <p>
                  place :{" "}
                  <span className="text-gray-900 font-normal ml-1">
                    {person.place}
                  </span>
                </p>
                <p>
                  year :{" "}
                  <span className="text-gray-900 font-normal ml-1">
                    {person.year}
                  </span>
                </p>
                <p>
                  personality :{" "}
                  <span className="text-gray-900 font-normal ml-1">
                    {person.traits}
                  </span>
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-6 text-gray-400 select-none">
                <span>✨</span>
                <span>🎈</span>
                <span>✨</span>
              </div>

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-lg p-1 shadow-sm">
                <Link
                  to={`/update/${person._id}`}
                  className="text-gray-600 hover:text-primary"
                >
                  <FiEdit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(person._id)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
