import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProfileSettings from "../components/ProfileSettings";
import { AuthContext } from "../context/auth.context";
import SendMessageComp from "../components/SendMessage";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { guestId } = useParams();

  const [profile, setProfile] = useState(null);

  const [isShown, setIsShown] = useState(false);
  const [isShownEdit, setIsShownEdit] = useState(false);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  const handleClickEdit = (e) => {
    setIsShownEdit((current) => !current);
  };

  const handleSubmitGiveAdmin = (e) => {
    // e.preventDefault()
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/settings/${guestId}`,
        { admin: true },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log("here is added admin", axiosResponse.data);
        // navigate(`/profile/${guestId}`)
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitRemoveAdmin = (e) => {
    // e.preventDefault()
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/settings/${guestId}`,
        { admin: false },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((axiosResponse) => {
        console.log("here is removed admin", axiosResponse.data);
        setProfile(axiosResponse.data);
        // navigate(`/profile/${guestId}`)
      })
      .catch((err) => console.log(err));
  };

  const getUserProfilePage = () => {
    console.log(guestId);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/profile/${guestId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((axiosResponse) => {
        console.log(axiosResponse.data);
        setProfile(axiosResponse.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserProfilePage();
  }, []);

  return (
    <div className="ProjectDetails">
      {profile ? (
        <div className="listingDetails">


        <div className="card1" width="100">
  <img className="card-img-top"  src={profile.profilePic}
   alt="profilepic" />
  <div className="card-body">
    <h3 className="card-title">{profile.username}</h3>
    <h6 className="card-text">"{profile.status}.."</h6>
  </div>
  <ul className="list-group list-group-flush noBorder">
    <li className="list-group-item noBorder">Joined: {profile.createdAtTime}</li>
    <li className="list-group-item noBorder">Dapibus ac facilisis in</li>
    <li className="list-group-item noBorder">Vestibulum at eros</li>
  </ul>
  <div className="card-body">
   
  {user._id !== profile._id && user.admin && !profile.admin && (
            <button
              className="customBttn"
              role="button"
              onClick={handleSubmitGiveAdmin}
            >
              Make admin
            </button>
          )}

          {user._id !== profile._id && user.admin && profile.admin && (
            <button
              className="customBttn"
              role="button"
              onClick={handleSubmitRemoveAdmin}
            >
              Remove admin
            </button>
          )}



          {user._id === profile._id ? null : (
            <button className="customBttn" role="button" onClick={handleClick}>
              Message
            </button>
          )}
          {user._id === profile._id ? (
            <button
              className="customBttn"
              role="button"
              onClick={handleClickEdit}
            >
              Update profile
            </button>
          ) : null}





  </div>
</div>






  
        

        

         
          {profile.drivingNow ? (
            <>
              

              <h4>Now driving: {profile.drivingNow}</h4>
              <img src={profile.drivingNowImg} width="200px" alt="profilePic" />
              <h4>Previous car: {profile.prevCar}</h4>
              <img src={profile.prevCarImg} width="200px" alt="profilePic" />
              <h4>Dream car: {profile.dreamCar}</h4>
              <img src={profile.dreamCarImg} width="200px" alt="profilePic" />
            </>
          ) : null}
          <br></br>

          {isShown && (
            <SendMessageComp to={profile._id} recipient={profile.username} />
          )}

          {isShownEdit && (
            <ProfileSettings
              profilePic={profile.profilePic}
              drivingNow={profile.drivingNow}
              drivingNowImg={profile.drivingNowImg}
              prevCar={profile.prevCar}
              prevCarImg={profile.prevCarImg}
              status={profile.status}
              dreamCar={profile.dreamCar}
              dreamCarImg={profile.dreamCarImg}
            />
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
