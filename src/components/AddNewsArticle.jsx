import { useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import {Input} from 'antd';
import { AuthContext } from "../context/auth.context";

const AddNewsArticle = (props) => {


    const {user} = useContext(AuthContext)

    const navigate = useNavigate();

    const [state, setState] = useState({
        title: '',
        link: '',
        text: '',
        image: ''
      });

      const updateState = e => setState({
        ...state,
        [e.target.name]: e.target.value
      });

      const submitFormHandler = e => {
        
        console.log('form submit works');
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`,{
          title: state.title,
          link: state.link,
          text: state.text,
          image: state.image,
          author: user._id,
          
        } ,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        } )
          .then(axiosResponse => {
            navigate('/')
            console.log(axiosResponse.data);
          })
          .catch(err => console.log(err))
      }

    return(
        <>
    <div className='listingDetails'>
    <h4>Add info:</h4>
     <form onSubmit={submitFormHandler}>

         <label>Title: </label>
         <Input className='searchInput' name="title" value={state.title}  onChange={updateState}/>

         <label>Text: </label>
         <Input className='searchInput' name="text"  value={state.text} onChange={updateState}/>

         <label>Image: </label>
         <Input className='searchInput' name="image"  value={state.image} onChange={updateState}/>

         <label>Link: </label>
         <Input className='searchInput' name="link"  value={state.link} onChange={updateState}/>
          
        <button className="customBttn" role="button">Post</button>
     
     </form>
  </div>
    </>
    )
}

export default AddNewsArticle;