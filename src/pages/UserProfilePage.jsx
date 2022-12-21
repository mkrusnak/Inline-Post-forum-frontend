import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProfileSettings from "../components/ProfileSettings";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  

  const { user } = useContext(AuthContext);

  const { guestId } = useParams();

  const [profile, setProfile] = useState(null);

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
        <div>
          <img src={profile.profilePic} width="70px" alt="profilePic" />
          <h2>{profile.username} profile</h2>
           <p>Joined {profile.createdAtTime}</p>


{profile.drivingNow  ? (
<>
          <h4>"{profile.status}..."</h4>
          
          

         

          <h4>Now driving: {profile.drivingNow}</h4>
          <img src={profile.drivingNowImg} width="200px" alt="profilePic" />
          <h4>Previous car: {profile.prevCar}</h4>
          <img src={profile.prevCarImg} width="200px" alt="profilePic" />
          <h4>Dream car: {profile.dreamCar}</h4>
          <img src={profile.dreamCarImg} width="200px" alt="profilePic" />

          </>

) : null }



{user._id === guestId ? null : (
            <Link to={`/messages/send/${profile._id}`}>
              <h4>Send Message</h4>
            </Link>
          )}


          {user._id === guestId ? (
            <>
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
            </>
          ) : null}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
