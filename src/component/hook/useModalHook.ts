import { useSelector, useDispatch } from 'react-redux';
import {
  selectModalFlg,
  selectCloseModalFlg,
  setCloseModalFlg,
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
    });
  };
  return {
    showModalFlg,
    closeModalFlg,
    clickHideModal,
  };
};

export default useModalHook;
