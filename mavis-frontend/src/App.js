import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './HomeScreen';
import Navbar from './Navbar';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <HomeScreen></HomeScreen>
    </div>
  );
}

export default App;
