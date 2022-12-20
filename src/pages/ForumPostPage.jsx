import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UpdateListing from "../components/UpdateListing";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";

const ForumPostPage = () => {

const {user} = useContext(AuthContext)

  const { forumId } = useParams();

  const [forumPost, setForumPost] = useState(null);

  const getForumDetails = () => {
    axios.get(`http://localhost:3001/forum/${forumId}`, {
      headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
  })
      .then(axiosResponse => {
        console.log(axiosResponse.data);
        setForumPost(axiosResponse.data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getForumDetails();
  }, [])

  return (
    <div>
      
      {forumPost ? (
        <div>
        <h3>{forumPost.subject}</h3>
        <p>{forumPost.body}</p>
        <img src={forumPost.image} width="300px" alt="carPhoto" />
        <YoutubeEmbed embedId={forumPost.video} /> 
        <img src={forumPost.author.profilePic} width="100px" alt="profilePic" />
        <h2>Author: {forumPost.author.username}</h2>
        <p>{forumPost.createdAt}</p>


<EditPost body={forumPost.body}
subject={forumPost.subject}
image={forumPost.image}
video={forumPost.video}
forumId={forumPost._id} />




          {/* <UpdateListing
            title={listing.title}
            description={listing.description}
            odometr={listing.odometr}
            price={listing.price}
            getListingDetails={getListingDetails}
            listingId={listing._id}
          />
         */}
       {/* {(user._id === listing.owner._id) ? <h1>delete</h1> : null} */}
          

        </div>
      ) : <p>loading...</p>}
    </div>
    
  );
};

export default ForumPostPage;
