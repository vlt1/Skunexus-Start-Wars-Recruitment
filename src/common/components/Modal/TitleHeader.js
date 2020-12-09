import './Modal.css';

import React from 'react';

const TitleHeader = ({
  title,
  showCloseIcon,
  onClose = () => {}
}) => (
  <div className="titleHeader">
    <div className="title">
      {title}
    </div>
    {showCloseIcon && <div className="closeIcon" onClick={onClose}>X</div>}
  </div>
);

export default TitleHeader;
