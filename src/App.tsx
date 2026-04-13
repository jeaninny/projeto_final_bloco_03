
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'

function App() {


  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
