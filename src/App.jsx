import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsPrivate from './components/IsPrivate'
import IsAnon from './components/IsAnon'
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
import Footer from './components/Footer'
import UserProfilePage from './pages/UserProfilePage'




function App() {


  return (
    <div className="App">
    <div id="pageContainer" >
  

    <Navbar />
    <Routes>

      <Route path="/" element={<IsPrivate> <HomePage /> </IsPrivate> } />
      <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
      <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
      <Route path="/home" element={<IsPrivate> <HomePage /> </IsPrivate> } />
      <Route path="/profile/:guestId" element={<IsPrivate>  <UserProfilePage /> </IsPrivate> } />
      <Route path="/addlisting" element={<IsPrivate>  <AddListing />  </IsPrivate> } />
      <Route path="/addpost" element={<IsPrivate>  <AddDiy />  </IsPrivate> } />
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
    <Footer />
    </div>
    
  )
}

export default App
