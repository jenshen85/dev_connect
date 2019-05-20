import React from 'react';
import PropTypes from 'prop-types';

const SinglePostItem = ({ post: { name, text, avatar } }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img className="rounded-circle d-none d-md-block" src={avatar} alt={name} />
          </a>
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
        </div>
      </div>
    </div>
  );
};

SinglePostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default SinglePostItem;
