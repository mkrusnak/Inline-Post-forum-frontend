import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProfileSettings from "../components/ProfileSettings";
import { AuthContext } from "../context/auth.context";
import SendMessageComp from "../components/SendMessage";

const UserProfilePage = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShownEdit, setIsShownEdit] = useState(false);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  const handleClickEdit = (e) => {
    setIsShownEdit((current) => !current);
  };

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

          {profile.drivingNow ? (
            <>
              <h4>"{profile.status}..."</h4>

              <h4>Now driving: {profile.drivingNow}</h4>
              <img src={profile.drivingNowImg} width="200px" alt="profilePic" />
              <h4>Previous car: {profile.prevCar}</h4>
              <img src={profile.prevCarImg} width="200px" alt="profilePic" />
              <h4>Dream car: {profile.dreamCar}</h4>
              <img src={profile.dreamCarImg} width="200px" alt="profilePic" />
            </>
          ) : null}

          {user._id === profile._id ? null : (
            <button onClick={handleClick}>Message</button>
          )}

          {user._id === profile._id ? <button onClick={handleClickEdit}>Update profile</button> : (
            null
          )}

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

          {/* {user._id === guestId ? (
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
          ) : null} */}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
