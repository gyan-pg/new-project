import React, { useEffect, useState } from 'react';
import dumbbell from '../images/weight2.png';
import machine from '../images/runningmachine.png';
import bench from '../images/bench.png';
import { RiDeleteBinLine, RiSettings2Line } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalFlg, setModalFlg } from '../features/modalSlice';
import Modal from './Modal';
import RegisterTrainingForm from './RegisterTrainingForm';

type TrainingProps = {
  id: string;
  trainingName: string;
  imagePass: string;
};

const TrainingCard: React.FC<TrainingProps> = ({ trainingName, imagePass, id }) => {
  const [imgPass, setImgPass] = useState('');
  const showModalFlg = useSelector(selectModalFlg);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (imagePass) {
      case 'machine':
        setImgPass(machine);
        break;
      case 'dumbbell':
        setImgPass(dumbbell);
        break;
      case 'bench':
        setImgPass(bench);
        break;
      default:
        break;
    }
  }, []);

  const clickDeleteCard = async () => {
    const confirmFlg = confirm('登録していたレコードも削除されますが、よろしいですか？');
    if (confirmFlg) {
      await deleteDoc(doc(db, 'trainingSection', id));
    }
  };

  // const deleteRecord = async () => {
  //   const target = trainingData.find((elm) => {
  //     if (elm.registerDate === calendarDate) {
  //       return elm;
  //     }
  //   });
  //   // 削除対象が存在しない
  //   if (!target) {
  //     alert('レコードが登録されていません。');
  //     return;
  //   }
  //   await deleteDoc(doc(db, 'trainingData', target.id));
  //   // レコードを削除したことを表示する処理
  // };

  return (
    <>
      <div className="trainingCardContainer">
        <div className="trainingCard">
          <h3 className="trainingCardTitle">{trainingName}</h3>
          <div className="trainingCardBody">
            <div className="trainingCardImgContainer">
              <img className="trainingCardImg" src={imgPass} />
            </div>
            <div className="trainingCardSettings">
              <button className="trainingCardDeleteBtn" onClick={() => clickDeleteCard()}>
                <IconContext.Provider value={{ size: '2rem' }}>
                  <RiDeleteBinLine />
                </IconContext.Provider>
              </button>
              <button
                className="trainingCardSettingBtn"
                onClick={() => dispatch(setModalFlg(!showModalFlg))}
              >
                <IconContext.Provider value={{ size: '2rem' }}>
                  <RiSettings2Line />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModalFlg ? (
        <Modal>
          <RegisterTrainingForm />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default TrainingCard;
