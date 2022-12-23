
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




const [myPosts, setMyPosts] = useState([]);
const [myPostsCopy, setMyPostsCopy] = useState(myPosts);



const searchPosts = (word) => {
  
    const results = myPostsCopy.filter((el) => {
   
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
    
     setMyPosts(response.data)
     setMyPostsCopy(response.data)
  
  })
  .catch(err => console.log(err))
}, [])







    return (
      <div className="forumPage ">
        {/* <h1 className="headerText1">FORUM</h1> */}
        <Search searchPosts = {searchPosts} />
        
<div className="forumBttnDiv">
<button className="customBttn forumBttn" role="button" onClick={handleClick}>Create new thread</button>

</div>

      



           {isShown &&    <AddForumPost />}



       

        
{myPosts.map(single => {
  return(
  
  <div className="listingDetails">
  
    <div className="card w-100 commentDiv">
                  <div className="card-body commentBody">

                    <div className="comment">


                      <div className="commentHead">
                        <img
                          className="authorImg"
                          src={single.author.profilePic}
                          height="80px"
                          alt="profilePic"
                        />
                      </div>



                      <div className="commentText forumItem">

   


                      <h4 className="card-text cardText1">{single.subject}</h4>


<p className="card-text cardText1">Author: {single.author.username}</p>


                        




                     
                      </div>






               




                    </div>

<div className="bttnForum1">
 
                    <div >
                    <Link className="linkbttn " to={`/forum/${single._id}`}>
  <button className="customBttn " role="button">Read more</button>
  </Link>
  </div>
  
  </div>


                  </div>
                </div>
  
  
  
  
  </div>
  
  
  
  
  
  
  
  
  
  
  





  )
})}
        
       
      </div>
    );
  };
  
  export default ForumPage;
  


    {/* <>
  <h3>{single.subject}</h3>

  <h2>Author: {single.author.username}</h2>
  <img src={single.author.profilePic} width="100px" alt="profilePic" />

  

  <p>{single.createdAtTime}</p>

  <Link className="linkbttn" to={`/forum/${single._id}`}>
  <button className="customBttn" role="button">Read more</button>
  </Link>
  </> */}