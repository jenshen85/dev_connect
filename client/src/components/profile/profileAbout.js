import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
// import PropTypes from 'prop-types';

export class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.split(' ')[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {isEmpty(profile.skills)
                  ? null
                  : profile.skills.map((skill) => (
                      <div className="p-3" key={skill}>
                        <i className="fa fa-check" /> {skill}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ProfileAbout.propTypes = {
//   prop: PropTypes,
// };

export default ProfileAbout;
