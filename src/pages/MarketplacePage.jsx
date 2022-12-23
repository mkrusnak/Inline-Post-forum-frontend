import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const MarketplacePage = (props) => {
  const [myPosts, setMyPosts] = useState([]);
  const [myPostsCopy, setMyPostsCopy] = useState(myPosts);

  const searchPosts = (word) => {
    const results = myPostsCopy.filter((el) => {
      return el.makeModel.toLowerCase().includes(word.toLowerCase());
    });
    setMyPosts(results);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/listings`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setMyPosts(response.data);
        setMyPostsCopy(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Search searchPosts={searchPosts} />

      <div className="card-group marketplaceGroup">
        {myPosts.map((single) => {
          return (
            <>
              <div key={single._id} className="card marketCard noRadius">
                <img
                  className="card-img-top"
                  src={single.imagesUrl[0]}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h3 className="card-title">{single.makeModel}</h3>
                  <h4 className="card-text">{single.title}</h4>
                  <h6 className="card-text">
                    <strong>Mileage:</strong> {single.odometr} mi
                  </h6>
                  <h6>
                    <strong>Price:</strong> {single.price}$
                  </h6>
                  <h6>
                    <strong>Seller:</strong> {single.owner.username}
                  </h6>

                  <Link to={`/listings/${single._id}`}>
                    <button className="customBttn" role="button">
                      More details
                    </button>
                  </Link>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Posted: {single.createdAtTime}
                  </small>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MarketplacePage;
