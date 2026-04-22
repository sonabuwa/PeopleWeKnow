import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const AuthPage = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(location.pathname === "/login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //stops the browser from refreshing the page
    setError(""); // clears any previous error messages
    setLoading(true); // starts a loading spinner or disables the button

    //if isLoogedIn is true, we go to login. If false, we go to signup.
    const endpoint = isLoggedIn ? "/api/login" : "/api/signup";
    try {
      const res = await fetch(`http://127.0.0.1:5005${endpoint}`, {
        method: "POST", //Authentication data should always use POST
        headers: {
          "Content-Type": "application/json", // turns your state object into a string for travel
        },
        body: JSON.stringify(form), //turn your state object into a string from travel
      });

      const data = await res.json(); //paeses the server's response
      if (res.ok) {
        if (isLoggedIn) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          // Don't save token yet, don't navigate to dashboard
          // Just switch the form to Login mode
          setIsLoggedIn(true);
          //optional: clear the form
          setForm({ username: "", email: "", password: "" });
          //optional: show a sucess message
          setError("");
          toast.success("Account created! Please log in.");
        }
      } else {
        //if the server says "User alredy exists" or "wrong password"
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Server is unreachable. Please try again later" + error);
    } finally {
      setLoading(false); // Stop the loading spinner regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#65C3C8] to-[#EF9FBC]/30">
      <div>
        <Link to="/" className="flex items-center justify-start">
          <FaLongArrowAltLeft /> Back To Home
        </Link>
      </div>
      <div className="border border-white/50 shadow-2xl shadow-primary/20 p-14 rounded-3xl bg-base-100">
        <h1 className="text-4xl mb-2 text-center">
          {isLoggedIn ? "Login" : "Signup"}
        </h1>
        <p className="mb-5">Enter your credentials to view people you know</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4 w-full max-w-xs mx-auto"
        >
          {!isLoggedIn && (
            <div className="flex flex-col w-full">
              <label
                htmlFor="username"
                className="text-left mb-1 font-semibold"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Rita@123"
                className="input input-bordered w-full"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-left mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="rita123@gmail.com"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-left mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="*****"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <p className="mt-2 text-center">
            {isLoggedIn ? (
              <span onClick={() => setIsLoggedIn(false)}>
                Create an account,{" "}
                <span className="cursor-pointer">Signup</span>
              </span>
            ) : (
              <span onClick={() => setIsLoggedIn(true)}>
                Already have an account?{" "}
                <span className="cursor-pointer ">Login</span>
              </span>
            )}
          </p>
          {error && <p className="text-red-700 text-sm">{error}</p>}
          <button className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
