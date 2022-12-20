import { useState} from 'react'
import axios from 'axios'




const SendMessage = (props) => {

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
            sender: state.sender ,
            recipient: state.recipient
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
    <h1>Send Message:</h1>
     <form onSubmit={submitFormHandler}>

         <label>Subject: </label>
         <input name="subject" type="text" value={state.subject}  onChange={updateState}/>

         <label>Body: </label>
         <input name="body" type="text" value={state.body} onChange={updateState}/>

         <label>sender: </label>
         <input name="sender" type="text" value={state.sender} onChange={updateState}/>

         <label>recipient: </label>
         <input name="recipient" type="text" value={state.recipient} onChange={updateState}/>

        <button>Send</button>
     
     </form>
  </div>
    </>
    )
}

export default SendMessage;