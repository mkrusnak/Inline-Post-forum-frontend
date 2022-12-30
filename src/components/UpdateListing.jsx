import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const UpdateListing = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: props.title,
    description: props.description,
    odometr: props.odometr,
    price: props.price,
  });

  const updateState = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const submitFormHandler = (e) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/listings/edit/${props.listingId}`,
        {
          title: state.title,
          description: state.description,
          odometr: state.odometr,
          price: state.price,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        props.getListingDetails();
        navigate(`/listings/${props.listingId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <h5>Update your listing:</h5>
        <form onSubmit={submitFormHandler}>
          <label>Title: </label>
          <Input
            className="searchInput"
            name="title"
            value={state.title}
            onChange={updateState}
            required
          />

          <label>Price: </label>
          <Input
            className="searchInput"
            name="price"
            type="number"
            value={state.price}
            onChange={updateState}
            required
          />

          <label>Mileage:</label>
          <Input
            className="searchInput"
            name="odometr"
            type="number"
            value={state.odometr}
            onChange={updateState}
            required
          />

          <label>Description:</label>
          <Input
            className="searchInput"
            name="description"
            value={state.description}
            onChange={updateState}
            required
          />

          <button className="customBttn" role="button">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateListing;
