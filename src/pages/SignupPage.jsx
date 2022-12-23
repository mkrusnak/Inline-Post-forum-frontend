import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const SignupPage = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const updateState = (event) =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, state)
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="listingDetails">
        <h4>Create new account</h4>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <Input
            className="searchInput"
            name="username"
            value={state.username}
            onChange={updateState}
          />

          <label>Email:</label>
          <Input
            className="searchInput"
            name="email"
            value={state.email}
            onChange={updateState}
          />

          <label>City:</label>
          <Input
            className="searchInput"
            name="city"
            value={state.city}
            onChange={updateState}
          />

          <label>State:</label>
          <Input
            className="searchInput"
            name="state"
            value={state.state}
            onChange={updateState}
          />

          <label>Password:</label>
          <Input
            className="searchInput"
            name="password"
            type="password"
            value={state.password}
            onChange={updateState}
          />

          <button className="customBttn" role="button">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
