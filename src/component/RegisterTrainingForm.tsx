import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectModalFlg, setModalFlg, setCloseModalFlg } from '../features/modalSlice';
import useModalHook from './hook/useModalHook';
import dumbbell from '../images/weight2.png';
import machine from '../images/runningmachine.png';
import bench from '../images/bench.png';

const RegisterTrainingForm: React.FC = () => {
  const { clickHideModal } = useModalHook();
  const [trainingName, setTrainingName] = useState('');
  const [selectImg, setSelectImg] = useState([false, false, false]);
  const [selectImgFlg, setSelectImgFlg] = useState(false);
  const [imagePass, setImagePass] = useState('');
  const [errMsg, setErrMsg] = useState({
    trainingName: '',
    imagePass: '',
  });
  const [errFlg, setErrFlg] = useState(false);
  const stopEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const clickChangeSelect = (num: number, name: string) => {
    const selectFlg = !selectImg[num];
    const selectFlgArr = [false, false, false];
    selectFlgArr[num] = selectFlg;
    setSelectImg(selectFlgArr);
    if (selectFlg) {
      setImagePass(name);
    } else {
      setImagePass('');
    }
  };

  const validRequired = (str: string) => {
    if (str.length === 0) {
      setErrFlg(true);
      const msg = { ...errMsg };
      msg.trainingName = '入力必須項目です';
      setErrMsg(msg);
    } else {
      setErrFlg(false);
      const msg = { ...errMsg };
      msg.trainingName = '';
      setErrMsg(msg);
    }
  };

  const setValue = (str: string) => {
    setTrainingName(str);
    validRequired(str);
  };

  const validImagePass = () => {
    if (selectImgFlg) {
      if (imagePass.length === 0) {
        setErrFlg(true);
        const msg = { ...errMsg };
        msg.imagePass = '画像を選択してください';
        setErrMsg(msg);
      } else {
        setErrFlg(false);
        const msg = { ...errMsg };
        msg.imagePass = '';
        setErrMsg(msg);
      }
    }
  };

  const registerTraining = () => {
    clickHideModal();
  };

  return (
    <>
      <section className="modalComponent" onClick={(e) => stopEvent(e)}>
        <div className="registerForm">
          <h2 className="registerTitle">トレーニング登録フォーム</h2>
          <label className="inputName" htmlFor="trainingName">
            トレーニング名
          </label>
          {errFlg ? <span className="textErr">{errMsg.trainingName}</span> : ''}
          <input
            id="trainingName"
            className="trainingRegisterInput"
            value={trainingName}
            onChange={(e) => setValue(e.target.value)}
          />
          <label className="inputName">イメージ選択</label>
          {errFlg ? <span className="textErr">{errMsg.imagePass}</span> : ''}
          <div className="imgSelectContainer">
            <div
              className={selectImg[0] ? `iconContainer active` : `iconContainer`}
              onClick={() => {
                clickChangeSelect(0, 'bench');
                validImagePass();
                setSelectImgFlg(true);
              }}
            >
              <img src={bench} alt="bench" />
            </div>
            <div
              className={selectImg[1] ? `iconContainer active` : `iconContainer`}
              onClick={() => {
                clickChangeSelect(1, 'machine');
                validImagePass();
                setSelectImgFlg(true);
              }}
            >
              <img src={machine} alt="machine" />
            </div>
            <div
              className={selectImg[2] ? `iconContainer active` : `iconContainer`}
              onClick={() => {
                clickChangeSelect(2, 'dumbbell');
                validImagePass();
                setSelectImgFlg(true);
              }}
            >
              <img src={dumbbell} alt="dumbbell" />
            </div>
          </div>
          <div className="registerBtnContainer mt-m">
            <button className="registerBtn modalBtn" onClick={() => registerTraining()}>
              登録する
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterTrainingForm;
