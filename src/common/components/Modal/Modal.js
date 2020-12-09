import './Modal.css';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

const Modal = ({
  show,
  className,
  header,
  footer,
  children
}) => {
  const modal = show ? (
    <div className="modalContainer">
      <div className={classnames('modal', className)}>
        <div className="header">
          {header}
        </div>
        <div className="body">
          {children}
        </div>
        <div className="footer">
          {footer}
        </div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
