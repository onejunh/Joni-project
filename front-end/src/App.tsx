import React, { useState, Component } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import Home from './pages/home/home';

const App = () => {

  return (
    <div className="App">
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
