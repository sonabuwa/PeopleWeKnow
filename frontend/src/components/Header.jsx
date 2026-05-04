import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Made padding slightly smaller on mobile (px-5) and bigger on desktop (px-8)
  const btnClasses =
    "btn bg-[#FB7185] rounded-full px-5 md:px-8 hover:scale-105 transition-transform border-none shadow-md text-white";

  return (
    <div className="bg-[#65C3C8] text-[#291334] rounded-b-3xl shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* ✅ FIX: Removed 'gap-48'! justify-between handles the spacing automatically */}
        <div className="flex justify-between items-center">
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-neutral tracking-tight">
            PeopleWeKnow
          </h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl focus:outline-none ml-4" // added ml-4 so it doesn't touch the edge on tiny screens
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link to="/addnew" className={btnClasses}>
                  Add new people
                </Link>
                <button onClick={handleLogout} className={btnClasses}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className={btnClasses}>
                  SignUp
                </Link>
                <Link to="/login" className={btnClasses}>
                  LogIn
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 items-center border-t border-[#291334]/20 pt-4">
            {token ? (
              <>
                <Link
                  to="/addnew"
                  className={`${btnClasses} w-full max-w-xs`}
                  onClick={() => setIsOpen(false)}
                >
                  Add new people
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className={`${btnClasses} w-full max-w-xs`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={`${btnClasses} w-full max-w-xs`}
                  onClick={() => setIsOpen(false)}
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className={`${btnClasses} w-full max-w-xs`}
                  onClick={() => setIsOpen(false)}
                >
                  LogIn
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
