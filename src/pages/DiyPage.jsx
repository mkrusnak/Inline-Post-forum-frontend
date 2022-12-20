import YoutubeEmbed from "../components/YoutubeEmbed";
import AddForumPost from "../components/AddForumPost";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DiyPage = () => {
  const [diyArr, setDiyArr] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/diy", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDiyArr(response.data);
        console.log("here is response front end", setDiyArr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>DIY SECTION</h1>

      {diyArr.map((single) => {
        return (
          <>
            <h3>{single.title}</h3>
            <h2>Author: {single.author.username}</h2>
            <img
              src={single.author.profilePic}
              width="100px"
              alt="profilePic"
            />
            <Link to={`/diy/${single._id}`}>
              <h4>Open</h4>
            </Link>
            <p>{single.createdAt}</p>
          </>
        );
      })}
    </>
  );
};

export default DiyPage;
