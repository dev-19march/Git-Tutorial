

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.status === 200) {
        navigate("/dashboard"); 
      } else {
        alert("User not found or incorrect credentials");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <img src="logo.png" alt="Logo" className="login" />
        <h2>Login to your Account</h2>
        <div className="textbox">
          <input
            type="text"
            placeholder="E-mail or Username"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="textbox">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Next</button>
        <button>Forgot Password?</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
