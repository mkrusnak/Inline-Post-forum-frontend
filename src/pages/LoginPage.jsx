import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Divider, Input } from 'antd';

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
    navigate('/home')
    console.log(axiosResponse.data)
    storeToken(axiosResponse.data.authToken)
    authenticateUser()
    navigate('/home')
  })
  .catch(err => console.log(err))
}

return(
    <>
    <div className='listingDetails'>
    <h4>Log In</h4>
     <form onSubmit={handleSubmit}>

         <label>Email:</label>
         <Input className='searchInput' name="email" value={state.email} onChange={updateState}/>

         <label>Password:</label>
         <Input className='searchInput' name="password" type="password" value={state.password} onChange={updateState}/>

        <button className="customBttn" role="button">Log In</button>
     
     </form>
  </div>
    </>
)}

export default LoginPage;

