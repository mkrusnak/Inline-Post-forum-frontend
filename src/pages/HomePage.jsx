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
    <h4 className="headerText1">LATEST ARTICLES</h4>
    </div>
      
      {/* <div className="listingDetails">

      {user &&
        <button onClick={handleClick} className="customBttn" role="button">
          Add Article
        </button>
      }
      </div> */}

      

      {isShown && <AddNewsArticle />}

      <section id="gallery">
        
      <div className="col-lg-8 mb-6 articleCard"></div>
            
              {myNews.map((single) => {
                return (
                  <>
                  <div className="row newsCard">
                  


                    <div key={single._id} className="card newsCard noRadius">
                      <img src={single.image} width="400px" alt="carimg" className="card-img-top noRadius" />
                      </div>
                      
                      
                      
                      
                      
                      <div className="card-body ">
                        <h3 className="card-title newsTitle">{single.title}</h3>
                        <p className="card-text newsTitle">{single.text}</p>
                        <p className="card-text newsTitle">{single.createdAtTime}</p>

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
            
              
        
      </section>
    </>
  );
};

export default HomePage;
