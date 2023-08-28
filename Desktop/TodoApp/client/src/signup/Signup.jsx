import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signup.css"; 


const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
   const result = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email, password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    if(result.status !== 200){
      alert("Email Is Already In Use");
      return;
    }
    const user_id = await result.json();
    console.log(user_id);
    localStorage.setItem("user",JSON.stringify(user_id));
    setemail("");
    setpassword("");
    navigate("/");
  }

  return (
    <>
      <main>
        <form
          className="page-form"
          onSubmit={handleSubmit}
        >
          <h2>
            <strong>Signin into Your Account</strong>
          </h2>
          <img src="logo.png" alt="Logo" className="login1" />

          <div className="user-box">
            <input
              type="email"
              autoComplete="off"
              name="username"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              required
            />
            <label for="username" className="label-class">Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              autoComplete="off"
              name="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              required
            />
            <label for="password" className="label-class">Password</label>
          </div>
          <div className="check-box">
            <span className="remember">Remember Me?</span>
          </div>
          <button className="login-signup-button" type="submit">Create account</button>
        </form>
      </main>
    </>
  );
};
export default Signup;



