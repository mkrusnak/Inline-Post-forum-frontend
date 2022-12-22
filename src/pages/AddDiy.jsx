import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Divider, Input } from 'antd';
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const AddDiy = () => {

    const { authenticateUser, user } = useContext(AuthContext)

    const navigate = useNavigate();


    const [imagesArr, setImagesArr] = useState(['']);

    const updateImagesArr = i => e => {
      const copy = [...imagesArr];
      copy[i] = e.target.value;
      setImagesArr(copy);
    }

    const decreaseImagesArr = i => e => {
      const copy = [...imagesArr];
      copy.splice(i, 1);
      setImagesArr(copy);
    }

    const increaseImagesArr = () => {
      const copy = [...imagesArr, '']
      setImagesArr(copy)
    }



    const [state, setState] = useState({
        profilePic: user.profilePic,
        title: '',
        reqTools: '',
        time: '',
        description: '',
        video: '',
        author: user._id
    })

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/diy/add`, { ...state, imagesUrl: imagesArr }, {
    //this is the configuration object - 3rd argument of axios post and put requests
    headers: {
      authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    navigate('/diy')
  })
  .catch(err => console.log(err))
}

    return(
        <>
    <div>
    <h1>Add your DIY</h1>
     <form onSubmit={handleSubmit}>

         <label>Title: </label>
         <Input name="title" value={state.title} onChange={updateState}/>

         <label>Required tools: </label>
         <Input name="reqTools" value={state.reqTools} onChange={updateState}/>

         <label>Time to complete(minutes): </label>
         <Input name="time" type="number" value={state.time} onChange={updateState}/>

         <label>Video: </label>
         <Input name="video" type="text" value={state.video} onChange={updateState}/>
          
          <label>Description:</label>
          <Input name="description" value={state.description} onChange={updateState}/>

         {imagesArr.map((img, index) => {
          return (
            <>
              <label>Image #{index + 1}:</label>
              <Input name="imageUrl" value={imagesArr[index]} onChange={updateImagesArr(index)}/>
              <button onClick={decreaseImagesArr(index)}>Delete Image</button>
            </>
            
          );
         })}

         <button onClick={increaseImagesArr}>Add Image</button>



        <button>Post</button>
     
     </form>
  </div>
    </>
    )
}

export default AddDiy;