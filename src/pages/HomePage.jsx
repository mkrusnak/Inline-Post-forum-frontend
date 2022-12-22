import AddNewsArticle from "../components/AddNewsArticle";
import { useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";





const HomePage = () => {



  const {user} = useContext(AuthContext)

  const [isShown, setIsShown] = useState(false);

  const [myNews, setMyNews] = useState([])

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/news`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => {
       console.log('this is found articles', response.data)
       setMyNews(response.data)
    })
    .catch(err => console.log(err))
  }, [])
  





  return (
    <>
      <h1>NEWS PAGE</h1>
     

      {user.admin ? <button onClick={handleClick} className="customBttn" role="button">Add Article</button> : null}


{isShown &&    <AddNewsArticle /> }


               {myNews.map(single => {
  return(
  <>
  <h3>{single.title}</h3>
  <p>{single.text}</p>
  <h2>Author: {single.author.username}</h2>
  <img src={single.author.profilePic} width="100px" alt="profilePic" />

<button  className="customBttn" role="button">

<a href={single.link}  target="_blank">Continue reading</a>
</button>



  <p>{single.createdAtTime}</p>


    
  </>
  )
})}




    </>
  );
};

export default HomePage;
