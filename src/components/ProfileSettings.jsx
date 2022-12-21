import { useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";


const ProfileSettings = (props) => {

    const {user} = useContext(AuthContext)


   const navigate = useNavigate();

    const [state, setState] = useState({
       profilePic: '',
       drivingNow: '',
       drivingNowImg: '',
       prevCar: '',
       status: '',
       dreamCar: '',
       dreamCarImg: ''
})

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/settings/${user._id}`, state, {
    headers: {
        authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
} )
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    navigate('/')
  })
  .catch(err => console.log(err))
}

return(
    <>
    <div className="AddApartmentPage">
    <h1>Update Your Account</h1>
     <form onSubmit={handleSubmit}>

         <label>Profile picture:</label>
         <input name="profilePic" placeholder={props.profilePic} value={state.profilePic} onChange={updateState} required/>
         
         <label>Current car:</label>
         <input name="drivingNow" placeholder={props.drivingNow} value={state.drivingNow} onChange={updateState} required/>

         <label>Current car photo:</label>
         <input name="drivingNowImg" placeholder={props.drivingNowImg} value={state.drivingNowImg} onChange={updateState} required/>

         <label>Previous car:</label>
         <input name="prevCar" placeholder={props.prevCar} value={state.prevCar} onChange={updateState} required/>

         <label>Previous car photo:</label>
         <input name="prevCarImg" placeholder={props.prevCarImg} value={state.prevCarImg} onChange={updateState} required/>

         <label>Status:</label>
         <input name="status" placeholder={props.status} value={state.status} onChange={updateState} required/>

         <label>Dream Car:</label>
         <input name="dreamCar" placeholder={props.dreamCar} value={state.dreamCar} onChange={updateState} required/>

         <label>Dream car photo:</label>
         <input name="dreamCarImg" placeholder={props.dreamCarImg} value={state.dreamCarImg} onChange={updateState} required/>
         
        <button>Update</button>
     
     </form>
  </div>
    </>
)}

export default ProfileSettings;