import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/textFieldGroup';
import SelectListGroup from '../common/selectListGroup';
import InputGroup from '../common/inputGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';

import { createProfile, getCurrentProfile } from '../../actions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInput: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCvs = profile.skills.join(',');
      // if profile field doesnt exist, make empty string
      // profile.company = !isEmpty(profile.company) ? profile.company : '';
      // profile.website = !isEmpty(profile.website) ? profile.website : '';
      // profile.location = !isEmpty(profile.location) ? profile.location : '';
      // profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      // profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      // profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      // profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      // profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      // profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      // profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      this.setState({
        handle: profile.handle,
        company: !isEmpty(profile.company) ? profile.company : '',
        website: !isEmpty(profile.website) ? profile.website : '',
        location: !isEmpty(profile.location) ? profile.location : '',
        status: profile.status,
        skills: skillsCvs,
        githubusername: !isEmpty(profile.githubusername) ? profile.githubusername : '',
        bio: !isEmpty(profile.bio) ? profile.bio : '',
        twitter: !isEmpty(profile.social.twitter) ? profile.social.twitter : '',
        facebook: !isEmpty(profile.social.facebook) ? profile.social.facebook : '',
        linkedin: !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '',
        youtube: !isEmpty(profile.social.youtube) ? profile.social.youtube : '',
        instagram: !isEmpty(profile.social.instagram) ? profile.social.instagram : '',
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { errors, displaySocialInput } = this.state;
    let socialInput;
    if (displaySocialInput) {
      socialInput = (
        <div>
          <InputGroup
            name={'twitter'}
            placeholder={'Twitter Profile URL'}
            icon={'fab fa-twitter'}
            type={'text'}
            value={this.state.twitter}
            error={errors.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            name={'facebook'}
            placeholder={'Facebook Page URL'}
            icon={'fab fa-facebook'}
            type={'text'}
            value={this.state.facebook}
            error={errors.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            name={'linkedin'}
            placeholder={'Linkedin Profile URL'}
            icon={'fab fa-linkedin'}
            type={'text'}
            value={this.state.linkedin}
            error={errors.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            name={'youtube'}
            placeholder={'YouTube Channel URL'}
            icon={'fab fa-youtube'}
            type={'text'}
            value={this.state.youtube}
            error={errors.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            name={'instagram'}
            placeholder={'Instagram Page URL'}
            icon={'fab fa-instagram'}
            type={'text'}
            value={this.state.instagram}
            error={errors.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }

    // select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edite Your Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name={'handle'}
                  placeholder={'* Profile Handle'}
                  type={'text'}
                  value={this.state.handle}
                  error={errors.handle}
                  onChange={this.onChange}
                  info={
                    "A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  }
                />
                <SelectListGroup
                  name={'status'}
                  options={options}
                  value={this.state.status}
                  error={errors.status}
                  onChange={this.onChange}
                  info={'Give us an idea of where you are at in your career'}
                />
                <TextFieldGroup
                  name={'company'}
                  placeholder={'Company'}
                  type={'text'}
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                  info={'Could be your own company or one you work for'}
                />
                <TextFieldGroup
                  name={'website'}
                  placeholder={'Website'}
                  type={'text'}
                  value={this.state.website}
                  error={errors.website}
                  onChange={this.onChange}
                  info={'Could be your own or a company website'}
                />
                <TextFieldGroup
                  name={'location'}
                  placeholder={'Location'}
                  type={'text'}
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChange}
                  info={'City & state suggested (eg. Boston, MA)'}
                />
                <TextFieldGroup
                  name={'skills'}
                  placeholder={'Skills'}
                  type={'text'}
                  value={this.state.skills}
                  error={errors.skills}
                  onChange={this.onChange}
                  info={'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'}
                />
                <TextFieldGroup
                  name={'githubusername'}
                  placeholder={'Github Username'}
                  type={'text'}
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  onChange={this.onChange}
                  info={'If you want your latest repos and a Github link, include your username'}
                />
                <TextAreaFieldGroup
                  placeholder={'A short bio of yourself'}
                  name={'bio'}
                  value={this.state.bio}
                  error={errors.bio}
                  onChange={this.onChange}
                  info={'Tell us a little about yourself'}
                />

                <div className="mb-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState((prevState) => ({
                        displaySocialInput: !prevState.displaySocialInput,
                      }));
                    }}
                    className="btn btn-light mr-2">
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInput}
                <input
                  onClick={this.onSubmit}
                  type="submit"
                  value="Submit"
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
