import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SendMessageComp from "../components/SendMessage";
// import { message } from "antd";

const Messages = () => {
  // const [isShown, setIsShown] = useState(false);

  const [isShown, setIsShown] = useState([]);

  const handleClick = (index) => (e) => {
    const copy = [...isShown];
    copy[index] = !copy[index];
    setIsShown(copy);
  };

  // const handleClick = (e) => {
  //   setIsShown((current) => !current);
  // };

  const { user } = useContext(AuthContext);

  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    // console.log(user)

    if (user) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/messages/${user._id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((axiosResponse) => {
          setMessagesArr(axiosResponse.data);
          console.log(axiosResponse.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);



  // const linkmessage = `/diy/${diyId}`;



  return (
    <div className="listingDetails">
      {/* <h1 className="headerText1">Messages</h1> */}

      {messagesArr.map((singleMessage, index) => {
        return (
          <div className="messagesList">
            <div className="authorCard">
              <div className="authorImgDiv">
                <img
                  className="authorImg"
                  height="70px"
                  src={singleMessage.sender.profilePic}
                  alt="profilePic"
                />
              </div>

              <div className="authorText2">
                <h4>{singleMessage.subject}</h4>
                <p>
                  <strong> From:</strong> {singleMessage.sender.username}
                </p>
                <p>
                  <strong>Sent:</strong> {singleMessage.createdAtTime}
                </p>
              </div>
            </div>

            <div className="messageBttn">
              <div className="mssgText">
                <p className="indent description ">{singleMessage.body}</p>
              </div>
            </div>



<div className="messageBttn2"> 


{user._id === singleMessage.sender._id ? null : (
              <button
                className="customBttn"
                role="button"
                onClick={handleClick(index)}
              >
                Reply
              </button>
            )}


</div>

           






            {isShown[index] && (
              <SendMessageComp
                // postId={linkmessage}
                to={singleMessage.sender._id}
                recipient={singleMessage.sender.username}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
