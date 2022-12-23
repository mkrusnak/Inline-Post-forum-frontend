import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
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

  return (
    <div className="listingDetails">
      {forumPost ? (
        <div>
          <div className="authorCard">
            <div className="authorImgDiv">
              <img
                className="authorImg"
                height="70px"
                src={forumPost.author.profilePic}
                alt="profilePic"
              />
            </div>

            <div className="authorText2">
              <h3>{forumPost.subject}</h3>
              <p>User: {forumPost.author.username}</p>
              <p>Posted: {forumPost.createdAtTime}</p>
            </div>
          </div>

          <p className="indent description">{forumPost.body}</p>

          {forumPost.video && <YoutubeEmbed embedId={forumPost.video} />}

          <h5>Comments:</h5>

          {forumPost.comments.map((comment, index) => {
            return (
              <div className="card w-100 commentDiv">
                <div className="card-body commentBody">
                  <div className="comment">
                    <div className="commentHead">
                      <img
                        className="authorImg"
                        src={comment.author.profilePic}
                        height="50px"
                        alt="profilePic"
                      />
                    </div>

                    <div className="commentText">
                      <h6>
                        <Link to={`/profile/${comment.author._id}`}>
                          <a>{comment.author.username}</a>
                        </Link>
                      </h6>
                      <p className="card-text">{comment.text}</p>
                    </div>
                  </div>

                  <div className="commentButtons">
                    {isShown[index] && (
                      <SendMessageComp
                        postId={linkmessage}
                        to={comment.author._id}
                        recipient={comment.author.username}
                      />
                    )}
                  </div>
                </div>
              </div>
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
