import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Divider, Input } from 'antd';

const UpdateListing = (props) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        title: props.title,
        description: props.description,
        odometr: props.odometr,
        price: props.price
      });

      const updateState = e => setState({
        ...state,
        [e.target.name]: e.target.value
      });

      const submitFormHandler = e => {
        e.preventDefault();
        console.log('form submit works');
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/listings/edit/${props.listingId}`,{
          title: state.title,
          description: state.description,
          odometr: state.odometr,
          price: state.price
        } ,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        } )
          .then(axiosResponse => {
            console.log(axiosResponse.data);
            props.getListingDetails();
            console.log('here is test here')
            // navigate(`/listings/${props.listingId}`)
          })
          .catch(err => console.log(err))
      }

    return(
        <>
    <div>
    <h1>Update your listing:</h1>
     <form onSubmit={submitFormHandler}>

         <label>Title: </label>
         <Input name="title" value={state.title} placeholder="" onChange={updateState} required/>

         <label>Price: </label>
         <Input name="price" type="number" value={state.price} onChange={updateState} required/>

         <label>Mileage:</label>
         <Input name="odometr" type="number" value={state.odometr} onChange={updateState} required/>
          
          <label>Description:</label>
          <Input name="description" value={state.description} onChange={updateState} required/>
       

        <button>Update</button>
     
     </form>
  </div>
    </>
    )
}

export default UpdateListing;