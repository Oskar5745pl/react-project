import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckoutStepper } from "../CheckoutStepper";
import "./Delivery.css";
import { useStateContext } from "../CheckoutContext";
import axios from "axios";
// interface Address {
//   firstName: string;
//   lastName: string;
//   addressLineNo1: string;
//   addressLineNo2: string;
//   city: string;
//   state: string;
//   country: string;
//   postcode: string;
// }
// const initialAddressInput: Address = {
//   firstName: "",
//   lastName: "",
//   addressLineNo1: "",
//   addressLineNo2: "",
//   city: "",
//   state: "",
//   country: "",
//   postcode: "",
// };
interface StandardCheckout {
  username: string;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface GuestCheckout {
  email: string;
}
import { useUser } from "../UserContext";
// type FormState = StandardCheckout | GuestCheckout;

// const initialGuestCheckout: GuestCheckout = {
//   email: "",
// };
// interface errors {
//   username: "";
//   email: "";
//   password: "";
//   confirmPassword: "";
// }
// const initialStandardCheckout: StandardCheckout = {
//   username: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };
export default function Delivery() {
  // const [address, setAddress] = useState<Address>(initialAddressInput);
  // const [deliveryType, setDeliveryType] = useState("Free");
  // const [userForm, setUserForm] = useState<FormState>(initialStandardCheckout);
  // const [isGuest, setIsGuest] = useState(false);
  const [errors, setErrors] = useState<errors[]>([]);
  const [saveAddress, setSaveAddress] = useState<boolean>();
  const { user, logout } = useUser();
  const {
    setUserForm,
    userForm,
    isGuest,
    setIsGuest,
    deliveryType,
    setDeliveryType,
    address,
    setAddress,
  } = useStateContext();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
  const handlAddressSave = async () => {
    try {
      const response = await instance.post(`/saveAddress`, {
        address: address,
        user: user,
      });
      console.log(response.data.message);

      return; // Handle the case where JWT token is not available
    } catch (error) {
      console.error("Error fetching Session cart:", error);
    }
  };
  const handleUserFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };
  const handleRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryType(value);
    validateField(name, value);
  };
  console.log(address);

  console.log(deliveryType);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };
  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        if (!isValidEmail(value)) {
          errorMessage = "Enter a valid email ";
        }
        break;
      case "password":
        if (!isGuest && value.length < 6) {
          errorMessage = "Password must be at least 6 characters long";
        }
        break;
      case "confirmPassword":
        if (!isGuest && value !== (userForm as StandardCheckout).password) {
          errorMessage = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  const toggleGuestCheckout = () => {
    setIsGuest((prevState) => !prevState);
  };
  function isValidEmail(email: string) {
    const regex =
      /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const handleNext = () => {
    // Validate address and email if necessary
  };
  const token = localStorage.getItem("token");

  return (
    <div className="outerWrapper">
      <div className="titleWrapper">
        <CheckoutStepper />
        {/* <h2>Delivery</h2> */}
      </div>
      <div className="containerOfCheckout">
        <div className="addressForm">
          <h2 style={{ marginBottom: "20px" }}>Address</h2>
          <div className="coolinput">
            <label>First Name:</label>
            <input
              className="input"
              type="text"
              value={address.firstName}
              name="firstName"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>Last Name:</label>
            <input
              className="input"
              type="text"
              value={address.lastName}
              name="lastName"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>Address Line 1:</label>
            <input
              className="input"
              type="text"
              value={address.addressLineNo1}
              name="addressLineNo1"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>Address Line 2:</label>
            <input
              className="input"
              type="text"
              value={address.addressLineNo2}
              name="addressLineNo2"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>City:</label>
            <input
              className="input"
              type="text"
              value={address.city}
              name="city"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>State:</label>
            <input
              className="input"
              type="text"
              value={address.state}
              name="state"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>Country:</label>
            <input
              className="input"
              type="text"
              value={address.country}
              name="country"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label>Postcode:</label>
            <input
              className="input"
              type="text"
              value={address.postcode}
              name="postcode"
              onChange={handleAddressInputChange}
            />
          </div>
        </div>
        {token ? (
          <>
            <div className="guestCheckout">
              <label htmlFor="cbx">Save Address</label>
              <label className="containers">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={handlAddressSave}
                  id="cbx"
                />
                <div className="checkmark"></div>
              </label>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="deliveryType">
          <label>Delivery Type:</label>
          <div className="containerss">
            <form action="">
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={"Standard"}
                  onChange={handleRadioInput}
                  checked={deliveryType === "Standard"}
                />
                <span>Standard</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={"Express"}
                  onChange={handleRadioInput}
                  checked={deliveryType === "Express"}
                />
                <span>Express</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={"Next Day"}
                  onChange={handleRadioInput}
                  checked={deliveryType === "Next Day"}
                />
                <span>Next Day</span>
              </label>
            </form>
          </div>
        </div>
        {token ? (
          <></>
        ) : (
          <>
            <div className="login">
              <h2 style={{ marginBottom: "20px" }}>Login</h2>
              <div className="guestCheckout">
                <label htmlFor="cbx">Guest Checkout</label>
                <label className="containers">
                  <input
                    type="checkbox"
                    checked={isGuest}
                    onChange={toggleGuestCheckout}
                    id="cbx"
                  />
                  <div className="checkmark"></div>
                </label>
              </div>

              {/* <label>Guest Checkout</label>
              <input
                type="checkbox"
                checked={isGuest}
                onChange={toggleGuestCheckout}
              /> */}
              {!isGuest && (
                <div className="coolinput">
                  <label>Username:</label>
                  <input
                    className="input"
                    type="username"
                    value={(userForm as StandardCheckout).username}
                    name="username"
                    onChange={handleUserFormInputChange}
                  />
                </div>
              )}
              <div className="coolinput">
                <label htmlFor="email">Email:</label>
                <input
                  className="input"
                  type="email"
                  value={(userForm as GuestCheckout).email}
                  name="email"
                  onChange={handleUserFormInputChange}
                />
              </div>
              {!isGuest && (
                <>
                  <div className="coolinput">
                    <label>Password:</label>
                    <input
                      className="input"
                      type="password"
                      value={(userForm as StandardCheckout).password}
                      name="password"
                      onChange={handleUserFormInputChange}
                    />
                  </div>
                  <div className="coolinput">
                    <label>Confirm Password:</label>
                    <input
                      className="input"
                      type="email"
                      value={(userForm as StandardCheckout).confirmPassword}
                      name="email"
                      onChange={handleUserFormInputChange}
                    />
                  </div>
                </>
              )}
            </div>
            <div></div>
          </>
        )}
        <Link to={"/checkout/payment"}>
          <button onClick={handleNext} className="nextButton">
            Next{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
