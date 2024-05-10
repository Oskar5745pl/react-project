import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckoutStepper } from "../CheckoutStepper";
import "./Payment.css";
import { useStateContext } from "../CheckoutContext";
// import exp from "constants";
interface billingAddress {
  firstName: string;
  lastName: string;
  addressLineNo1: string;
  addressLineNo2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}
const initialBillingAddressInput: billingAddress = {
  firstName: "",
  lastName: "",
  addressLineNo1: "",
  addressLineNo2: "",
  city: "",
  state: "",
  country: "",
  postcode: "",
};
// interface DebitCard {
//   fullName: string;
//   cardNumber: number;
//   securityCode: number;
//   expiryDate: number;
// }
// const initialDebitInput: DebitCard = {
//   fullName: "",
//   cardNumber: 0,
//   securityCode: 0,
//   expiryDate: 0,
// };
export default function Payment() {
  // const [billingAddress, setBillingAddress] =
  //   useState<billingAddress>(initialAddressInput);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  // const [debitCard, setDebitCard] = useState<DebitCard>(initialDebitInput);
  // const [fullName, setFullName] = useState<string>("");
  // const [cardNumber, setCardNumber] = useState<string>();
  // const [securityCode, setSecurityCode] = useState<string>();
  // const [expiryDate, setExpiryDate] = useState<string>();
  const {
    billingAddress,
    setBillingAddress,
    debitCard,
    setDebitCard,
    address,
  } = useStateContext();

  const handleDebitCardChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name == "fullName") {
      setDebitCard((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name == "expiryDate") {
      setDebitCard((prevState) => ({
        ...prevState,
        [name]: value
          .replace(/\D/g, "")
          .slice(0, 4)
          .replace(/(\d{2})(\d{2})/, "$1/$2"),
      }));
    } else if (name == "cardNumber") {
      setDebitCard((prevState) => ({
        ...prevState,
        [name]: value
          .replace(/\D/g, "")
          .slice(0, 16)
          .replace(/(\d{4})/g, "$1 "),
      }));
    } else if (name == "securityCode") {
      setDebitCard((prevState) => ({
        ...prevState,
        [name]: value.replace(/\D/g, "").slice(0, 3),
      }));
    }
  };
  const toggleSameAsShipping = () => {
    setSameAsShipping(!sameAsShipping);
    setBillingAddress(sameAsShipping ? initialBillingAddressInput : address);
  };
  console.log(billingAddress);

  const handleNext = () => {
    // Validate billing billingAddress and debit card information if necessary
  };
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prevState) => ({ ...prevState, [name]: value }));

    // validateField(name, value);
  };

  return (
    <div className="outerWrapper">
      <div className="titleWrapper">
        <CheckoutStepper />
        {/* <h2>Payment</h2> */}
      </div>
      <div></div>
      <div className="containerOfCheckout">
        <div className="addressForm">
          <h2 style={{ marginBottom: "20px" }}>Payment</h2>
          <h3>Billing Address</h3>
          <div className="guestCheckout">
            <label htmlFor="cbx">Same As Shipping Address</label>
            <label className="containers">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={toggleSameAsShipping}
                id="cbx"
              />
              <div className="checkmark"></div>
            </label>
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              First Name:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.firstName}
              name="firstName"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              Last Name:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              disabled={sameAsShipping}
              type="text"
              value={billingAddress.lastName}
              name="lastName"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              Address Line 1:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.addressLineNo1}
              name="addressLineNo1"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              Address Line 2:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.addressLineNo2}
              name="addressLineNo2"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              City:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.city}
              name="city"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              State:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.state}
              name="state"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              Country:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.country}
              name="country"
              onChange={handleAddressInputChange}
            />
          </div>
          <div className="coolinput">
            <label
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
            >
              Postcode:
            </label>
            <input
              style={{
                color: sameAsShipping ? "rgba(118, 118, 118, 0.3)" : "black",
              }}
              className="input"
              type="text"
              disabled={sameAsShipping}
              value={billingAddress.postcode}
              name="postcode"
              onChange={handleAddressInputChange}
            />
          </div>
        </div>
        <div className="login">
          {/* <h3>Debit Card:</h3> */}
          <div className="debitCard" style={{ marginTop: "50px" }}>
            <div className="">
              {/* <label>Full Name:</label> */}
              <input
                type="text"
                name="fullName"
                className="debitCardInput"
                placeholder="Full Name"
                value={debitCard.fullName}
                onChange={handleDebitCardChange}
              />
            </div>
            <div className="">
              {/* <label>Card Number:</label> */}
              <input
                type="text"
                className="debitCardInput"
                placeholder="0000 0000 0000 0000"
                name="cardNumber"
                value={debitCard.cardNumber}
                onChange={handleDebitCardChange}
              />
            </div>
            <div className="smallerCardInputs">
              {/* <label>Security Code:</label> */}
              <input
                type="text"
                className="debitCardInput"
                placeholder="CVV"
                name="securityCode"
                value={debitCard.securityCode}
                onChange={handleDebitCardChange}
              />

              {/* <label>Expiry Date:</label> */}
              <input
                type="text"
                placeholder="MM/AA"
                className="debitCardInput"
                name="expiryDate"
                value={debitCard.expiryDate}
                onChange={handleDebitCardChange}
              />
            </div>
          </div>

          {/* <br />

        <br />

        <br /> */}
        </div>
      </div>
      <div className="checkoutNavButtons">
        <Link to={"/checkout/delivery"}>
          <button onClick={handleNext} className="nextButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            Back{" "}
          </button>
        </Link>
        <Link to={"/checkout/confirmation"}>
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
