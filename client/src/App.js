import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" component={Landing} exact />
        <div className="container">
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
