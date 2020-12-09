import React from 'react';

const Error = ({
  error
}) => (
  <div className="error">
    {error?.message}
  </div>
);

export default Error;
