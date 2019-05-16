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
import AddExperience from './components/add-credentials/addExperience';
import AddEducation from './components/add-credentials/addEducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import Posts from './components/posts/posts';
import NotFound from './components/not-found/notFound';

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

    //clear current Profile
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
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/profiles" component={Profiles} exact />
              <Route path="/profile/:handle" component={Profile} exact />
              <PrivateRoute path="/dashboard" component={Dashboard} exact />
              <PrivateRoute path="/create-profile" component={CreateProfile} exact />
              <PrivateRoute path="/edit-profile" component={EditProfile} exact />
              <PrivateRoute path="/add-experience" component={AddExperience} exact />
              <PrivateRoute path="/add-education" component={AddEducation} exact />
              <PrivateRoute path="/feed" component={Posts} exact />
              <Route to="/not-found" component={NotFound} exact />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
