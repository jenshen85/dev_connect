import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const {
      comment: { name, text, avatar, user, _id },
      postId,
      auth,
    } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={avatar} alt="" />
            </a>
            <br />
            <p className="text-center">{name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            {user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, _id)}
                type="button"
                className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
