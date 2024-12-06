import React, { useState } from "react";
import { createUser } from "./userApi";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const RegisterPage = () => {
  // State to store form data (username, email, password)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // useNavigate hook to redirect user after successful registration
  const navigate = useNavigate();

  // Function to handle form submission (registration)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Submitting data:", formData);
      const data = await createUser(formData);
      setSuccessMessage(`User ${data.username} registered successfully!`);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response || err.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="height">
      <div className="register-container">
        <div>
          <h2>Register</h2>

          {/* Registration form */}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
