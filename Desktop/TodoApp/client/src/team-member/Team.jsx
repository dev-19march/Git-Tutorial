import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./team.css";

const Team = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      fetch("http://localhost:3000/api/getMember").then((response) => response.json()).then((data) => {
        // console.log(data.emails);
        setUser(data.emails);
      })
    }
    fetchdata();
  }, []);

  const resendHandler = async (user) => {
    const email = user.email;
    console.log(email);
    if (user.status === "Verified") {
      alert("bhai kya kr rhe ho. already verified hai")
    } else {
      const result = await fetch("http://localhost:3000/api/member/resend", {
        method: "POST",
        body: JSON.stringify({
          email: email
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      if (result.status === 200) {
        alert("Resend Successfully");
        return;
      }
    }
    navigate("/team-member");
  };

  const deleteHandler = async (email) => {
    console.log(email);
    const result = await fetch("http://localhost:3000/api/member/delete", {
      method: "POST",
      body: JSON.stringify({
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    if (result.status === 200) {
      alert("Delete Successfully");
      return;
    }
    navigate("/team-member");
  }

  return (
    <>
      <form className="team-member-form">
        <h2>Team-Members</h2>

        <div className="member-button-container">
          <button className="left-button">User Id</button>
          <div className="right-buttons">
            <button style={{ marginRight: '6px' }}>Status</button>
            <button style={{ marginRight: '5px' }}>Delete</button>
            <button style={{ marginRight: '5px' }}>Resend</button>
          </div>
        </div>

        {users.map((user) => (
          <div key={user.id} >
            <div className="member-button-container">
              <span>{user.email}</span>
              <div className="right-buttons">
                <button style={{ marginRight: '5px' }}>{user.status}</button>
                <button style={{ marginRight: '3px' }} onClick={() => { deleteHandler(user.email) }}>Delete</button>
                <button style={{ marginRight: '3px' }} onClick={() => { resendHandler(user) }} >Resend</button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default Team;
