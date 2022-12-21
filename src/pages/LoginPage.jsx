import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const LoginPage = () => {

    const { storeToken, authenticateUser } = useContext(AuthContext)

   const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: ''
    })

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, state)
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    storeToken(axiosResponse.data.authToken)
    authenticateUser()
    navigate('/')
  })
  .catch(err => console.log(err))
}

return(
    <>
    <div>
    <h1>Log In</h1>
     <form onSubmit={handleSubmit}>

         <label>Email:</label>
         <input name="email" value={state.email} onChange={updateState}/>

         <label>Password:</label>
         <input name="password" type="password" value={state.password} onChange={updateState}/>

        <button>Log In</button>
     
     </form>
  </div>
    </>
)}

export default LoginPage;

