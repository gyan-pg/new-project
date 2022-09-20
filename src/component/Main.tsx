import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalFlg, setModalFlg } from '../features/modalSlice';
import { Link } from 'react-router-dom';
// picture
import dumbbell from '../images/weight2.png';
import machine from '../images/runningmachine.png';
import bench from '../images/bench.png';

import Header from './Header';
import FlashMessage from './FlashMessage';
import Footer from './Footer';
import RegisterTrainingForm from './RegisterTrainingForm';
import Modal from './Modal';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
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
  const [loadingFlg, setLoadingFlg] = useState(true);
  const showModalFlg = useSelector(selectModalFlg);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const q = query(collection(db, 'trainingSection'), where('uid', '==', user.uid));
    let trainingSectionData: TrainingSectionData = { id: '', imagePass: '', trainingName: '' };
    const trainingSections: TrainingSectionData[] = [];
    const unSub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        trainingSectionData = {
          id: doc.id,
          imagePass: data.imagePass,
          trainingName: data.trainingName,
        };
        trainingSections.push(trainingSectionData);
      });
      setTrainingSection(trainingSections);
      setLoadingFlg(false);
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
            {!loadingFlg
              ? trainingSection?.map((training: TrainingSectionData) => {
                  <TrainingCard
                    key={training.id}
                    trainingName={training.trainingName}
                    imagePass={training.imagePass}
                  />;
                })
              : ''}
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
