import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UpdateListing from "../components/UpdateListing";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const ListingDetails = () => {

  const navigate = useNavigate();

const {user} = useContext(AuthContext)

  const { listingId } = useParams();

  const [listing, setListing] = useState(null);

  const getListingDetails = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/listings/${listingId}`, {
      headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
  })
      .then(axiosResponse => {
        console.log(axiosResponse.data);
        setListing(axiosResponse.data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getListingDetails();
  }, [])

  const deleteHandler = e => {
    e.preventDefault();
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/listings/delete/${listingId}`, {
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



  return (
    <div className="ProjectDetails">
      <h1>Listing details</h1>
      {listing ? (
        <div>
        <h3>{listing.title}</h3>
        {/* <img src={listing.imagesUrl[0]} alt='carPhoto' /> */}
        <h4>Make / model: {listing.makeModel}</h4>
                <h4>Odo: {listing.odometr}</h4>
                <h4>Year: {listing.year}</h4>
                <h4>Price: {listing.price}</h4>
                <p>{listing.description}</p>
                <p>{listing.knownFlaws}</p>
                <p>Seller: {listing.owner.username}</p>
                <div>Accepting trades: { listing.tradeOk ? <p>Yes</p> : <p>No</p>}</div>
          
            {listing.imagesUrl.map(singleImg => {
              return <img src={singleImg} width="300px" alt="carphoto" />
            })}
         
            <Link  to={`/messages/send/${listing.owner._id}`} >
                     <h4>Send Message</h4>
             </Link>
          <Link  to={`/profile/${listing.owner._id}`} >
                     <h4>View Profile</h4>
             </Link>

     
       {(user._id === listing.owner._id) ?
       
       <>
       <UpdateListing
            title={listing.title}
            description={listing.description}
            odometr={listing.odometr}
            price={listing.price}
            getListingDetails={getListingDetails}
            listingId={listing._id}
/>

<button onClick={deleteHandler}>Delete</button>
</>
 : null}
          

        </div>
      ) : <p>loading...</p>}
    </div>
    
  );
};

export default ListingDetails;
