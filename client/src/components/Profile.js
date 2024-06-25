import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/profile.css"

const Profile = () => {
  let { user, loggedIn, checkLoggedIn, token, updateUser } = useAuth();

  const [editName, setEditName] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    if (user === undefined && loggedIn === false) {
      checkLoggedIn();
    }
  }, []);

  const changeEditName = () => {
    if (editName) {
      setEditName(false);
    } else {
      setEditName(true);
    }
  };

  const nameOnChange = (e) => {
    setNewNickname(e.target.value);
  };

  const changeNickName = () => {
    let data = {
      userGoogleId: user.uid,
      newNickname,
    };

    if (newNickname !== "" && newNickname !== undefined) {
      fetch("http://192.168.0.31:5000/api/user/change_name", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        response.json().then((data) => {
          if (response.status === 401) {
            console.log(response.statusText);
          } else {
            console.log(data);
            updateUser(data);
          }
        });
      });

      user.nickName = newNickname;
    }
    setEditName(false);
  };

  return user ? (
    <>
      <div className="userPage">
        <h2>Profile page</h2>
        <div>
          {editName ? (
            <>
              <input placeholder="New name" onChange={nameOnChange}></input>
              <button onClick={changeNickName} className="changeNameButton">
                {" "}
                Change name
              </button>
              <button
                onClick={changeEditName}
                className="cancelChangeNameButton"
              >
                {" "}
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="profileUserName">{user.nickName}</p>
              <button className="changeNameButton" onClick={changeEditName}>
                change name
              </button>
            </>
          )}
        </div>
        <div className="addContactContainer">
          <input className="addContactInput" placeholder="new contact"></input>{" "}
          <button className="addContactButton">Add</button>
        </div>
        <div className="contactListContainer">
          <ul className="contactList">
            <li className="contactListElement">
              <input className="contactCheckBox" type={"checkbox"}></input><p className="contactDetail"> Email : {user.email}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Profile;
