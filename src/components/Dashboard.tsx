import React from "react";
import "./Dashboard.css";

import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useUser();
  const handleLogout = () => {
    logout(); // Call logout function
    // Additional logout logic if needed
    navigate("/LoginForm");
  };
  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <h3>{user.email}</h3>
          <button onClick={handleLogout}>Log Out</button>
          {/* Other content */}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Dashboard;
{
  /* <form action="">
<div className='coolinput'>
        <label htmlFor="username">Username:</label>
        <input
          className="input"  
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
          required
        />
      </div>
  <button type="submit" id='LoginButton'>submit</button>
  
</form> */
}
