import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main">
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
