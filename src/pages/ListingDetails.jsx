import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UpdateListing from "../components/UpdateListing";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SendMessageComp from "../components/SendMessage";

const ListingDetails = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShownEdit, setIsShownEdit] = useState(false);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  const handleClickEdit = (e) => {
    setIsShownEdit((current) => !current);
  };

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { listingId } = useParams();

  const [listing, setListing] = useState(null);

  const getListingDetails = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/listings/${listingId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setListing(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const deleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/listings/delete/${listingId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate("/listings");
      })
      .catch((err) => console.log(err));
  };

  const linkmessage = `/listings/${listingId}`;

  return (
    <div className="listingDetails">
      {/* <h1 className="headerText1">Listing details</h1> */}

      {listing ? (
        <div>
          <h3 className="headerText1">{listing.title}</h3>
         

          <div class="row1">
            {listing.imagesUrl.map((singleImg) => {
              return (


                <div class="column1">
    <img src={singleImg} alt="Snow" width="100%" />
  </div>

            









              
              );
            })}
         </div>

<div className="description">
          <p>{listing.description}</p>
</div>




          <div className="card searchInput" width="100%">
  <div className="card-header">
  <h4>{listing.makeModel}</h4>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h6><strong>Mileage:</strong> {listing.odometr} mi</h6></li>
    <li className="list-group-item"><h6><strong>Year:</strong> {listing.year}</h6></li>
    <li className="list-group-item"><h6><strong>Price:</strong> {listing.price} $</h6></li>
    <li className="list-group-item"><h6><strong>Known flaws:</strong> {listing.knownFlaws}</h6></li>
   
    <li className="list-group-item"><h6><strong>Accepting trades:</strong> {listing.tradeOk ? <p>Yes</p> : <p>No</p>}</h6></li>
    <li className="list-group-item"><h6><strong>Seller:</strong> {listing.owner.username}</h6></li>
    <li className="list-group-item"><h6><strong>Loaction:</strong> {listing.owner.city}, {listing.owner.state}</h6></li>

 
  </ul>
</div>


          <Link to={`/profile/${listing.owner._id}`}>
            <button className="customBttn" role="button">
              View Profile
            </button>
          </Link>

          {user._id === listing.owner._id ? (
            <>
              <button
                className="customBttn"
                role="button"
                onClick={handleClickEdit}
              >
                Edit listing
              </button>

              <button
                className="customBttn"
                role="button"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </>
          ) : (
            <button className="customBttn" role="button" onClick={handleClick}>
              Message
            </button>
          )}

          {isShownEdit && (
            <UpdateListing
              title={listing.title}
              description={listing.description}
              odometr={listing.odometr}
              price={listing.price}
              getListingDetails={getListingDetails}
              listingId={listing._id}
            />
          )}

          {isShown && (
            <SendMessageComp
              postId={linkmessage}
              to={listing.owner._id}
              recipient={listing.owner.username}
            />
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ListingDetails;



  {/* <div className="col-lg-3 col-md-3 col-xs-3 thumb">
                  <img
                    className="img-responsive"
                    width="400px"
                    src={singleImg}
                    alt="carPhoto"
                  />
                </div> */}






                    {/* <div class="carImages ">

        <div class="col-md-3 col-sm-6 col-xs-12 listingPad">
       
          <img alt="AltText" src={listing.imagesUrl[0]} class="img-responsive img-fluid carImg" />
        
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12 listingPad">
       
            <img  alt="AltText" src={listing.imagesUrl[1]} class="img-responsive img-fluid  carImg" />
        
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12 listingPad">
        
            <img src={listing.imagesUrl[2]} alt="AltText" class="img-responsive img-fluid  carImg" />
       
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12 listingPad">
       
            <img alt="AltText" src={listing.imagesUrl[3]} class="img-responsive img-fluid  carImg" />
      
        </div>


       
    </div> */}




    {/* 
                <div className="row carImages">
          <div className="col-md-3 col-sm-6 col-xs-12">
        
            <img alt="AltText" src={singleImg} className="img-responsive carImg" />
        
       



            </div>
          </div> */}