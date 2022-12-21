import axios from 'axios'
import { STATES } from 'mongoose';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const MarketplacePage = (props) => {

const [listingsArr, setListingsArr] = useState([])


useEffect(() => {
    axios.get('http://localhost:3001/listings', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => {
       console.log(response.data)
       setListingsArr(response.data)
       console.log('here is response front end', setListingsArr)
    })
    .catch(err => console.log(err))
}, [])



    return(
        <div>
        <h1>MARKETPLACE </h1>
        {listingsArr.map(single => {
            return (
                <>
                <h3>{single.title}</h3>
                <h4>Seller: {single.owner.username}</h4>
                <img src={single.imagesUrl[0]} width="300px" alt="photo" />
                <h4>Price:{single.price}</h4>
                <div key={single._id}>

                <Link to={`/listings/${single._id}`}>
                     <h4>More details</h4>
                </Link>
                </div>
                </>
                )
        })}
        </div>
    )
}

export default MarketplacePage;