import YoutubeEmbed from "../components/YoutubeEmbed";
import AddForumPost from "../components/AddForumPost";

import axios from 'axios'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Search from '../components/Search'

const ForumPage = () => {

  const [isShown, setIsShown] = useState(false);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

// const [postsArr, setPostsArr] = useState([])


const [myPosts, setMyPosts] = useState([]);
const [myPostsCopy, setMyPostsCopy] = useState(myPosts);



const searchPosts = (word) => {
  console.log(word)
    const results = myPostsCopy.filter((el) => {
      // console.log('here element' , el)
    return el.subject.toLowerCase().includes(word.toLowerCase());
  })
  setMyPosts(results);
}



useEffect(() => {
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/forum`, {
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







    return (
      <>
        <h1>THIS IS FORUM PAGE</h1>
        <Search searchPosts = {searchPosts} />
        <button onClick={handleClick}>Create new thread</button>


           {isShown &&    <AddForumPost />}





        
{myPosts.map(single => {
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
  