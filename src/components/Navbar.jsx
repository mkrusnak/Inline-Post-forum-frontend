
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import headerImg from '../assets/header.jpeg'
 
function Navbar() {

const { user, isLoggedIn, logOutUser} = useContext(AuthContext)


return(
    <header>





<img src={headerImg} alt="headerImg"></img>




    <nav className="navbar customNav navbar-expand-lg sticky-top navbar-light">
     
    

    
      <Link className="navbar-brand" to="/">Car Forum</Link>
     
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
    
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
    
    
          <li className="nav-item ">
             <Link className="nav-link" to="/">
                Home
             </Link>
          </li>
    
    
          {!isLoggedIn && (
          <>
    
         <li className="nav-item ">
             <Link className="nav-link" to="/signup">
               Sign Up
             </Link>
          </li>
    
          <li className="nav-item ">
             <Link className="nav-link" to="/login">
              Login
             </Link>
          </li>
    
          </>
        )}
    
    
        {isLoggedIn && (
          <>
    
          <li className="nav-item ">
            <Link className="nav-link" to="/gallery">
             Gallery
            </Link>   
          </li>
    
          <li className="nav-item ">
            <Link className="nav-link" to="/marketplace">
            Marketplace
            </Link>   
          </li>
    
    
          <li className="nav-item ">
            <Link className="nav-link" to="/forum">
            Forum
            </Link>   
          </li>
    
          <li className="nav-item ">
          <a className="nav-link" onClick={logOutUser} href="/">Logout</a>
          </li>
          </>
        )}
      </ul>
      {isLoggedIn && (
         <span className="navbar-text">
         Welcome, {user.username}
        </span>
        )}
      </div>
    </nav>

    
</header>

    )

}
 
export default Navbar;