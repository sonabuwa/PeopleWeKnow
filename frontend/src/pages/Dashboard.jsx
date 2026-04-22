import { Navigate } from "react-router-dom"; // <-- Change this import

const Dashboard = () => {
  // 1. Check for token IMMEDIATELY
  const token = localStorage.getItem("token");

  // 2. If no token, redirect BEFORE rendering anything
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Navigate to signup on logout
    window.location.href = "/login"; // Using window.location forces a hard refresh to clear state
  };

  // 3. If there IS a token, render the dashboard normally
  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>

      {/* Your dashboard content here */}

      <button onClick={handleLogout} className="btn btn-error mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
