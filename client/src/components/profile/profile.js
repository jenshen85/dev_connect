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

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profileHandle === null && this.props.profile.loading) {
      console.log(nextProps);
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { loading, profileHandle } = this.props.profile;
    let profileData;

    if (profileHandle === null || loading) {
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
          <ProfileHeader profile={profileHandle} />
          <ProfileAbout profile={profileHandle} />
          <ProfileCreds education={profileHandle.education} experience={profileHandle.experience} />
          {profileHandle.githubusername ? (
            <ProfileGitHub username={profileHandle.githubusername} />
          ) : null}
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
