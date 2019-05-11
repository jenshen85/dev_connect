import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../common/spinner';
import ProfileActions from './profileActions';
import Experience from './experience';
import Education from './education';

import { getCurrentProfile, deleteAccount } from '../../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length) {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">
              Wellcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            {/* TODO: exp and edu */}
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Wellcome {user.name}</p>
            <p>You have not yetsetup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
