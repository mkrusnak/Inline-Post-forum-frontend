import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddForumPost = (props) => {

    // const navigate = useNavigate();

    const [state, setState] = useState({
        video: '',
        image: '',
        subject: '',
        body: ''
      });

      const updateState = e => setState({
        ...state,
        [e.target.name]: e.target.value
      });

      const submitFormHandler = e => {
        
        console.log('form submit works');
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/forum/add`,{
          video: state.video,
          image: state.image,
          subject: state.subject,
          body: state.body
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
    <h1>Post new discussion:</h1>
     <form onSubmit={submitFormHandler}>

         <label>Subject: </label>
         <input name="subject" value={state.subject} placeholder="" onChange={updateState}/>

         <label>Body: </label>
         <input name="body"  value={state.body} onChange={updateState}/>

         <label>Image:</label>
         <input name="image"  value={state.image} onChange={updateState}/>
          
          <label>Video:</label>
          <input name="video" value={state.video} onChange={updateState}/>
       

        <button>Post</button>
     
     </form>
  </div>
    </>
    )
}

export default AddForumPost;