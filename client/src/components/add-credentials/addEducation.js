import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';

import { addEducation } from '../../actions';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: '',
      disabled: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  }

  onSubmit(e) {
    e && e.preventDefault && e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    this.props.addEducation(eduData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name={'school'}
                  placeholder={'* School Or Bootcamp'}
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'degree'}
                  placeholder={'* Degree Or Certificate'}
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'fieldofstudy'}
                  placeholder={'* Field Of Study'}
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
                  onChange={this.onChange}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name={'from'}
                  type={'date'}
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChange}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name={'to'}
                  type={'date'}
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <label className="form-check-label">
                    <input
                      onChange={this.onCheck}
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value=""
                    />
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  name={'description'}
                  placeholder={'Program Description'}
                  value={this.state.description}
                  error={errors.description}
                  onChange={this.onChange}
                  info={'Tell us about your experience and what you learned'}
                />
                <input
                  onClick={this.onSubmit}
                  defaultValue="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors,
  };
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
