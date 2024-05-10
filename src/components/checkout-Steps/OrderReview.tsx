import React from "react";
import "./OrderReview.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const OrderReview: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useUser();
  // const handleLogout = () => {
  //   logout(); // Call logout function
  //   // Additional logout logic if needed
  //   navigate("/LoginForm");
  // };
  return (
    <div className="outerWrapper">
      {user ? (
        <div className="wrapper">
          <div style={{ marginTop: "200px" }}></div>
          <h2
            className="usernameTitle"
            style={{ textAlign: "center", marginLeft: "0" }}
          >
            Your Order has been placed succesfully
          </h2>
          <div className="parent" id="orderReview">
            <div className="div1">
              <button className="secondaryButton">
                <Link to={"/userOrders"}>Your Orders</Link>
              </button>{" "}
            </div>
            <div className="div2">
              <button className="secondaryButton">
                <Link to={"/products"}>Keep Shopping</Link>
              </button>{" "}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default OrderReview;
