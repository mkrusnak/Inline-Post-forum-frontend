import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Divider, Input } from 'antd';


// import { useContext } from 'react'
// import { AuthContext } from '../context/auth.context'

const AddListing = () => {

    // const { authenticateUser } = useContext(AuthContext)

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
        title: '',
        makeModel: '',
        year: '',
        odometr: '',

        description: '',
        price: '',
        knownFlaws: '',
        tradeOk: false
    })

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/listings/add`, { ...state, imagesUrl: imagesArr }, {
    //this is the configuration object - 3rd argument of axios post and put requests
    headers: {
      authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    navigate('/listings')
  })
  .catch(err => console.log(err))
}

    return(
        <>
    <div>
    <h1>Add your listing</h1>
     <form onSubmit={handleSubmit}>

         <label>Title:</label>
         <Input name="title" value={state.title} onChange={updateState} required/>

         <label>Make / model:</label>
         <Input name="makeModel" value={state.makeModel} onChange={updateState} required/>

         <label>Year:</label>
         <Input name="year" type="number" value={state.year} onChange={updateState} required/>

         <label>Mileage:</label>
         <Input name="odometr" type="number" value={state.odometr} onChange={updateState} required/>
          
          <label>Description:</label>
          <Input name="description" value={state.description} onChange={updateState} required/>
         {imagesArr.map((img, index) => {
          return (
            <>
              <label>Image #{index + 1}:</label>
              <Input name="imageUrl" value={imagesArr[index]} onChange={updateImagesArr(index)}/>
              <button onClick={decreaseImagesArr(index)}>Delete Image</button>
            </>
            
          );
         })}




           <button onClick={increaseImagesArr}>Add More</button> 

       

      
<br></br>
         <label>Price:</label>
         <Input name="price" type="number" value={state.price} onChange={updateState} required/>

         <label>Known flaws:</label>
         <Input name="knownFlaws" value={state.knownFlaws} onChange={updateState} required/>

         <label>Accepting trades:</label>
         <Input type="checkbox" name="tradeOk" value={state.tradeOk} onChange={e => {
          //console.log('current value', state.tradeOk, 'new value', !state.tradeOk)
          updateState({
            target: {
              name: 'tradeOk',
              value: !state.tradeOk
            }
          })
         }}/>

        <button>Post</button>
     
     </form>
  </div>
    </>
    )
}

export default AddListing;