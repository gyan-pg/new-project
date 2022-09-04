import React, { ReactElement, useState } from 'react';

type Props = {
  showModalFlg: boolean;
  setShowModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
};

const Modal: React.FC<Props> = ({ showModalFlg, setShowModalFlg, children }) => {
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
          {children}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
