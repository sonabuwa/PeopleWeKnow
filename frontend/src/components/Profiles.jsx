import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const Profile = () => {
  const [people, setPeople] = useState([]); // Always starts as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const token = localStorage.getItem("token");

        // If there is no token, go back to login
        if (!token) {
          navigate("/login");
          return;
        }

        console.log("TOKEN BEING SENT TO SERVER:", token);

        const res = await fetch(
          "https://people-we-know-backend.onrender.com/api/people",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // If the token is bad, go back to login
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
          }
          navigate("/login");
          return; // Stop right here, don't read the JSON
        }

        // If we get here, data is guaranteed to be an array
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
      const res = await fetch(
        `https://people-we-know-backend.onrender.com/api/people/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
    <div className="min-h-screen w-full bg-[#F0FDFA] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {people.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 col-span-full mt-20">
            No People yet...
          </p>
        ) : (
          people.map((person) => (
            <div
              key={person._id}
              className="card bg-base-100 shadow-xl border border-white/50 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">
                  {person.name}
                  <span className="animate-spin">{person.emoji}</span>
                </h2>
                <div className="divider -scroll-my-0"></div>
                <div className="w-full text-left space-y-1 ">
                  <p>
                    <span className="font-semibold text-primary">Place:</span>{" "}
                    {person.place}
                  </p>
                  <p>
                    <span className="font-semibold text-primary"> Year:</span>{" "}
                    {person.year}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Traits:</span>{" "}
                    {person.traits}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end px-6 py-2 space-x-2 cursor-pointer text-2xl">
                <Link to={`/update/${person._id}`}>
                  <FiEdit />
                </Link>
                <RiDeleteBin6Line onClick={() => handleDelete(person._id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
