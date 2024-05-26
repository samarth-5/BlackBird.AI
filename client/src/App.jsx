import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import Chatbot from './Pages/Chatbot.jsx';
import Prompt2Image from './Pages/Prompt2Image.jsx';
import Header from './Components/Header.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import About from './Pages/About.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/prompt2image' element={<Prompt2Image />} />
        </Routes>
    </BrowserRouter>
  )
}
