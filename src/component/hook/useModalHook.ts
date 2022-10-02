import { useSelector, useDispatch } from 'react-redux';
import {
  selectModalFlg,
  selectCloseModalFlg,
  setCloseModalFlg,
  setAllModalHideFlg,
  setModalFlg,
} from '../../features/modalSlice';

const useModalHook = () => {
  const showModalFlg = useSelector(selectModalFlg);
  const closeModalFlg = useSelector(selectCloseModalFlg);
  const dispatch = useDispatch();
  const clickHideModal = () => {
    dispatch(setCloseModalFlg(true));
    document.getElementById('modal')?.addEventListener('animationend', () => {
      dispatch(setCloseModalFlg(false));
      dispatch(setModalFlg(false));
      dispatch(setAllModalHideFlg(false));
    });
  };
  return {
    showModalFlg,
    closeModalFlg,
    clickHideModal,
  };
};

export default useModalHook;
