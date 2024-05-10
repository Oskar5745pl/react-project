// import React from "react";
// import "./Orders.css";

// import { useUser } from "./UserContext";
// import { useNavigate } from "react-router-dom";

// const Orders: React.FC = () => {
//   const navigate = useNavigate();

//   const { user, logout } = useUser();
//   const handleLogout = () => {
//     logout(); // Call logout function
//     // Additional logout logic if needed
//     navigate("/LoginForm");
//   };
//   return (
//     <div className="outerWrapper">
//       {user ? (
//         <div className="wrapper">
//           <h2 className="usernameTitle">
//             Welcome <br /> {user.username}!
//           </h2>
//           <div className="parent">
//             <div className="div1">
//               <button className="secondaryButton">Your Orders</button>{" "}
//             </div>
//             <div className="div2">
//               <button className="secondaryButton">Buy Again</button>
//             </div>
//             <div className="div3">
//               <button className="secondaryButton">Your Account</button>
//             </div>
//             <div className="div4">
//               <button className="secondaryButton">Keep Shopping</button>
//             </div>
//           </div>
//           {/* <button className="secondaryButton">Your Orders</button> */}
//           <button onClick={handleLogout} className="logoutButton">
//             Log Out
//           </button>
//           {/* Other content */}
//         </div>
//       ) : (
//         <h2>Loading...</h2>
//       )}
//     </div>
//   );
// };

// export default Orders;
