import React, { useState } from "react";
import "./LoginForm.css";
// import { register, login } from '../api/authApi.ts';
// import { error, log } from 'console';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormState {
  email: string;
  password: string;
}

type FormState = RegisterFormState | LoginFormState;

const initialRegisterFormState: RegisterFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
interface errors {
  username: "";
  email: "";
  password: "";
  confirmPassword: "";
}
const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
};
const LoginForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [formState, setFormState] = useState<FormState>(initialLoginFormState);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState<errors[]>([]);
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  console.log(formState);

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
      case "password":
        if (isRegistering && value.length < 6) {
          errorMessage = "Password must be at least 6 characters long";
        }
        break;
      case "confirmPassword":
        if (isRegistering && value !== formState.password) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    if (isRegistering) {
      try {
        const response = await instance.post("/register", formState);
        if (response.status === 400) {
          // Access the error message from the response data
        } else if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          navigate("/dashboard"); // Redirect to dashboard route
        }
        return true;
      } catch (error: any) {
        // Handle error
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        // Set errors state to display to the user
        setServerErrors(errorMessage);
        return false;
      }
    } else {
      try {
        const response = await instance.post("/login", formState);
        console.log("Form submitted successfully:", response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          navigate("/dashboard"); // Redirect to dashboard route
        }
        return true;
      } catch (error) {
        // Handle error
        console.log(error);
        return false;
      }
    }
  };

  function isValidEmail(email: string) {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  const toggleRegistration = () => {
    setIsRegistering((prevState) => !prevState);
    setFormState(
      isRegistering ? initialLoginFormState : initialRegisterFormState
    );
  };

  return (
    <div className="container">
      <div className="titleDiv">
        <h1 id="pageTitle">{isRegistering ? "Register" : "Log in"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="loginForm">
        <h3>{serverErrors}</h3>
        <div className="contact-">
          {isRegistering && (
            <div className="coolinput">
              <label htmlFor="username">Username:</label>
              <input
                className="input"
                type="text"
                id="username"
                name="username"
                value={(formState as RegisterFormState).username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
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
            {/* {isRegistering && errors.map((error, index) => (
              <h3 key={index} className="error">{error.email}</h3>
            ))} */}
          </div>
          <div className="coolinput">
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              // onBlur={handleBlur}
              required
            />
            {/* {errors.map((error, index) => (
              <h3 key={index} className="error">{error.password}</h3>
            ))} */}
          </div>
          {isRegistering && (
            <div className="coolinput">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={(formState as RegisterFormState).confirmPassword}
                onChange={handleInputChange}
                // onBlur={handleBlur}
                required
              />
              {/* {errors.map((error, index) => (
              <h3 key={index} className="error">{error.confirmPassword}</h3>
              ))} */}
            </div>
          )}
        </div>
        <button type="submit" id="LoginButton">
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={toggleRegistration}
          className="textOnly"
          id="createAcount"
        >
          {isRegistering ? "Switch to Login" : "Switch to Register"}
        </button>
        <div className="loginHelp" id="loginH">
          <div>
            <label htmlFor="remeber_me">
              <input
                type="checkbox"
                name="remeber_me"
                id="remeber_me"
                className="remeber_me"
              />
              <span className="remeber_me">Remember me</span>
            </label>
          </div>
          <div>
            <Link to={"/forgetPassword"}>
              <button className="textOnly" id="passForget">
                Forgot password?
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
