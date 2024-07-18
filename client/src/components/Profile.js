import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/profile.css";

const Profile = () => {
  const { user, loggedIn, checkLoggedIn, token, updateUser } = useAuth();

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
  };

  const addNewContact = () => {
    const errorElement = document.getElementById("error");
    errorElement.style.display = "none";
    
    if (contactValue && contactOption) {
      let newContact = {
        name: contactOption,
        details: contactValue,
      };

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

      setContactValue(undefined);
      document.querySelector(".addContactInput").value=""
    } else {
      console.log("Undefined values");
    }
  };

  const deleteContact = (e) => {
    const errorElement = document.getElementById("error");

    if (user.contact.length <= 1) {
      console.log("You must have atleast one contact");

      errorElement.textContent = "You must have atleast one contact";
      errorElement.style.display = "block";
    } else {
      errorElement.style.display = "none";

      let data = { userGoogleId: user.uid, contactID: e.target.parentNode.id };

      fetch("http://192.168.0.31:5000/api/user/contact/delete", {
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
    }
  };

  return user ? (
    <>
      <div className="userPage">
        <h2 className="profilePageHeader">Profile page</h2>
        <div className="profileNameContainer">
          {editName ? (
            <>
              <input
                placeholder="New name"
                onChange={nameOnChange}
                className="newNameInput"
              ></input>
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
          <select
            name="contactName"
            onChange={contactOptionOnChange}
            className="contactNameOption"
          >
            <option value="Facebook">Facebook</option>
            <option value="Whatsapp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Ebay">Ebay</option>
            <option value="Instagram">Instagram</option>
            <option value="other">Other</option>
          </select>
          <input
            placeholder="qwe@asd.com"
            onChange={contactValueOnChange}
            className="addContactInput"
          ></input>
          <button className="addContactButton" onClick={addNewContact}>
            Add
          </button>
        </div>
        <div className="contactListContainer">
          <ul className="contactList">
            {user.contact.map((cont) => {
              return (
                <li className="contactListElement" id={cont._id} key={cont._id}>
                  <p className="contactDetail">
                    {cont.name}: {cont.details}
                  </p>
                  <button className="deleteContact" onClick={deleteContact}>
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p id="error"></p>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Profile;
