import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions';

class Experience extends Component {
  onDeleteClick = (id) => {
    this.props.deleteExperience(id);
  };

  render() {
    const { experience } = this.props;
    const expContent = experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
          {exp.to === null ? 'now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{expContent}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const maoStateToProps = (state) => {
  return {};
};
export default connect(
  maoStateToProps,
  { deleteExperience }
)(Experience);
