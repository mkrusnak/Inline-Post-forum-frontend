import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import YoutubeEmbed from "../components/YoutubeEmbed";
import EditPost from "../components/EditPost";
import AddComment from "../components/AddComment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  const handleClick = (index) => (e) => {
    const copy = [...isShown];
    copy[index] = !copy[index];
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
        setIsShown(Array(axiosResponse.data.comments.length).fill(false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDiyDetails();
  }, []);

  const deleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/diy/delete/${diyId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        navigate(`/diy`);
      })
      .catch((err) => console.log(err));
  };

  const linkmessage = `/diy/${diyId}`;
  

  return (
    <>
      <h1 className="headerText1">DIY PAGE</h1>
      <div className="listingDetails">
        {diyPost ? (
          <div className="diyDiv">
            <h2 className="headerText1">{diyPost.title}</h2>

            <p  className="description indent">{diyPost.description}</p>
            <p>
              Required tools: <strong>{diyPost.reqTools}</strong>{" "}
            </p>
            <p>Time to complete: {diyPost.time} minutes.</p>

            <YoutubeEmbed embedId={diyPost.video} />

            <div className="authorCard">
              <div className="authorImgDiv">
                <img
                  className="authorImg"
                  height="70px"
                  src={diyPost.author.profilePic}
                  alt="profilePic"
                />
              </div>

              <div className="authorText">
                <p>
                  <strong>Author:</strong> {diyPost.author.username}
                </p>
                <p>
                  <strong>Posted:</strong> {diyPost.createdAtTime}
                </p>
              </div>
            </div>

            {user._id === diyPost.author._id ? (
              <button
                className="customBttn"
                role="button"
                onClick={deleteHandler}
              >
                Delete Post
              </button>
            ) : (
              <button
                className="customBttn"
                role="button"
                onClick={handleClickEdit}
              >
                Contact
              </button>
            )}
            {isShownEdit && (
              <SendMessageComp
                // postId={linkmessage}
                to={diyPost.author._id}
                recipient={diyPost.author.username}
              />
            )}

            <Link to={`/profile/${diyPost.author._id}`}>
              <button className="customBttn" role="button">
                View Profile
              </button>
            </Link>

            <h5>Comments: </h5>

            {diyPost.comments.map((comment, index) => {
              return (
                <div class="card w-100 commentDiv">
                  <div class="card-body commentBody">
                    <div className="comment">
                      <div className="commentHead">
                        <img
                          className="authorImg"
                          src={comment.author.profilePic}
                          height="50px"
                          alt="profilePic"
                        />
                      </div>

                      <div class="commentText">
                        <h6>{comment.author.username}</h6>
                        <p class="card-text">{comment.text}</p>
                      </div>
                    </div>

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
                        postId={linkmessage}
                        to={comment.author._id}
                        recipient={comment.author.username}
                      />
                    )}

                    <Link to={`/profile/${comment.author._id}`}>
                      <button className="customBttn" role="button">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}

            <AddComment postId={diyPost._id} />
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
};

export default SingleDiy;
