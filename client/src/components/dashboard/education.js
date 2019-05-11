import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions';

class Education extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEducation(id);
  };

  render() {
    const { education } = this.props;
    const eduContent = education.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
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
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{eduContent}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const maoStateToProps = (state) => {
  return {};
};
export default connect(
  maoStateToProps,
  { deleteEducation }
)(Education);
