import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useModalHook from './hook/useModalHook';
import dumbbell from '../images/weight2.png';
import machine from '../images/runningmachine.png';
import bench from '../images/bench.png';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

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

  const user = useSelector(selectUser);

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

  const registerTraining = () => {
    registerTrainingSection();
    clickHideModal();
  };

  useEffect(() => {
    const inputFlg = selectImg.find((e) => e === true);
    if (selectImgFlg) {
      if (inputFlg) {
        setErrFlg(false);
        const msg = { ...errMsg };
        msg.imagePass = '';
        setErrMsg(msg);
      } else {
        setErrFlg(true);
        const msg = { ...errMsg };
        msg.imagePass = '画像を選択してください';
        setErrMsg(msg);
      }
    }
  }, [selectImg]);

  // 登録
  const registerTrainingSection = async () => {
    const colRef = collection(db, 'trainingSection');
    const data = {
      uid: user.uid,
      trainingName,
      imagePass,
    };
    await addDoc(colRef, data);
  };

  /*
      // 選択した日ですでに登録されているのか確認する。
      let skipFlg = false;
      trainingData.forEach((elm) => {
        if (elm.registerDate === calendarDate) {
          skipFlg = true;
          const conf = window.confirm(
            `${calendarDate}のデータはすでに登録されています。上書きしますか？`
          );
          if (conf) {
            // updateの処理
            console.log('update');
            const ref = doc(db, 'trainingData', elm.id);
            updateDoc(ref, {
              weight: weight,
              sets: sets,
              frequency: frequency,
            });
            refreshForm();
            dispatch(setSuccessMsg('レコードを更新しました。'));
            return false;
          }
        }
      });
      if (!skipFlg) {
        await addDoc(colRef, data);
        refreshForm();
        dispatch(setSuccessMsg('レコードを追加しました。'));
      }
    };
    */

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
                setSelectImgFlg(true);
              }}
            >
              <img src={bench} alt="bench" />
            </div>
            <div
              className={selectImg[1] ? `iconContainer active` : `iconContainer`}
              onClick={() => {
                clickChangeSelect(1, 'machine');
                setSelectImgFlg(true);
              }}
            >
              <img src={machine} alt="machine" />
            </div>
            <div
              className={selectImg[2] ? `iconContainer active` : `iconContainer`}
              onClick={() => {
                clickChangeSelect(2, 'dumbbell');
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
