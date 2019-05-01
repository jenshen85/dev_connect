import React from 'react';
import './App.css';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Footer from './components/layout/footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
