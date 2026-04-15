import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [where, setWhere] = useState("");
  const [year, setYear] = useState("");
  const [personality, setPersonality] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (!name || !where || !year || !personality) {
      return toast.error("All fields are required");
    }
    setIsLoading(true);
    // Simulate logic
    setTimeout(() => {
      toast.success("Entry Created!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4 font-sans">
      <div className="bg-amber-500 w-full max-w-lg rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group font-bold text-sm uppercase tracking-widest"
          >
            <FaArrowLeftLong className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-white font-bold text-3xl tracking-tight uppercase">
            Add New Person You Know
          </h1>
          <div className="h-1 w-20 bg-white/30 mx-auto mt-4 rounded-full" />
        </div>

        <form onSubmit={handleClick} className="flex flex-col gap-6">
          {/* Input Group: Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xs font-bold uppercase tracking-[0.2em] ml-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sam"
              className="w-full px-6 py-4 rounded-xl bg-amber-100 border-2 border-transparent focus:border-white focus:bg-white outline-none transition-all text-amber-900 placeholder-amber-400/60 shadow-md"
            />
          </div>

          {/* Input Group: Location */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-xs font-bold uppercase tracking-[0.2em] ml-1">
              Meeting Location
            </label>
            <input
              type="text"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="Where did you meet?"
              className="w-full px-6 py-4 rounded-xl bg-amber-100 border-2 border-transparent focus:border-white focus:bg-white outline-none transition-all text-amber-900 placeholder-amber-400/60 shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Input Group: Year */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-xs font-bold uppercase tracking-[0.2em] ml-1">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-6 py-4 rounded-xl bg-amber-100 border-2 border-transparent focus:border-white focus:bg-white outline-none transition-all text-amber-900 placeholder-amber-400/60 shadow-md"
              />
            </div>

            {/* Input Group: Personality */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-xs font-bold uppercase tracking-[0.2em] ml-1">
                Primary Trait
              </label>
              <input
                type="text"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Personality"
                className="w-full px-6 py-4 rounded-xl bg-amber-100 border-2 border-transparent focus:border-white focus:bg-white outline-none transition-all text-amber-900 placeholder-amber-400/60 shadow-md"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-amber-800 text-white font-semibold py-5 rounded-xl shadow-xl hover:bg-amber-900 active:scale-[0.97] disabled:opacity-50 transition-all  tracking-normal text-lg"
          >
            {isLoading ? "Creating..." : "Create "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
