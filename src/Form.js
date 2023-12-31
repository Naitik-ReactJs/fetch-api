import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const Form = () => {
  const [inputValue, setInputvalue] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [emailError, setEmailError] = useState();
  const [usernameError, setUsernameError] = useState();
  const handleOnchange = (e) => {
    setInputvalue({ ...inputValue, [e.target.name]: e.target.value });

    if (!inputValue.email || inputValue.email.trimStart() === "") {
      setEmailError("Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(inputValue.email)) {
      setEmailError("Incorrect email format");
    } else if (inputValue.email.length === 0) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("Email is valid");
    }

    if (inputValue.username.length < 4) {
      setUsernameError("Username must be at least 4 characters");
    } else {
      setUsernameError("Valid username");
    }
  };

  const submitData = (e) => {
    e.preventDefault();

    // fetch("https://jsonplaceholder.typicode.com/users", {
    //   method: "POST",
    //   body: JSON.stringify(inputValue),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    axios
      .post("https://jsonplaceholder.typicode.com/users", inputValue)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
  };

  const deleteData = (e) => {
    e.preventDefault();
    axios
      .delete("https://jsonplaceholder.typicode.com/users/11", inputValue)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log("deleted");
      });
    // axios.delete(url, {
    //   data: { foo: "bar" },
    //   headers: { Authorization: "token" },
    // });
  };

  return (
    <div className="container">
      <h3 className="text-center p-5">Submit Form data to server</h3>
      <form autoComplete="off">
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={inputValue.name}
            onChange={handleOnchange}
          />
        </div>

        {/* {
          <div className="bg-danger w-25 mt-2 text-center text-light">
            {inputValue.name.length > 1 ? <p>valid</p> : <p>not valid</p>}{" "}
          </div>
        } */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={inputValue.email}
            onChange={handleOnchange}
          />
          <div className="mt-3">
            {inputValue.email && (
              <span className=" w-25 bg-danger text-center p-2 mt-2 mb-2">
                {emailError}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">User name:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your name"
            name="username"
            value={inputValue.username}
            onChange={handleOnchange}
          />
          <span className=" w-25 bg-danger text-center p-2 mt-2 mb-2">
            {usernameError}
          </span>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-danger" onClick={submitData}>
            Submit
          </button>
          <br />
          <button
            type="submit"
            className="btn btn-danger mt-3"
            onClick={deleteData}
          >
            delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
