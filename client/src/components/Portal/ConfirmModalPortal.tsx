import React, { ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const el = document.querySelector('#confirm-modal');
if (el === null) {
  throw new Error();
}

const ConfirmModalPortal = (): ReactPortal => ReactDOM.createPortal(<ConfirmModal />, el);

export default ConfirmModalPortal;
