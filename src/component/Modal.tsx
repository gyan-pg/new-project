import React, { useState } from 'react';
import '../css/modal.scss';

type Props = {
  showModalFlg: boolean;
  setShowModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ showModalFlg, setShowModalFlg }) => {
  const [modalCloseFlg, setModalCloseFlg] = useState(false);
  const clickHideModal = () => {
    setModalCloseFlg(true);
    document.getElementById('modal')?.addEventListener('animationend', () => {
      setModalCloseFlg(false);
      setShowModalFlg(false);
    });
  };
  return (
    <>
      {showModalFlg ? (
        <div
          id="modal"
          className={modalCloseFlg ? 'hide modal' : 'modal'}
          onClick={() => clickHideModal()}
        >
          modal window
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
