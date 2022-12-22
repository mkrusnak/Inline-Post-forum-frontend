import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";
import AddComment from "../components/AddComment";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import SendMessageComp from "../components/SendMessage";

const SingleDiy = () => {

  const navigate = useNavigate();

  const [isShownEdit, setIsShownEdit] = useState(false);

  const [isShownEdit2, setIsShownEdit2] = useState(false);


  const handleClickEdit = (e) => {
    setIsShownEdit((current) => !current);
  };


  const handleClickEdit2 = (e) => {
    setIsShownEdit((current) => !current);
  };

  const [isShown, setIsShown] = useState([]);

  const handleClick = index => (e) => {
    const copy = [...isShown];
    copy[index] = !copy[index]
    setIsShown(copy);
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
        setIsShown(Array(axiosResponse.data.comments.length).fill(false))
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDiyDetails();
  }, []);

    const deleteHandler = e => {
      e.preventDefault();
      axios.delete(`http://localhost:3001/diy/delete/${diyId}`, {
          headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
      })
      .then(axiosResponse => {
          console.log(axiosResponse.data)
          navigate(`/diy`)
      })
      .catch(err => console.log(err))
  }

  const linkmessage = `/diy/${diyId}`;

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







      




          {user._id === diyPost.author._id ? <button className="customBttn" role="button" onClick={deleteHandler}>Delete Post</button> : <button onClick={handleClickEdit}>Contact</button> }
          {isShownEdit && (
        <SendMessageComp
        // postId={linkmessage}
           to={diyPost.author._id}
          recipient={diyPost.author.username}
      />
     )}



          <Link  to={`/profile/${diyPost.author._id}`} >
                     <button className="customBttn" role="button">View Profile</button>
             </Link>

          <h2>Comments: </h2>

          {diyPost.comments.map((comment, index) => {
            return (
              <>
                <img src={comment.profilePic} width="50px" alt="profilePic" />
                <h5>{comment.author.username}</h5>
                <p>{comment.text}</p>
                <p>{comment.createdAt}</p>



{user._id === comment.author._id ? null : <button className="customBttn" role="button" onClick={handleClick(index)}>Message</button> }


                

{isShown[index] && (
  <SendMessageComp
  postId={ linkmessage }
    to={comment.author._id}
    recipient={comment.author.username}
  />
)}




             <Link  to={`/profile/${comment.author._id}`} >
                     <button className="customBttn" role="button">View Profile</button>
             </Link>
              </>
            );
          })}

          <AddComment postId={diyPost._id} />

  
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default SingleDiy;
