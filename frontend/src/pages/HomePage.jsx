import Header from "../components/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#F0FDFA] overflow-x-hidden">
      <Header />

      <div className="pt-24 md:pt-32 pb-20 flex flex-col items-center justify-center px-4 sm:px-6">
        
        {/* Adjusted text sizes for small (4xl), medium (5xl), and large (7xl) screens */}
        <h1 className="w-full max-w-4xl my-8 text-center text-4xl sm:text-5xl md:text-7xl font-bold text-[#291334] tracking-tight leading-tight">
          Create people profiles you 
          
          {/* ✅ FIX: Only force the line break on md screens and up. On small phones, it wraps naturally. */}
          <br className="hidden md:block" />
          
          <span className="text-[#65C3C8] relative inline-block">
            know
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 100 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q 50 0 100 5"
                stroke="#EF9FBC"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>{" "}
          over the time
        </h1>

        {/* Adjusted paragraph text size */}
        <p className="w-full max-w-2xl text-center text-lg sm:text-xl md:text-2xl mt-6 text-neutral/70">
          Life is a journey. In the meantime, you meet wonderful people;
          remember them by adding them here.
        </p>

        {/* Adjusted button padding and text size for mobile */}
        <Link
          to="/login"
          className="btn btn-primary mt-10 rounded-full px-6 sm:px-10 text-base sm:text-lg shadow-lg hover:scale-110 transition-transform"
        >
          Add Person 🚀
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
