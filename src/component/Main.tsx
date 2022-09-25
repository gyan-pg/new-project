import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalFlg, setModalFlg } from '../features/modalSlice';
import { Link } from 'react-router-dom';

import Header from './Header';
import FlashMessage from './FlashMessage';
import Footer from './Footer';
import RegisterTrainingForm from './RegisterTrainingForm';
import Modal from './Modal';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import TrainingCard from './TrainingCard';

const Main: React.FC = () => {
  type TrainingSectionData = {
    id: string;
    imagePass: string;
    trainingName: string;
  };
  const [trainingSection, setTrainingSection] = useState<TrainingSectionData[]>();
  const showModalFlg = useSelector(selectModalFlg);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const q = query(
      collection(db, 'trainingSection'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unSub = onSnapshot(q, (querySnapshot) => {
      let trainingSectionData: TrainingSectionData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        trainingSectionData.push({
          id: doc.id,
          imagePass: data.imagePass,
          trainingName: data.trainingName,
        });
      });
      setTrainingSection(trainingSectionData);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      <Header />
      <main className="mainContainer">
        <FlashMessage />
        <section className="text-center">
          <h1 className="mainTitle">筋トレの記録用アプリ</h1>
        </section>
        <section className="recordListTable">
          <>
            <div className="gridRow registerBtnContainer">
              <button className="registerBtn" onClick={() => dispatch(setModalFlg(!showModalFlg))}>
                トレーニングを追加
              </button>
            </div>
            {trainingSection?.map((training: TrainingSectionData, i: number) => {
              const elm = (
                <TrainingCard
                  key={training.id}
                  id={training.id}
                  trainingName={training.trainingName}
                  imagePass={training.imagePass}
                />
              );
              return elm;
            })}
          </>
        </section>
      </main>
      <Footer />
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

export default Main;
