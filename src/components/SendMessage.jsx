import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Input } from "antd";

const SendMessageComp = (props) => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { recipientId } = useParams();

  const [state, setState] = useState({
    subject: "",
    body: "",
    sender: "",
    recipient: "",
  });

  const updateState = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const submitFormHandler = (e) => {
    // e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/messages/send`,
        {
          subject: state.subject,
          body: state.body,
          sender: user._id,
          recipient: props.to,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        // navigate(`${props.postId}`)
        console.log(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="messageComp">
        <h4>Message to {props.recipient}</h4>
        <form onSubmit={submitFormHandler}>
          <label>Subject: </label>
          <Input
            className="searchInput"
            name="subject"
            type="text"
            value={state.subject}
            onChange={updateState}
            required
          />

          <label>Message: </label>
          <Input
            className="searchInput"
            name="body"
            type="text"
            value={state.body}
            onChange={updateState}
            required
          />

          <button className="customBttn" role="button">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default SendMessageComp;
