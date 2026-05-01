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

  const btnClasses =
    "btn bg-[#FB7185] rounded-full px-6 md:px-8 hover:scale-105 transition-transform border-none shadow-md text-white";

  return (
    <div className=" bg-[#65C3C8] text-[#291334] rounded-b-3xl shadow-lg border-b border-white/20">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-48">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-neutral tracking-tight">
            PeopleWeKnow
          </h1>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {token ? (
              /* ✅ LOGGED IN USER SEES THIS */
              <>
                <Link
                  to="/addnew"
                  className="btn bg-[#FB7185] rounded-full px-8 hover:scale-105 transition-transform border-none shadow-md"
                >
                  Add new people
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn bg-[#FB7185] rounded-full px-8 hover:scale-105 transition-transform border-none shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn bg-[#FB7185] rounded-full px-8 hover:scale-105 transition-transform border-none shadow-lg shadow-primary/20"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="btn bg-[#FB7185] rounded-full px-8 hover:scale-105 transition-transform border-none shadow-lg shadow-primary/20"
                >
                  LogIn
                </Link>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 items-center border-t border-[#291334]/20 pt-4">
            {token ? (
              <>
                <Link
                  to="/addnew"
                  className={`${btnClasses} w-full max-w-xs`}
                  onClick={() => setIsOpen(false)} // Closes menu when clicked
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
