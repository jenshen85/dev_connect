import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ProfileAbout, ProfileCreds, ProfileGitHub, ProfileHeader } from './index';
import Spinner from '../common/spinner';

import { getProfileByHandle } from '../../actions';

export class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { loading, profile } = this.props.profile;
    let profileData;

    if (profile === null || loading) {
      profileData = <Spinner />;
    } else {
      profileData = (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds education={profile.education} experience={profile.experience} />
          <ProfileGitHub />
        </Fragment>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileData}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
