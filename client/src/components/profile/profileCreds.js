import React, { Component } from 'react';
import Moment from 'react-moment';
// import PropTypes from 'prop-types';

export class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;
    const expItems = experience.map((exp) => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
              <strong>Location:</strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Description:</strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map((edu) => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === '' ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          {edu.fieldofstudy === '' ? null : (
            <span>
              <strong>Field Of Study:</strong> {edu.fieldofstudy}
            </span>
          )}
        </p>

        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Description:</strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{expItems}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{eduItems}</ul>
        </div>
      </div>
    );
  }
}

// ProfileCreds.propTypes = {
//   prop: PropTypes,
// };

export default ProfileCreds;
