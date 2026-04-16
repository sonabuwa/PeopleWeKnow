import { useState } from "react";

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    username: "xyz",
    email: "xyz@gmail.com",
    password: "fghjxcvb",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <div>
        <h1 className="text-center">{isLoggedIn ? "Login" : "Signup"}</h1>
        <p>Enter your credentials to view people you know</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2"
        >
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={form.username}
            required
            onChange={(e) => setForm(e.target.value)}
          />
          <label htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            value={form.email}
            required
            onChange={(e) => setForm(e.target.value)}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={form.password}
            required
            onChange={(e) => setForm(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
