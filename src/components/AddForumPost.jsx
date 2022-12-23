import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const AddForumPost = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    video: "",
    image: "",
    subject: "",
    body: "",
  });

  const updateState = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const submitFormHandler = (e) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/forum/add`,
        {
          video: state.video,
          image: state.image,
          subject: state.subject,
          body: state.body,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        navigate("/");
        console.log(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="listingDetails">
        <h4>Add more info:</h4>
        <form onSubmit={submitFormHandler}>
          <label>Subject: </label>
          <Input
            className="searchInput"
            name="subject"
            value={state.subject}
            placeholder=""
            onChange={updateState}
            required
          />

          <label>Body: </label>
          <Input
            className="searchInput"
            name="body"
            value={state.body}
            onChange={updateState}
            required
          />

          <label>Video:</label>
          <Input
            className="searchInput"
            name="video"
            value={state.video}
            onChange={updateState}
          />

          <button className="customBttn" role="button">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default AddForumPost;
