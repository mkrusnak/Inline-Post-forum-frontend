import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// import { useContext } from 'react'
// import { AuthContext } from '../context/auth.context'

const AddListing = () => {

    // const { authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const [state, setState] = useState({
        makeModel: '',
        year: '',
        odometr: '',
        imageUrl: '',
        description: '',
        price: '',
        knownFlaws: '',
        tradeOk: ''
    })

const updateState = event => setState({
    ...state, 
    [event.target.name] : event.target.value
})

const handleSubmit = e => {
    e.preventDefault()
  axios.post('http://localhost:3001/listings/add', state)
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

         <label>Make / model:</label>
         <input name="makeModel" value={state.makeModel} onChange={updateState}/>

         <label>Year:</label>
         <input name="year" type="number" value={state.year} onChange={updateState}/>

         <label>Mileage:</label>
         <input name="odometr" type="number" value={state.odometr} onChange={updateState}/>

         <label>Description:</label>
         <input name="description" value={state.description} onChange={updateState}/>

         <label>Image:</label>
         <input name="imageUrl" value={state.imageUrl} onChange={updateState}/>

         <label>Price:</label>
         <input name="price" type="number" value={state.price} onChange={updateState}/>

         <label>Known flaws:</label>
         <input name="knownFlaws" value={state.knownFlaws} onChange={updateState}/>

         <label>Accepting trades:</label>
         <input type="text" name="tradeOk" value={state.tradeOk} onChange={updateState}/>

        <button>Post</button>
     
     </form>
  </div>
    </>
    )
}

export default AddListing;