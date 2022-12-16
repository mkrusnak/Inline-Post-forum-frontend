import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

   const navigate = useNavigate();

    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    })

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.post('http://localhost:3001/auth/signup', state)
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    navigate('/login')
  })
  .catch(err => console.log(err))
}

return(
    <>
    <div className="AddApartmentPage">
    <h1>Create new account</h1>
     <form onSubmit={handleSubmit}>

         <label>Username:</label>
         <input name="username" value={state.username} onChange={updateState}/>

         <label>Email:</label>
         <input name="email" value={state.email} onChange={updateState}/>

         <label>Password:</label>
         <input name="password" value={state.password} onChange={updateState}/>

        <button>Sign Up</button>
     
     </form>
  </div>
    </>
)}

export default SignupPage;

