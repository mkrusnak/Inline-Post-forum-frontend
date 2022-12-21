// import { useState, useContext} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from "../context/auth.context";


// const AccountSettings = () => {

//     const {user} = useContext(AuthContext)


//    const navigate = useNavigate();

//     const [state, setState] = useState({
//        profilePic: '',
//        drivingNow: '',
//        drivingNowImg: '',
//        prevCar: '',
//        status: '',
//        dreamCar: '',
//        dreamCarImg: ''
// })

// const updateState = event => setState({
//     ...state, 
//     [event.target.name] : event.target.value
// })

// const handleSubmit = e => {
//     e.preventDefault()
//   axios.put(`http://localhost:3001/user/settings/${user._id}`, state, {
//     headers: {
//         authorization: `Bearer ${localStorage.getItem('authToken')}`
//     }
// } )
//   .then(axiosResponse => {
//     console.log(axiosResponse.data)
//     navigate('/')
//   })
//   .catch(err => console.log(err))
// }

// return(
//     <>
//     <div className="AddApartmentPage">
//     <h1>Update Your Account</h1>
//      <form onSubmit={handleSubmit}>

//          <label>Profile picture:</label>
//          <input name="profilePic" value={state.profilePic} onChange={updateState}/>
         
//          <label>Current car:</label>
//          <input name="drivingNow" value={state.drivingNow} onChange={updateState}/>

//          <label>Current car photo:</label>
//          <input name="drivingNowImg" value={state.drivingNowImg} onChange={updateState}/>

//          <label>Previous car:</label>
//          <input name="prevCar" value={state.prevCar} onChange={updateState}/>

//          <label>Previous car photo:</label>
//          <input name="prevCarImg" value={state.prevCarImg} onChange={updateState}/>

//          <label>Status:</label>
//          <input name="status" value={state.status} onChange={updateState}/>

//          <label>Dream Car:</label>
//          <input name="dreamCar" value={state.dreamCar} onChange={updateState}/>

//          <label>Dream car photo:</label>
//          <input name="dreamCarImg" value={state.dreamCarImg} onChange={updateState}/>
         
//         <button>Sign Up</button>
     
//      </form>
//   </div>
//     </>
// )}

// export default AccountSettings;