import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
         <input name="title" value={state.title} placeholder="" onChange={updateState}/>

         <label>Price: </label>
         <input name="price" type="number" value={state.price} onChange={updateState}/>

         <label>Mileage:</label>
         <input name="odometr" type="number" value={state.odometr} onChange={updateState}/>
          
          <label>Description:</label>
          <input name="description" value={state.description} onChange={updateState}/>
       

        <button>Update</button>
     
     </form>
  </div>
    </>
    )
}

export default UpdateListing;