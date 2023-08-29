import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch("http://localhost:3000/api/graph-api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                query{
                    loginUser(userInput:{email:"${email}",password:"${password}"}){
                      name
                      email
                    }
                  }
                `,
            }),
        });
        const user_id = await result.json();
        localStorage.setItem("user", JSON.stringify(user_id));
        setemail("");
        setpassword("");
        navigate("/");
    };

    return (
        <>
            <main>
                <form onSubmit={handleSubmit}>
                    <h2>
                        <strong>Log into Your Account!</strong>
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
                        <label className="label-class">Email</label>
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
                        <label className="label-class">Password</label>
                    </div>
      
                    <button className="login-signup-button" type="submit">
                        Log In
                    </button>
                    <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
                </form>
            </main>
        </>
    );
};
export default Login;
