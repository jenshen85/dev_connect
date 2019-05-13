import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
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
    const { loading } = this.props.profile;
    let profileData;

    if (loading) {
      profileData = <Spinner />;
    } else {
      profileData = (
        <Fragment>
          <ProfileHeader />
          <ProfileAbout />
          <ProfileCreds />
          <ProfileGitHub />
        </Fragment>
      );
    }

    return <div className="container">{profileData}</div>;
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
