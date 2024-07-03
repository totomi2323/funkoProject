import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/profile.css";

const Profile = () => {
  let { user, loggedIn, checkLoggedIn, token, updateUser } = useAuth();

  const [editName, setEditName] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [contactOption, setContactOption] = useState("Facebook");
  const [contactValue, setContactValue] = useState(undefined);

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
            updateUser(data);
          }
        });
      });

      user.nickName = newNickname;
    }
    setEditName(false);
  };

  const contactOptionOnChange = (e) => {
    setContactOption(e.target.value);
  };

  const contactValueOnChange = (e) => {
    setContactValue(e.target.value);
    console.log(e.target.value);
  };

  const addNewContact = () => {
    if (contactValue && contactOption) {
      console.log("Working");
      let newContact = {
        name: contactOption,
        details: contactValue,
        display: true,
      };
      user.contact.push(newContact);

      const data = { userGoogleId: user.uid, newContact };

      fetch("http://192.168.0.31:5000/api/user/contact/add", {
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
            updateUser(data);
          }
        });
      });

      setContactOption(undefined);
      setContactValue(undefined);
    } else {
      console.log("Undefined values");
    }
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
                Change name
              </button>
              <button
                onClick={changeEditName}
                className="cancelChangeNameButton"
              >
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
          <label htmlFor="contactName"> Choose a contact option: </label>
          <select name="contactName" onChange={contactOptionOnChange}>
            <option value="Facebook">Facebook</option>
            <option value="Whatsapp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Ebay">Ebay</option>
            <option value="Instagram">Instagram</option>
            <option value="other">Other</option>
          </select>
          <input
            className="contactValue"
            placeholder="qwe@asd.com"
            onChange={contactValueOnChange}
          ></input>
          <button className="addContactButton" onClick={addNewContact}>
            Add
          </button>
        </div>
        <div className="contactListContainer">
          <ul className="contactList">
            {user.contact.map((cont) => {
              return (
                <li className="contactListElement" key={cont._id}>
                  <input
                    className="contactCheckBox"
                    type={"checkbox"}
                    defaultChecked={cont.display}
                  ></input>
                  <p className="contactDetail">
                    {cont.name}: {cont.details}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={() => {
            console.log(user);
          }}
        >
          asd
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Profile;
