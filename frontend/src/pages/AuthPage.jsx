import { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#65C3C8] to-[#EF9FBC]/30">
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
            {isLoggedIn
              ? "Create an account, Signup"
              : "Already have account? Login"}
          </p>
          <button className="btn btn-primary w-full mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
