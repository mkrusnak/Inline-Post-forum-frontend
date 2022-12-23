import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";
import AddCommentForum from "../components/AddCommentForum";
import { Link } from "react-router-dom";
import SendMessageComp from "../components/SendMessage";

const ForumPostPage = () => {
  const [isShown, setIsShown] = useState([]);

  const handleClick = (index) => (e) => {
    const copy = [...isShown];
    copy[index] = !copy[index];
    setIsShown(copy);
  };

  const [isShownEdit, setIsShownEdit] = useState(false);

  const handleClickEdit = (e) => {
    setIsShownEdit((current) => !current);
  };

  const { user } = useContext(AuthContext);

  const { forumId } = useParams();

  const [forumPost, setForumPost] = useState(null);

  const getForumDetails = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/forum/${forumId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setForumPost(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForumDetails();
  }, []);

  //   const deleteHandler = (e) => {
  //     e.preventDefault();
  //     axios
  //       .delete(`${import.meta.env.VITE_BACKEND_URL}/forum/delete/${forumId}`, {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         },
  //       })
  //       .then((axiosResponse) => {
  //         console.log(axiosResponse.data);
  //         navigate("/forum");
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <div>
      {forumPost ? (
        <div>
          <h3>{forumPost.subject}</h3>
          <p>{forumPost.body}</p>
          <img src={forumPost.image} width="300px" alt="carPhoto" />
          <YoutubeEmbed embedId={forumPost.video} />
          <img
            src={forumPost.author.profilePic}
            width="100px"
            alt="profilePic"
          />
          <h2>Author: {forumPost.author.username}</h2>
          <p>{forumPost.createdAtTime}</p>

          <Link to={`/profile/${forumPost.author._id}`}>
            <button className="customBttn" role="button">
              View Profile
            </button>
          </Link>

          {user._id === forumPost.author._id ? (
            <button
              className="customBttn"
              role="button"
              onClick={handleClickEdit}
            >
              Edit post
            </button>
          ) : null}

          {isShownEdit && (
            <EditPost
              body={forumPost.body}
              subject={forumPost.subject}
              image={forumPost.image}
              video={forumPost.video}
              forumId={forumPost._id}
            />
          )}

          <h2>Comments:</h2>


          {forumPost.comments.map((comment, index) => {
            return (
              <>
                <img src={comment.profilePic} width="50px" alt="profilePic" />
                <h5>{comment.author.username}</h5>
                <p>{comment.text}</p>

                {user._id === comment.author._id ? null : (
                  <button
                    className="customBttn"
                    role="button"
                    onClick={handleClick(index)}
                  >
                    Message
                  </button>
                )}

                {isShown[index] && (
                  <SendMessageComp
                    postId={forumId}
                    to={comment.author._id}
                    recipient={comment.author.username}
                  />
                )}

                <Link to={`/profile/${comment.author._id}`}>
                  <button className="customBttn" role="button">
                    View Profile
                  </button>
                </Link>
              </>
            );
          })}

          <AddCommentForum postId={forumPost._id} />
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default ForumPostPage;
