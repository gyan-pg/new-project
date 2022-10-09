import React, { useEffect, useState } from 'react';
import dumbbell from '../images/weight2.png';
import machine from '../images/runningmachine.png';
import bench from '../images/bench.png';
import { RiDeleteBinLine, RiSettings2Line } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModalFlg,
  selectEditFlg,
  setModalFlg,
  setEditFlg,
  selectEditCardId,
  setEditCardId,
} from '../features/modalSlice';
import Modal from './Modal';
import RegisterTrainingForm from './RegisterTrainingForm';

type TrainingProps = {
  id: string;
  trainingName: string;
  imagePass: string;
};

const TrainingCard: React.FC<TrainingProps> = ({ trainingName, imagePass, id }) => {
  const showModalFlg = useSelector(selectModalFlg);
  const editFlg = useSelector(selectEditFlg);
  // 編集中のカードid
  const editCardId = useSelector(selectEditCardId);
  const dispatch = useDispatch();

  const selectImage = (imagePass: string) => {
    switch (imagePass) {
      case 'machine':
        return machine;
      case 'dumbbell':
        return dumbbell;
      case 'bench':
        return bench;
      default:
        return '';
    }
  };

  const clickDeleteCard = async () => {
    const confirmFlg = confirm('登録していたレコードも削除されますが、よろしいですか？');
    if (confirmFlg) {
      await deleteDoc(doc(db, 'trainingSection', id));
    }
  };

  return (
    <>
      <div className="trainingCardContainer">
        <div className="trainingCard">
          <h3 className="trainingCardTitle">{trainingName}</h3>
          <div className="trainingCardBody">
            <div className="trainingCardImgContainer">
              <img className="trainingCardImg" src={selectImage(imagePass)} />
            </div>
            <div className="trainingCardSettings">
              <button className="trainingCardDeleteBtn" onClick={() => clickDeleteCard()}>
                <IconContext.Provider value={{ size: '2rem' }}>
                  <RiDeleteBinLine />
                </IconContext.Provider>
              </button>
              <button
                className="trainingCardSettingBtn"
                onClick={() => {
                  dispatch(setModalFlg(!showModalFlg));
                  dispatch(setEditFlg(true));
                  dispatch(setEditCardId(id));
                }}
              >
                <IconContext.Provider value={{ size: '2rem' }}>
                  <RiSettings2Line />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModalFlg && editFlg && editCardId === id ? (
        <Modal>
          <RegisterTrainingForm
            editFlg={true}
            id={id}
            currentTrainingName={trainingName}
            currentImagePass={imagePass}
          />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default TrainingCard;
