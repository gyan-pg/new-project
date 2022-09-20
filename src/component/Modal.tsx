import React, { ReactElement } from 'react';
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
