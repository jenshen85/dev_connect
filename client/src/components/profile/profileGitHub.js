import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileGitHub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      сlientID: '47dc60518089782f6d41',
      сlientSecret: '7627d3b0a50b464e5f85686545cf9252253cbea9',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientID, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.gitHubRef) {
          this.setState({
            repos: data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map((repo) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
            <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
            <span className="badge badge-success">Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="gitHubRef">
        <hr />
        <h3 className="mb-4">Latest GitHub Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGitHub;
