import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './actions';

import store from './store';

import PrivateRoute from './components/common/privateRoute';

import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/createProfile';
import EditProfile from './components/edit-profile/editProfile';

// check for token
if (localStorage.jwtToken) {
  // set auth token header
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and authenticate
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout User
    store.dispatch(logoutUser());

    //TODO: clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main">
            <Route path="/" component={Landing} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} exact />
            </Switch>
            <Switch>
              <PrivateRoute path="/create-profile" component={CreateProfile} exact />
            </Switch>
            <Switch>
              <PrivateRoute path="/edit-profile" component={EditProfile} exact />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
