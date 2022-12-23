import { useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { Divider, Input } from 'antd';


const ProfileSettings = (props) => {

    const {user} = useContext(AuthContext)


   const navigate = useNavigate();

    const [state, setState] = useState({
       city: '',
       usstate: '',
       profilePic: '',
       drivingNow: '',
       drivingNowImg: '',
       prevCar: '',
       prevCarImg: '',
       status: '',
       dreamCar: '',
       dreamCarImg: ''
})

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    // e.preventDefault()
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
    <h1>Update profile info</h1>
     <form onSubmit={handleSubmit}>

         <label>Profile picture:</label>
         <Input className='searchInput' name="profilePic" placeholder={props.profilePic} value={state.profilePic} onChange={updateState} required/>
         

         <label>Current car:</label>
         <Input className='searchInput' name="drivingNow" placeholder={props.drivingNow} value={state.drivingNow} onChange={updateState} required/>

         <label>City:</label>
         <Input className='searchInput' name="city" placeholder={state.city}  value={state.city} onChange={updateState} required/>

         <label>State:</label>
         <Input className='searchInput' name="usstate"  placeholder={state.usstate} value={state.usstate} onChange={updateState} required/>


         <label>Current car photo:</label>
         <Input className='searchInput' name="drivingNowImg" placeholder={props.drivingNowImg} value={state.drivingNowImg} onChange={updateState} required/>

         <label>First car:</label>
         <Input className='searchInput' name="prevCar" placeholder={props.prevCar} value={state.prevCar} onChange={updateState} required/>

         <label>First car photo:</label>
         <Input className='searchInput' name="prevCarImg" placeholder={props.prevCarImg} value={state.prevCarImg} onChange={updateState} required/>

         <label>Status:</label>
         <Input className='searchInput' name="status" placeholder={props.status} value={state.status} onChange={updateState} required/>

         <label>Dream Car:</label>
         <Input className='searchInput' name="dreamCar" placeholder={props.dreamCar} value={state.dreamCar} onChange={updateState} required/>

         <label>Dream car photo:</label>
         <Input className='searchInput' name="dreamCarImg" placeholder={props.dreamCarImg} value={state.dreamCarImg} onChange={updateState} required/>
         
        <button className="customBttn" role="button">Update</button>
     
     </form>
  </div>
    </>
)}

export default ProfileSettings;