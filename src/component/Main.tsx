import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// picture
import benchPress from '../images/bench_press.jpeg';
import pullDown from '../images/pull_down.jpg';
import legPress from '../images/leg_press.jpeg';
import { BENCHPRESS, LEGPRESS, PULLDOWN } from '../syumokuList';
import Header from './Header';
import FlashMessage from './FlashMessage';
import Footer from './Footer';
import '../css/main.scss';
import RegisterTrainingForm from './RegisterTrainingForm';
import Modal from './Modal';

const Main = () => {
  const [showModalFlg, setShowModalFlg] = useState(false);

  return (
    <>
      <Header />
      <main className="mainContainer">
        <FlashMessage />
        <section className="text-center">
          <h1 className="mainTitle">筋トレの記録用アプリ</h1>
        </section>
        <section className="recordListTable">
          <div className="gridRow registerBtnContainer">
            <button className="registerBtn" onClick={() => setShowModalFlg(!showModalFlg)}>
              トレーニングを追加
            </button>
          </div>
          <div style={{ height: '100px', backgroundColor: 'red' }}>b</div>
          <div style={{ height: '100px', backgroundColor: 'yellow' }}>c</div>
          <div style={{ height: '100px', backgroundColor: 'blue' }}>d</div>
          {/* <Link to={"/detail/" + BENCHPRESS.en}>
            <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={benchPress} alt="ベンチプレス"/></div>
          </Link>
          <Link to={"/detail/" + PULLDOWN.en}>
            <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={pullDown} alt="ラットプルダウン"/></div>
          </Link>
          <Link to={"/detail/" + LEGPRESS.en}>
            <div className="bg-green-300 p-10 hover:cursor-pointer"><img src={legPress} alt="レッグプレス"/></div>
          </Link> */}
        </section>
      </main>
      <Footer />
      {showModalFlg ? <Modal showModalFlg={showModalFlg} setShowModalFlg={setShowModalFlg} /> : ''}
    </>
  );
};

export default Main;
