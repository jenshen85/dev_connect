import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">Dashboard</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
