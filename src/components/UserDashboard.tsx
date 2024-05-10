import React from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
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
    <div className="outerWrapper">
      {user ? (
        <div className="wrapper">
          <h2 className="usernameTitle">
            Welcome <br /> {user.username}!
          </h2>
          <div className="parent">
            <div className="div1">
              <button className="secondaryButton">
                <Link to={"/userOrders"}>Your Orders</Link>
              </button>{" "}
            </div>
            <div className="div2">
              <button className="secondaryButton">
                <Link to={"/userBuyAgain"}>Buy Again</Link>
              </button>
            </div>
            <div className="div3">
              <button className="secondaryButton">
                <Link to={"/userAccount"}>Your Account</Link>
              </button>
            </div>
            <div className="div4">
              <button className="secondaryButton">
                <Link to={"/userKeepShopping"}>Keep Shopping</Link>
              </button>
            </div>
          </div>
          {/* <button className="secondaryButton">Your Orders</button> */}
          <button onClick={handleLogout} className="logoutButton">
            Log Out
          </button>
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
