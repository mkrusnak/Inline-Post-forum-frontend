import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SendMessageComp from "../components/SendMessage";

const Messages = () => {

  const [isShown, setIsShown] = useState(false);


  const handleClick = (e) => {
    setIsShown((current) => !current);
  };





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

  return (
    <div className="listingDetails">
   
    <h1 className="headerText1">Messages</h1>


    {messagesArr.map(singleMessage => {
       return (<>

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


         <div className="mssgText"><p className="indent description ">{singleMessage.body}</p></div>



      <div>  <button className="customBttn" role="button" onClick={handleClick}>Reply</button></div>

</div>

</div>

        {isShown && (
                  <SendMessageComp
                  link={`messages`}
                    to={singleMessage.sender._id}
                    recipient={singleMessage.sender.username}
                  />
                )}
        </>
       )
    })}

</div>
  
  );
};

export default Messages;



      {/* <h4>From:{singleMessage.sender.username}</h4>
        <img src={singleMessage.sender.profilePic} width="100px" alt="profilePic" />
        <h3>{singleMessage.subject}</h3>
        <p>{singleMessage.body}</p>
        <p>{singleMessage.createdAtTime}</p> */}