import "./ResetPassword.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function ResetPassword() {
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
  const { resetToken } = useParams<{ resetToken: string }>();
  useEffect(() => {
    // Fetch sections from server
    async function CheckToken() {
      try {
        const response = await instance.post(`/reset-password/${resetToken}`);
        if (response.status === 400) {
          // Access the error message from the response data
        } else if (response.status === 201) {
          alert("Password has been changed");

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
    }
  }, []);
  return (
    <div className="container">
      <form action="" className="loginForm">
        <div>
          <h4 className="inquiry">Have Any Questions</h4>
          <h2>Get in Touch</h2>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Your Name:
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="input"
              className="input"
            />
          </div>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Your Email:
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="input"
              className="input"
            />
          </div>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="input"
              className="input"
            />
          </div>
          <div className="coolinput" id="Message">
            <label htmlFor="input" className="text">
              Your Message(optional)
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="input"
              className="input"
            />
          </div>
          <button id="contactBtn">Contact</button>
        </div>
        <div className="contactInfo">
          <div className="info">
            <h4 className="inquiry">Contact Details</h4>
            <h2>Get Information</h2>
            <div className="infoCard" id="email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#123524"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              <div className="text">
                <h5>Email</h5>
                <h6> info@mwhl.org.uk </h6>
              </div>
            </div>
            <div className="infoCard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#123524"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
              <div className="text">
                <h5>Phone</h5>
                <h6> 07459162879 </h6>
              </div>
            </div>
            <div className="infoCard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#123524"
                className="bi bi-geo-alt-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>
              <div className="text">
                <h5>Address</h5>
                <h6> 174-176 Welford Road Leicester LE2 6BD </h6>
                <h6> Leicester, UK </h6>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
