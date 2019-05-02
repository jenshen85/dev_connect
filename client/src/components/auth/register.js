import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

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

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e && e.preventDefault && e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    axios
      .post('/api/users/register', newUser)
      .then((res) => console.log(res))
      .catch((err) =>
        this.setState({
          errors: err.response.data,
        })
      );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name,
                    })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email,
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password,
                    })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={this.onChange}
                    value={this.state.password2}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2,
                    })}
                  />
                  {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;