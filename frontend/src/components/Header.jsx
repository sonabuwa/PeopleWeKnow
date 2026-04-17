//write header code here
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-[#65C3C8] text-[#291334]">
      <div className=" mx-40 py-6">
        <div className="flex justify-between items-center gap-48">
          <h1 className="text-5xl text-neutral tracking-tight">PeopleWeKnow</h1>
          <div className="flex justify-evenly items-center gap-4">
            <Link
              to="/signup"
              class="btn btn-primary rounded-full px-8 hover:scale-105 transition-transform border-none shadow-lg shadow-primary/20"
            >
              SignUp
            </Link>
            <Link
              to="/signup"
              class="btn btn-primary rounded-full px-8 hover:scale-105 transition-transform border-none shadow-lg shadow-primary/20"
            >
              LogIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
