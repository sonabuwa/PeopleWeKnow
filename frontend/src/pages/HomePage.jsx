// import { motion } from "framer-motion";
import { FaPlus, FaPeopleGroup } from "react-icons/fa6";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";

const Homepage = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch("http://localhost:5005/api/people");
        const data = await res.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching People", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  if (loading) {
    return (
      <h1 className="grid place-content-center text-3xl text-amber-500">
        Loading...
      </h1>
    );
  }
  return (
    <div className="font-mono">
      <div className="flex flex-row items-center justify-around mx-0  bg-amber-500 text-white p-7">
        <div className="text-4xl flex flex-row items-center gap-2 font-bold">
          <BsFillEmojiSunglassesFill />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            People I Know
          </motion.h1>
        </div>
        <Link
          to="/create"
          className="btn outline-none border-white text-white bg-amber-500 hover:bg-amber-600 hover:text-white hover:border-white flex items-center gap-2"
        >
          <FaPlus />
          New Profile
        </Link>
      </div>
      <div>
        {people.length === 0 ? (
          <h1>No people yet</h1>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {people.map((person) => (
              <div
                key={person._id}
                className="bg-amber-200 rounded-2xl shadow-lg border p-4 "
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-black font-sans border-b-2 border-amber-800">
                    {person.name}
                  </h2>
                  <p className="text-xl bg-amber-300 rounded-2xl p-2">
                    {person.emoji}
                  </p>
                </div>

                <p>Place: {person.whereIMet}</p>
                <p>Year: {person.AtWhichYear}</p>
                <p>Personality: {person.theirPersonality}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
