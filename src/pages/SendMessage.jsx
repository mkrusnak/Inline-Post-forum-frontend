import { useState, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom';


const SendMessage = (props) => {

    console.log(props)
    const {user} = useContext(AuthContext)

    const { recipientUsername } = useParams();


    const [state, setState] = useState({
        subject: '',
        body: '',
        sender: '',
        recipient: ''
      });

      const updateState = e => setState({
        ...state,
        [e.target.name]: e.target.value
      });

      const submitFormHandler = e => {
        e.preventDefault();
        console.log('message sent');
        axios.post(`http://localhost:3001/messages/send`,{
            subject: state.subject,
            body: state.body,
            sender: user._id,
            recipient: authorId
        } ,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        } )
          .then(axiosResponse => {
            console.log(axiosResponse.data);
          })
          .catch(err => console.log(err))
      }



    return(
        <>
    <div>
    <h1>Message to {recipientUsername}</h1>
     <form onSubmit={submitFormHandler}>

         <label>Subject: </label>
         <input name="subject" type="text" value={state.subject}  onChange={updateState}/>

         <label>Body: </label>
         <input name="body" type="text" value={state.body} onChange={updateState}/>

        <button>Send</button>
     
     </form>
  </div>
    </>
    )
}

export default SendMessage;