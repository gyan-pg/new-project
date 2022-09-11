import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectModalFlg,
  setModalFlg,
  setCloseModalFlg,
  selectCloseModalFlg,
} from '../features/modalSlice';
import useModalHook from './hook/useModalHook';

type Props = {
  children: ReactElement;
};

const Modal: React.FC<Props> = ({ children }) => {
  const { showModalFlg, closeModalFlg, clickHideModal } = useModalHook();

  return (
    <>
      {showModalFlg ? (
        <div
          id="modal"
          className={closeModalFlg ? 'hide modal' : 'modal'}
          onClick={() => clickHideModal()}
        >
          {children}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
