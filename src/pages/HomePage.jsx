import AddNewsArticle from "../components/AddNewsArticle";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  const [isShown, setIsShown] = useState(false);

  const [myNews, setMyNews] = useState([]);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/news`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("this is found articles", response.data);
        setMyNews(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div className="headerText1">
    <h1 className="headerText1">NEWS PAGE</h1>
    </div>
      

      {user.admin ? (
        <button onClick={handleClick} className="customBttn" role="button">
          Add Article
        </button>
      ) : null}

      {isShown && <AddNewsArticle />}

      <section id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4">
              {myNews.map((single) => {
                return (
                  <>
                    <div key={single._id} className="card newsCard">
                      <img src={single.image} alt="" className="card-img-top" />
                      <div className="card-body ">
                        <h5 className="card-title">{single.title}</h5>
                        <p className="card-text">{single.text}</p>
                        <p className="card-text">{single.createdAtTime}</p>

                        <a
                          href={single.link}
                          className="customBttn"
                          target="_blank"
                          role="button"
                        >
                          Read More
                        </a>

                        <Link  to={`/profile/${single.author._id}`} >
                     <button className="customBttn" role="button">Posted by: {single.author.username}</button>
             </Link>




                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
