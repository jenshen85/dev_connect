import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SinglePostItem from './singlePostItem';
import CommentForm from './commentForm';
import CommentFeed from './commentFeed';
import Spinner from '../common/spinner';

import { getPost } from '../../actions';

class Post extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getPost(this.props.match.params.id);
    }
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <Fragment>
          <SinglePostItem post={post} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </Fragment>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              <div className="card card-body mb-3">{postContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
