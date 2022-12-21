// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import ProfileSettings from "../components/ProfileSettings";
// import { AuthContext } from "../context/auth.context";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {


//     const {main} = useParams()

//   const navigate = useNavigate();

//   const { user } = useContext(AuthContext);

 

//   const [profile, setProfile] = useState(null);

//   const getProfilePage = () => {
//     axios
//       .get(`http://localhost:3001/user/profile/${user._id}`, {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       })
//       .then((axiosResponse) => {
//         console.log(axiosResponse.data);
//         setProfile(axiosResponse.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     getProfilePage();
//   }, []);

//   return (
//     <div className="ProjectDetails">
//       {profile ? (
//         <div>
//           <img src={profile.profilePic} height="50px" alt="profilePic" />
//           <h1>{profile.username} profile</h1>
//           <p>Status:{profile.status}</p>

//           <h4>Now driving: {profile.drivingNow}</h4>
//           <img src={profile.drivingNowImg} height="200px" alt="profilePic" />
//           <h4>Previous car: {profile.prevCar}</h4>
//           <img src={profile.prevCarImg} height="200px" alt="profilePic" />
//           <h4>Dream car: {profile.dreamCar}</h4>
//           <img src={profile.dreamCarImg} height="200px" alt="profilePic" />



//           <ProfileSettings 
//             profilePic={profile.profilePic}
//             drivingNow={profile.drivingNow}
//             drivingNowImg={profile.drivingNowImg}
//             prevCar={profile.prevCar}
//             prevCarImg={profile.prevCarImg}
//             status={profile.status}
//             dreamCar={profile.dreamCar}
//             dreamCarImg={profile.dreamCarImg}
//            />


//           {/* {(user._id === listing.owner._id) ?
       
//        <>
//        <UpdateListing
//             title={listing.title}
//             description={listing.description}
//             odometr={listing.odometr}
//             price={listing.price}
//             getProfilePage={getProfilePage}
//             listingId={listing._id}
// />

// <button onClick={deleteHandler}>Delete</button>
// </>
//  : null} */}
//         </div>
//       ) : (
//         <p>loading...</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
