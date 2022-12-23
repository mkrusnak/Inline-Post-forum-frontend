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
            <img
              className="card-img-top img-fluid noRadiusImg"
              src={profile.profilePic}
              alt="profilepic"
            />
            <div className="card-body">
              <h3 className="card-title">{profile.username}</h3>
              <h6 className="card-text">"{profile.status}.."</h6>
            </div>
            <ul className="list-group list-group-flush noBorder profileList">
              <li className="list-group-item noBorder">
                Location: {profile.city}, {profile.state}
              </li>
              <li className="list-group-item noBorder">
                Joined: {profile.createdAtTime}
              </li>
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
                <button
                  className="customBttn"
                  role="button"
                  onClick={handleClick}
                >
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

          {isShown && (
            <SendMessageComp to={profile._id} recipient={profile.username} />
          )}

          {profile.drivingNow ? (
            <>
              <div className="row carsList">
                <div className="col-12 col-md-6 col-lg-4 mb-4 userCar">
                  <div className="card carImage noBorder">
                    <img
                      className="card-img-top noRadiusImg img-fluid"
                      src={profile.drivingNowImg}
                      alt="car"
                    />
                    <div className="card-body">
                      <p className="card-text">
                        Driving now: {profile.drivingNow}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4 mb-4 userCar">
                  <div className="card carImage noBorder">
                    <img
                      className="card-img-top noRadiusImg img-fluid"
                      src={profile.dreamCarImg}
                      alt="car"
                    />
                    <div className="card-body">
                      <p className="card-text">Dream car: {profile.dreamCar}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4 mb-4 userCar">
                  <div className="card carImage noBorder">
                    <img
                      className="card-img-top noRadiusImg img-fluid"
                      src={profile.prevCarImg}
                      alt="car"
                    />
                    <div className="card-body">
                      <p className="card-text">First car: {profile.prevCar}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {isShownEdit && (
            <ProfileSettings
              state={profile.state}
              city={profile.city}
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
