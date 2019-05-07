import React from 'react';

import spinner from './spinner.gif';

const Spinner = () => {
  const style = {
    width: '200px',
    margin: 'auto',
    display: 'block',
  };
  return (
    <div>
      <img style={style} src={spinner} alt="loading..." />
    </div>
  );
};

export default Spinner;
