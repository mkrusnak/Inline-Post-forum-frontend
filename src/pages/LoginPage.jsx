import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Input } from "antd";
import e from "cors";

const LoginPage = () => {
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [testInfo, setTestInfo] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleGuestLogin = () => {
    setTestInfo(!testInfo)
    setState({
      email: "v@gmail.com",
      password: "asdfasdf"
    })
  }

  const updateState = (event) =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, state)
      .then((axiosResponse) => {
        navigate("/home");
        console.log(axiosResponse.data);
        storeToken(axiosResponse.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="listingDetails">
        <h4>Log In</h4>
        <form>
          <label>Email:</label>
          <Input
            className="searchInput"
            name="email"
            value={state.email}
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

          <button onClick={handleSubmit} className="customBttn" role="button">
            Log In
          </button>

          <button
            onClick={handleGuestLogin}
            className="customBttn"
            type="button"
          >
            Guest Login
          </button>
        </form>

        {testInfo && (
          <div className="testLogin">
            <p>Use these credentials to browse around:</p>
            <p>Email: v@gmail.com | Password: asdfasdf</p>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
