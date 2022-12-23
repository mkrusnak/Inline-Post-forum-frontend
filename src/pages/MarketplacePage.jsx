import axios from 'axios'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Search from '../components/Search';

const MarketplacePage = (props) => {

    
    const [myPosts, setMyPosts] = useState([]);
    const [myPostsCopy, setMyPostsCopy] = useState(myPosts);
  
    const searchPosts = (word) => {
        console.log(word)
          const results = myPostsCopy.filter((el) => {
       
          return el.makeModel.toLowerCase().includes(word.toLowerCase());
        })
        setMyPosts(results);
      }

useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/listings`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => {
       console.log(response.data)
       setMyPosts(response.data)
       setMyPostsCopy(response.data)
       console.log('here is response front end', setMyPosts)
    })
    .catch(err => console.log(err))
}, [])


    return(
        <div>
        <h1 className="headerText1">MARKETPLACE </h1>




        <Search searchPosts = {searchPosts} />

    
        
        
        
        <div className="card-group marketplaceGroup">
        {myPosts.map( single => {
            return (
                <>



                <div key={single._id} className="card marketCard">
    <img className="card-img-top" src={single.imagesUrl[0]} alt="Card image cap" />
    <div className="card-body">
      <h4 className="card-title">{single.makeModel}</h4>
      <p className="card-text">{single.title}</p>
      <p className="card-text">Mileage: {single.odometr} mi</p>
      <h6>Price: {single.price}$</h6>
      <h6>Seller: {single.owner.username}</h6>
      
      <Link to={`/listings/${single._id}`}>
                     <button className="customBttn" role="button">More details</button>
                </Link>
    </div>
    <div className="card-footer">
      <small className="text-muted">Posted: {single.createdAtTime}</small>
     
    </div>
  </div>




                {/* <h3>Title: {single.title}</h3>
                <h3>Make / model: {single.makeModel}</h3>
                <h4>Seller: {single.owner.username}</h4>
                <img src={single.imagesUrl[0]} width="300px" alt="photo" />
                <h4>Price:{single.price}</h4>
                <p>Posted: {single.createdAtTime}</p>
                <div key={single._id}>




                <Link to={`/listings/${single._id}`}>
                     <button className="customBttn" role="button">More details</button>
                </Link>
                </div> */}
                </>
                )
        })}
        </div>
        </div>
    )
}

export default MarketplacePage;





