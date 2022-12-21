import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsPrivate from './components/IsPrivate'
import IsAnon from './components/isAnon'
import ForumPage from './pages/ForumPage'
import MarketplacePage from './pages/MarketplacePage'
import AddListing from './pages/AddListing'
import ListingDetails from './pages/ListingDetails'
import Messages from './pages/Messages'
import ForumPostPage from './pages/ForumPostPage'
import AddDiy from './pages/AddDiy'
import DiyPage from './pages/DiyPage'
import SingleDiy from './pages/SingleDiy'
import SendMessage from './pages/SendMessage'
// import AccountSettings from './pages/AccountSettings'
// import ProfilePage from './pages/ProfilePage'
import UserProfilePage from './pages/UserProfilePage'




function App() {


  return (
    <div className="App">
    <Navbar />
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/addlisting" element={<AddListing />} />
      <Route path="/addpost" element={<AddDiy />} />
      {/* <Route path="/profile/settings" element={<AccountSettings />} /> */}
      {/* <Route path="/profile" element={<ProfilePage />} /> */}

      {/* <Route path="/profile" element={<ProfilePage />} /> */}

      <Route path="/profile/:guestId" element={<UserProfilePage />} />



      
      <Route path="/signup" element={<IsAnon><SignupPage /> </IsAnon>} />
      <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />


      <Route path="/messages/send/:recipientId" element={<IsPrivate> <SendMessage /> </IsPrivate>} />
      <Route path="/messages" element={<IsPrivate> <Messages /> </IsPrivate>} />
      <Route path="/diy" element={<IsPrivate> <DiyPage /> </IsPrivate>} />
      <Route path="/diy/:diyId" element={<IsPrivate> <SingleDiy /> </IsPrivate>} />
      <Route path="/forum" element={<IsPrivate> <ForumPage /> </IsPrivate>} />
      <Route path="/listings/:listingId" element={<IsPrivate> <ListingDetails /> </IsPrivate>} />
      <Route path="/forum/:forumId" element={<IsPrivate> <ForumPostPage /> </IsPrivate>} />
   
      <Route path="/listings" element={<IsPrivate> <MarketplacePage /> </IsPrivate>} />
    </Routes>
    </div>
  )
}

export default App
