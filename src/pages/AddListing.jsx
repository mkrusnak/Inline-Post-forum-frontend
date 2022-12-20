import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// import { useContext } from 'react'
// import { AuthContext } from '../context/auth.context'

const AddListing = () => {

    // const { authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate();


    const [imagesArr, setImagesArr] = useState(['', '']);

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
  axios.post('http://localhost:3001/listings/add', { ...state, imagesUrl: imagesArr }, {
    //this is the configuration object - 3rd argument of axios post and put requests
    headers: {
      authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    navigate('/')
  })
  .catch(err => console.log(err))
}

    return(
        <>
    <div>
    <h1>Add your listing</h1>
     <form onSubmit={handleSubmit}>

         <label>Title:</label>
         <input name="title" value={state.title} onChange={updateState}/>

         <label>Make / model:</label>
         <input name="makeModel" value={state.makeModel} onChange={updateState}/>

         <label>Year:</label>
         <input name="year" type="number" value={state.year} onChange={updateState}/>

         <label>Mileage:</label>
         <input name="odometr" type="number" value={state.odometr} onChange={updateState}/>
          
          <label>Description:</label>
          <input name="description" value={state.description} onChange={updateState}/>
         {imagesArr.map((img, index) => {
          return (
            <>
              <label>Image #{index + 1}:</label>
              <input name="imageUrl" value={imagesArr[index]} onChange={updateImagesArr(index)}/>
              <button onClick={decreaseImagesArr(index)}>Delete Image</button>
            </>
            
          );
         })}

         <button onClick={increaseImagesArr}>Add Image</button>

         

         

          {/* <label>Image #2:</label>
         <input name="imageUrl" value={state.imageUrl} onChange={updateState}/>

         <label>Image #3:</label>
         <input name="imageUrl" value={state.imageUrl} onChange={updateState}/>   */}

         <label>Price:</label>
         <input name="price" type="number" value={state.price} onChange={updateState}/>

         <label>Known flaws:</label>
         <input name="knownFlaws" value={state.knownFlaws} onChange={updateState}/>

         <label>Accepting trades:</label>
         <input type="checkbox" name="tradeOk" value={state.tradeOk} onChange={e => {
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