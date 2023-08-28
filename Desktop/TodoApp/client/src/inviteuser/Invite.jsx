import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./invite.css";


const Invite = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendInvitation = async (event) => {

    const result = await fetch("http://localhost:3000/api/member", {
      method: "POST",
      body: JSON.stringify({
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    if(result.status !== 200){
      alert("Member Is Already added. bhai kya kr rhe ho");
      return;
    }
    const members = await result.json();
    navigate("/team-member");
  };

  return (
    <div className="invitation-form">
      <h2>Send Invitation</h2>
      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button className="send-button" onClick={handleSendInvitation}>
        Send Invitation
      </button>
    </div>
  );
};

export default Invite;
