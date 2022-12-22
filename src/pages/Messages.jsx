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
    <div>
   
    <h1>your messages</h1>


    {messagesArr.map(singleMessage => {
       return (<>
        <h4>Sender:{singleMessage.sender.username}</h4>
        <img src={singleMessage.sender.profilePic} width="100px" alt="profilePic" />
        <h3>{singleMessage.subject}</h3>
        <p>{singleMessage.body}</p>
        <p>{singleMessage.createdAtTime}</p>



        <button onClick={handleClick}>Reply</button>



        {isShown && (
                  <SendMessageComp
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
