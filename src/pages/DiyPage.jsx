import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const DiyPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [myPostsCopy, setMyPostsCopy] = useState(myPosts);

  const searchPosts = (word) => {
    console.log(word);
    const results = myPostsCopy.filter((el) => {
      return el.title.toLowerCase().includes(word.toLowerCase());
    });
    setMyPosts(results);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/diy`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMyPosts(response.data);
        setMyPostsCopy(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Search searchPosts={searchPosts} />
      <div className="listingDetails">
        {myPosts.map((single) => {
          return (
            <div className="card posts moRadius">
              <h5 className="card-header">{single.title}</h5>
              <div className="card-body">
                <h5 className="card-title">
                  Time to complete: {single.time} min
                </h5>
                <p className="card-text">Required tools: {single.reqTools}</p>
                <p>Posted: {single.createdAtTime}</p>
                <Link to={`/diy/${single._id}`}>
                  <button className="customBttn" role="button">
                    Open
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiyPage;
