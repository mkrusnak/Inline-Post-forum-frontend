import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsPrivate from './components/IsPrivate'
import IsAnon from './components/isAnon'
import ForumPage from './pages/ForumPage'
import GalleryPage from './pages/GalleryPage'
import MarketPage from './pages/MarketPage'





function App() {


  return (
    <div className="App">
    <Navbar />
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<IsAnon><SignupPage /> </IsAnon>} />
      <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
      <Route path="/forum" element={<IsPrivate> <ForumPage /> </IsPrivate>} />
      <Route path="/gallery" element={<IsPrivate> <GalleryPage /> </IsPrivate>} />
      <Route path="/marketplace" element={<IsPrivate> <MarketPage /> </IsPrivate>} />
    </Routes>
    </div>
  )
}

export default App
