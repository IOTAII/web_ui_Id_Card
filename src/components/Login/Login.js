import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import "./Login.css";
import imglogin from "../../Images/img1.jpeg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import axios from "axios"; 

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { loginUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (rememberMe && storedUsername && storedPassword) {
      setValues({
        ...values,
        username: storedUsername,
        password: storedPassword,
      });
    }
  }, [rememberMe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://3.109.34.34:8080/login_name",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response); 

      if (response.status === 200) {
        const responseData = response.data;

        console.log("Response data:", responseData);

        if (responseData.message === "Admin login successful") {
          console.log("Admin logged in successfully");
          navigate(`/admin/dashboard`); 
        } else if (responseData.message === "User login successful") {
          console.log("Regular user logged in successfully");
          loginUser({ username: values.username });
          navigate(`/home/${responseData.user_id}`);

          if (rememberMe) {
            localStorage.setItem("username", values.username);
            localStorage.setItem("password", values.password);
          }
        } else {
          setErrorMsg("Invalid credentials");
          console.error("Error response:", response);
          console.log("Response body:", response.data);
        }
      } else {
        setErrorMsg("Invalid credentials");
        console.error("Error response:", response);
        console.log("Response body:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg("Internal Server Error");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const togglePasswordVisibility = () => {
    setValues((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  

  return (
    <div className="flex flex-wrap flex-col-reverse md:flex-row items-center justify-center h-screen w-screen py-8 bg-gradient-to-t from-emerald-300 to-indigo-300 fixed top-0 left-0 right-0">
      <div
        className="w-64 h-48 md:w-5/12 md:h-4/6 bg-cover text-white rounded-xl"
        style={{ backgroundImage: `url(${imglogin})` }}
      ></div>
      <div className="flex flex-col justify-center items-center flex-wrap bg-transparent rounded-lg  mb-10 p-4 md:ml-20 ">
        <div className="pb-2 border-solid border-b-2 w-full justify-center text-center mb-2">
          <h1 className="font-serif text-3xl underline text-blue-900">Log In</h1>
        </div>
        <form className="" action="post" onKeyPress={handleKeyPress}>
          <div className="pb-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              User Name
            </label>
            <label className="relative text-gray-600 justify-center w-full items-center bg-white p-1 flex rounded-lg">
              <input
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, username: event.target.value }))
                }
                value={values.username}
                label="username"
                placeholder="Enter your user-name"
                className="text-gray-900 sm:text-sm rounded-lg block w-full p-2 focus:outline-none"
                required=""
              />
            </label>
          </div>

          <div className="w-72">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={values.showPassword ? "text" : "password"} 
                name="password"
                id="password"
                value={values.password}
                placeholder="••••••••"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
                className="text-gray-900 sm:text-sm rounded-lg block w-full p-2 focus:outline-none h-12"
                required=""
              />
              <span
                className="absolute right-0 top-0 mt-3 mr-4 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {values.showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          

          <b className="">{errorMsg}</b>
          <button
            type="submit"
            onClick={handleSubmit}
            className="cta cta--is-1 custom-button"
          >
            <span>Log In</span>
          </button>

        </form>
      </div>
    </div>
  );
}
