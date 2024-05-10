import React from "react";
import "./UserOrders.css";

import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const UserOrders: React.FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useUser();
  const handleLogout = () => {
    logout(); // Call logout function
    // Additional logout logic if needed
    navigate("/LoginForm");
  };

  const productsOfCart = () => {
    // Create a map to group cart items by product _id and calculate total quantity
    const cartMap = new Map<string, number>();

    user.orders?.forEach((item) => {
      const productId = item._id;
      const quantity = cartMap.get(productId) || 0;
      cartMap.set(productId, quantity + item.quantity);
    });

    // Render cart products from the map
    return user.orders.map((order) => {
      const cartItem = order.cart.find((item) => item._id === productId);
      if (!cartItem) return null; // Handle case where cart item is not found
      const borderColour = cartItem.product.hexColor;
      return (
        <div
          className="cartProductWrapper"
          key={productId}
          style={{ borderColor: borderColour }}
        >
          <div className="cartProductInnerWrapper">
            <div className="cartProductImage"></div>
            <div className="cartProductInfo">
              <div className="cartProductName">
                <h3>{cartItem.product.displayName}</h3>
              </div>
              {/* <div className="cartProductType">
                <h3>{cartItem.product.productType}</h3>
              </div> */}
              <div className="cartProductPriceTotal">
                <h4>Price:</h4>
                <div className="priceTotalBox">
                  <h3>${cartItem.product.price * quantity} total</h3>
                </div>
              </div>
              <div className="cartProductQuantity">
                <h4>Quantity:</h4>
                <input type="number" value={quantity} readOnly />
              </div>
              <div
                className="cartDeleteProductButton"
                onClick={() => removeProduct(productId)}
              >
                <h4>Remove</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="outerWrapper">
      {user ? (
        <div className="wrapper">
          <h2 className="usernameTitle">Your Orders!</h2>
          <div className="parent">
            <div className="div1">
              <button className="secondaryButton">Your Orders</button>{" "}
            </div>
            <div className="div2">
              <button className="secondaryButton">Buy Again</button>
            </div>
            <div className="div3">
              <button className="secondaryButton">Your Account</button>
            </div>
            <div className="div4">
              <button className="secondaryButton">Keep Shopping</button>
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

export default UserOrders;
