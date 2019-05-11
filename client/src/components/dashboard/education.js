import React from 'react';
import PropTypes from 'prop-types';

const Education = ({ education }) => {
  console.log(education);
  return <div />;
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
