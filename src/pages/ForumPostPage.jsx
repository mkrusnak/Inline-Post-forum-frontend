import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";
import AddComment from "../components/AddComment";

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


  const deleteHandler = e => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/forum/delete/${forumId}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(axiosResponse => {
        console.log(axiosResponse.data)
        navigate('/forum')
    })
    .catch(err => console.log(err))
}





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


        <h2>Comments:</h2>
        {forumPost.comments.map(comment => {
            <>
            <img src={comment.profilePic} height='50px' alt='profilePic' />
            <h5>{comment.author}</h5>
            <p>{comment.text}</p>
            </>
        })}

        <AddComment postId={forumPost._id} />


       {(user._id === forumPost.author._id) ?  
       
       <>
       <EditPost body={forumPost.body}
subject={forumPost.subject}
image={forumPost.image}
video={forumPost.video}
forumId={forumPost._id} />


<button onClick={deleteHandler}>Delete</button>

       </>   : null}



          

        </div>
      ) : <p>loading...</p>}
    </div>
    
  );
};

export default ForumPostPage;
