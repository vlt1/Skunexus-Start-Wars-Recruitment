import './ResourceModal.css';

import React from 'react';
import classnames from 'classnames';

import Modal from '../../../../common/components/Modal';
import TitleHeader from '../../../../common/components/Modal/TitleHeader';
import ResourceForm from '../ResourceForm'

const ResourceModal = ({
  show,
  className,
  type,
  id,
  title = "Resource form",
  onClose = () => {}
}) => {
  return (
    <Modal
      className={classnames('resourceModal', className)}
      show={show}
      header={<TitleHeader title={title} showCloseIcon onClose={onClose}/>}>
      <ResourceForm type={type} id={id} onSubmit={() => {
        alert(Math.random() > 0.5 ? 'success' : 'fail');
        onClose();
      }}/>
    </Modal>
  );
};

export default ResourceModal;
