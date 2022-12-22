import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";
import AddComment from "../components/AddComment";
import { Link } from "react-router-dom";
import SendMessageComp from "../components/SendMessage";

const SingleDiy = () => {

  const [isShown, setIsShown] = useState(false);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };


  const { user } = useContext(AuthContext);

  const { diyId } = useParams();

  const [diyPost, setDiyPost] = useState(null);

  const getDiyDetails = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/diy/${diyId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setDiyPost(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDiyDetails();
  }, []);

  //   const deleteHandler = e => {
  //     e.preventDefault();
  //     axios.delete(`http://localhost:3001/forum/delete/${diyId}`, {
  //         headers: {
  //             authorization: `Bearer ${localStorage.getItem('authToken')}`
  //         }
  //     })
  //     .then(axiosResponse => {
  //         console.log(axiosResponse.data)
  //         navigate('/forum')
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <div>
      {diyPost ? (
        <div>
          <h3>Title: {diyPost.title}</h3>
          <p>What to do: {diyPost.description}</p>
          <p>Required tools: {diyPost.reqTools}</p>
          <p>Time to complete: {diyPost.time} minutes.</p>

          {diyPost.imagesUrl.map((singleImg) => {
            return <img src={singleImg} width="200px" alt="carphoto" />;
          })}
          <YoutubeEmbed embedId={diyPost.video} />

          <img src={diyPost.author.profilePic} width="50px" alt="profilePic" />
          <h2>Author: {diyPost.author.username}</h2>
          <p>Posted: {diyPost.createdAt}</p>
          <Link  to={`/messages/send/${diyPost.author._id}`} >
                     <button>Contact</button>
             </Link>
          <Link  to={`/profile/${diyPost.author._id}`} >
                     <button>View Profile</button>
             </Link>

          <h2>Comments: </h2>

          {diyPost.comments.map((comment) => {
            return (
              <>
                <img src={comment.profilePic} width="50px" alt="profilePic" />
                <h5>{comment.author.username}</h5>
                <p>{comment.text}</p>
                <p>{comment.createdAt}</p>



{user._id === comment.author._id ? null : <button onClick={handleClick}>Message</button> }


                

{isShown && (
  <SendMessageComp
    to={comment.author._id}
    recipient={comment.author.username}
  />
)}




                {/* <Link  to={`/messages/send/${comment.author._id}`} >
                     <button>Send Message</button>
             </Link> */}

             <Link  to={`/profile/${comment.author._id}`} >
                     <button>View Profile</button>
             </Link>
              </>
            );
          })}

          <AddComment postId={diyPost._id} />

          {/*

       {(user._id === diyPost.author._id) ?  
       
       <>
       and girls

forumId={diyPost._id} />


<button onClick={deleteHandler}>Delete</button>

       </>   : null} */}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default SingleDiy;
