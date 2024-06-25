import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Profile = () => {
  let { user, loggedIn, checkLoggedIn, token } = useAuth();

  const [editName, setEditName] = useState(false);
  const [newNickname, setNewNickname] = useState("")

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
    setNewNickname(e.target.value)
  }

  const changeNickName = () => {

    let data = {
        userGoogleId : user.uid,
        newNickname
    }

        if ((newNickname !== "") && (newNickname !== undefined)) {
            fetch("http://192.168.0.31:5000/api/user/change_name", {
                method: "POST",
                mode: "cors",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(data),
              });
              user.nickName = newNickname;
        }
    setEditName(false)
  }

  return user ? (
    <>
      <div className="userPage">
        <h2>Profile page</h2>
        <div>
          {editName ? (
            <>
              <input placeholder="New name" onChange={(nameOnChange)}></input>
              <button onClick={changeNickName}> Change name</button>
              <button onClick={changeEditName}> Cancel</button>
            </>
          ) : (
            <>
              <p>{user.nickName}</p>
              <button onClick={changeEditName}>change name</button>
            </>
          )}
        </div>
        <div className="addContactContainer">
          <input placeholder="new contact"></input> <button>Add</button>
        </div>
        <div className="contactList">
          <ul>
            <li>
              {" "}
              <input type={"checkbox"}></input> Email : {user.email}
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            console.log(user);
          }}
        >
          Console
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Profile;
