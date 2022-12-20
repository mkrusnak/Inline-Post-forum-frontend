import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";

const Messages = () => {
  const { user } = useContext(AuthContext);

  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    // console.log(user)

    if (user) {
      axios
        .get(`http://localhost:3001/messages/${user._id}`, {
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
        <h3>{singleMessage.subject}</h3>
        <p>{singleMessage.body}</p>
        
        </>
       )
    })}

</div>
  
  );
};

export default Messages;