import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';

import { addExperience } from '../../actions';

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
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
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    this.props.addExperience(expData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name={'company'}
                  placeholder={'* Company'}
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'title'}
                  placeholder={'* Job Title'}
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'location'}
                  placeholder={'Location'}
                  value={this.state.location}
                  error={errors.location}
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
                  placeholder={'Job Description'}
                  value={this.state.description}
                  error={errors.description}
                  onChange={this.onChange}
                  info={'Some of your responsabilities, etc'}
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

AddExperience.propTypes = {
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
  { addExperience }
)(withRouter(AddExperience));
