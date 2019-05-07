import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions';
import TextFieldGroup from '../common/textFieldGroup';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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

  onSubmit(e) {
    e && e.preventDefault && e.preventDefault();
    const { history } = this.props;
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, history);
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    console.log(user);

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name={'name'}
                  placeholder={'Name'}
                  type={'text'}
                  value={this.state.name}
                  error={errors.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'email'}
                  placeholder={'Email Address'}
                  type={'email'}
                  info={
                    'This site uses Gravatar so if you want a profile image, use a Gravatar email'
                  }
                  value={this.state.email}
                  error={errors.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'password'}
                  placeholder={'Password'}
                  type={'password'}
                  value={this.state.password}
                  error={errors.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name={'password2'}
                  placeholder={'Confirm Password'}
                  type={'password'}
                  value={this.state.password2}
                  error={errors.password2}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
