import React, { useState } from "react";
import "./LoginForm.css";
// import { register, login } from '../api/authApi.ts';
// import { error, log } from 'console';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

interface FormState {
  email: string;
}
const intitalFormState: FormState = {
  email: "",
};
interface errors {
  username: "";
  email: "";
  password: "";
  confirmPassword: "";
}

const ForgetPassword: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(intitalFormState);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState<errors[]>([]);
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  console.log(user);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        if (!isValidEmail(value)) {
          errorMessage = "Enter a valid email ";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    try {
      const response = await instance.post("/forget-password", {
        email: formState.email,
      });
      if (response.status === 200) {
        // Password reset email sent successfully
        alert("Password reset email sent. Please check your inbox.");
      } else {
        // Handle other response statuses if needed
        alert("An error occurred. Please try again later.");
      }
    } catch (error: any) {
      // Handle error
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
      alert("An error occurred. Please try again later.");
    }
  };

  function isValidEmail(email: string) {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const returnToLogin = () => {
    navigate("/LoginForm");
  };

  return (
    <div className="container">
      <div className="titleDiv">
        <h1 id="pageTitle">Forgot Password</h1>
      </div>
      <form onSubmit={handleSubmit} className="loginForm">
        <h3>{serverErrors}</h3>
        <div className="contact-">
          <div className="coolinput">
            <label htmlFor="email">Email:</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              // onBlur={handleBlur}
              required
            />
          </div>
        </div>
        <button type="submit" id="LoginButton" onClick={() => handleSubmit}>
          Send Password Reset
        </button>
        <button
          type="button"
          onClick={returnToLogin}
          className="textOnly"
          id="createAcount"
        >
          Go back to Login
        </button>
      </form>
    </div>
  );
};
export default ForgetPassword;
