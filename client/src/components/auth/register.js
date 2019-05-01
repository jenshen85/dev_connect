import React, { Component } from 'react';

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
    console.log(newUser);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" onChange={this.onChange} value={this.state.name} className="form-control form-control-lg" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                  <input type="email" onChange={this.onChange} value={this.state.email} className="form-control form-control-lg" placeholder="Email Address" name="email" />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" onChange={this.onChange} value={this.state.password} className="form-control form-control-lg" placeholder="Password" name="password" />
                </div>
                <div className="form-group">
                  <input type="password" onChange={this.onChange} value={this.state.password2} className="form-control form-control-lg" placeholder="Confirm Password" name="password2" />
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
