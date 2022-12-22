import axios from 'axios'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Search from '../components/Search';

const MarketplacePage = (props) => {

    
    const [myPosts, setMyPosts] = useState([]);
    const [myPostsCopy, setMyPostsCopy] = useState(myPosts);
  

    // const [listingsArr, setListingsArr] = useState([])

  


  const searchPosts = (word) => {
    console.log(word)
      const results = myPostsCopy.filter((el) => {
        // console.log('here element' , el)
      return el.title.toLowerCase().includes(word.toLowerCase());
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





// const [myPosts, setMyPosts] = useState(listingsArr);
// const [myPostsCopy, setMyPostsCopy] = useState(listingsArr);



    return(
        <div>
        <h1>MARKETPLACE </h1>
        <Search searchPosts = {searchPosts} />
        {myPosts.map( single => {
            return (
                <>
                <h3>Title: {single.title}</h3>
                <h4>Seller: {single.owner.username}</h4>
                <img src={single.imagesUrl[0]} width="300px" alt="photo" />
                <h4>Price:{single.price}</h4>
                <p>Posted: {single.createdAtTime}</p>
                <div key={single._id}>




                <Link to={`/listings/${single._id}`}>
                     <button>More details</button>
                </Link>
                </div>
                </>
                )
        })}
        </div>
    )
}

export default MarketplacePage;