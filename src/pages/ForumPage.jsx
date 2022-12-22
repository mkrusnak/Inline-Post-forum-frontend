import YoutubeEmbed from "../components/YoutubeEmbed";
import AddForumPost from "../components/AddForumPost";

import axios from 'axios'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const ForumPage = () => {

const [postsArr, setPostsArr] = useState([])

useEffect(() => {
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/forum`, {
      headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
  })
  .then(response => {
     console.log(response.data)
     setPostsArr(response.data)
     console.log('here is response front end', setPostsArr)
  })
  .catch(err => console.log(err))
}, [])







    return (
      <>
        <h1>THIS IS FORUM PAGE</h1>
        <AddForumPost />
{postsArr.map(single => {
  return(
  <>
  <h3>{single.subject}</h3>
  {/* <h4>{single.body}</h4>
  <img src={single.image} width="300px" alt="carPhoto" /> */}
  {/* <YoutubeEmbed embedId={single.video} /> */}
  <h2>Author: {single.author.username}</h2>
  <img src={single.author.profilePic} width="100px" alt="profilePic" />

  

  {/* <Button component={Link} to={`/forum/${single._id}`>
        </p>
      </Button> */}

  <p>{single.createdAtTime}</p>

  <Link className="linkbttn" to={`/forum/${single._id}`}>
  <button>Read more</button>
  </Link>

    
  </>
  )
})}
        
       
      </>
    );
  };
  
  export default ForumPage;
  