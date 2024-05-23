import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import Chatbot from './Pages/Chatbot.jsx';
import Prompt2Image from './Pages/Prompt2Image.jsx';
import Header from './Components/Header.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<SignIn />} />
          <Route path='/' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Chatbot />} />
            <Route path='/' element={<Prompt2Image />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}
