// import { useState } from 'react'
// import './App.css'
// import SignIn_SignUp from './pages/SignIn_SignUp'
// import Home from './pages/Home'

// function App() {
  

//   return (
//     <>
//      {/* <Home/> */}
//      <SignIn_SignUp/>
//     </>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/signin" element={<AuthForm isSignUp={false} />} /> {/* Sign In */}
        <Route path="/signup" element={<AuthForm isSignUp={true} />} /> {/* Sign Up */}
      </Routes>
    </Router>
  );
}

  



// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/kapilsao/KDKInventory.git
// git push -u origin main