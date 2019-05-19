import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostItem from '../posts/postItem';
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
    if (post === null || loading || Object.keys(post).length) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem post={post} />;
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <Link to="/feed" className="btn btn-light mb-3">
                  Back To Feed
                </Link>
                {postContent}
              </div>
              {/* <!-- Comment Form --> */}
              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">Say Somthing...</div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          placeholder="Create a post"
                        />
                      </div>
                      <button type="submit" className="btn btn-dark">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- Comment Feed --> */}
              <div className="comments">
                {/* <!-- Comment Item --> */}
                <div className="card card-body mb-3">
                  <div className="row">
                    <div className="col-md-2">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                          alt=""
                        />
                      </a>
                      <br />
                      <p className="text-center">Kevin Smith</p>
                    </div>
                    <div className="col-md-10">
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus
                        corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card card-body mb-3">
                  <div className="row">
                    <div className="col-md-2">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                          alt=""
                        />
                      </a>
                      <br />
                      <p className="text-center">Karen Johnson</p>
                    </div>
                    <div className="col-md-10">
                      <p className="lead">
                        {' '}
                        Amet accusamus distinctio cupiditate blanditiis dolor? Illo perferendis
                        eveniet cum cupiditate aliquam?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
