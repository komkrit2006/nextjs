import React, { memo } from 'react';
import PropTypes from 'prop-types';

const index = ({ onClick }) => (
  <button type="button" className="btn btn-primary" onClick={onClick}>Click</button>
);

index.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(index);
