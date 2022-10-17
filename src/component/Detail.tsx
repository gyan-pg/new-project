import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { setSuccessMsg } from '../features/messageSlice';
import { BsCalendar3 } from 'react-icons/bs';

import styles from '../cssModules/navitem.module.scss';

import dayjs from 'dayjs';
import Calendar from './Calendar';

import { db } from '../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import Chart from './Chart';
import ChartState from './ChartState';
import Header from './Header';
import FlashMessage from './FlashMessage';
import Footer from './Footer';

type ERR = {
  weight: string;
  frequency: string;
  sets: string;
};

type RECORD = {
  id: string;
  weight: string;
  sets: string;
  registerDate: string;
  frequency: string;
};

const Detail: React.FC = () => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState('');
  const [frequency, setFrequency] = useState('');
  const [sets, setSets] = useState('');
  const [calendarDate, setCalendarDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [showCalendarFlg, setShowCalendarFlg] = useState(false);
  const [err, setErr] = useState<ERR>({
    weight: '',
    frequency: '',
    sets: '',
  });
  const [errFlg, setErrFlg] = useState(false);
  const [submitFlg, setSubmitFlg] = useState(false);
  const [trainingData, setTraingData] = useState<RECORD[]>([]);
  const [loadingFlg, setLoadingFlg] = useState(true);
  const user = useSelector(selectUser);

  const params = useParams();
  // アドレスからトレーニングの名前を取得する。
  const trainingName = params.query;

  // バリデーション
  const validNum = (num: string, type: keyof ERR) => {
    if (num.length === 0 || num === '0') {
      setErrFlg(true);
      const errMsg = { ...err };
      errMsg[type] = '1以上の数値を入力してください';
      setErr(errMsg);
    } else if (!num.match(/^[0-9]+$/)) {
      setErrFlg(true);
      const errMsg = { ...err };
      errMsg[type] = '半角数字で入力してください';
      setErr(errMsg);
    } else {
      const errMsg = { ...err };
      errMsg[type] = '';
      setErr(errMsg);
    }
  };

  const setValue = (
    setFunc: React.Dispatch<React.SetStateAction<string>>,
    type: keyof ERR,
    value: string
  ) => {
    validNum(value, type);
    setFunc(value);
  };
  // errFlgのリセット
  useEffect(() => {
    if (err.weight === '' && err.frequency === '' && err.sets === '') {
      setErrFlg(false);
    }
  }, [err]);

  // submitFlgの監視
  useEffect(() => {
    if (weight.length !== 0 && frequency.length !== 0 && sets.length !== 0) {
      setSubmitFlg(true);
    } else {
      setSubmitFlg(false);
    }
  }, [weight, frequency, sets]);

  // 登録
  const registerResult = async () => {
    const colRef = collection(db, 'trainingData');
    const data = {
      uid: user.uid,
      registerDate: calendarDate,
      weight,
      sets,
      frequency,
      trainingName,
    };

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

  // 入力フォームのリフレッシュ
  const refreshForm = () => {
    setWeight('');
    setFrequency('');
    setSets('');
  };

  // レコードの削除
  const deleteRecord = async () => {
    const target = trainingData.find((elm) => {
      if (elm.registerDate === calendarDate) {
        return elm;
      }
    });
    // 削除対象が存在しない
    if (!target) {
      alert('レコードが登録されていません。');
      return;
    }
    await deleteDoc(doc(db, 'trainingData', target.id));
    // レコードを削除したことを表示する処理
  };

  // トレーニングデータの監視
  useEffect(() => {
    const q = query(
      collection(db, 'trainingData'),
      where('uid', '==', user.uid),
      where('trainingName', '==', trainingName)
    );
    const unSub = onSnapshot(q, (querySnapshot) => {
      const trainingRecord: RECORD[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        trainingRecord.push({
          id: doc.id,
          weight: data.weight,
          sets: data.sets,
          frequency: data.frequency,
          registerDate: data.registerDate,
        });
      });
      setLoadingFlg(false);
      setTraingData(trainingRecord);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      <Header />
      <main className="detailMain">
        <FlashMessage />
        <div className="detailInputForm">
          <div className="detailTitleContainer">
            <h2 className="detailTitle">{trainingName}</h2>
            <Link to={'/main'}>
              <button className="detailBackBtn">前</button>
            </Link>
          </div>
          <div className="detailRecordContainer">
            <section className="detailForm">
              <section>
                <label className="detailLabel" htmlFor="weight">
                  重量
                </label>
                <span className="textErrMid">{errFlg ? err.weight : ''}</span>
                <input
                  id="weight"
                  className="detailFormInput"
                  placeholder="ウェイト重量(kg)"
                  type="text"
                  inputMode="numeric"
                  value={weight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(setWeight, 'weight', e.target.value);
                  }}
                />

                <label className="detailLabel" htmlFor="frequency">
                  回数
                </label>
                <span className="textErrMid">{errFlg ? err.frequency : ''}</span>
                <input
                  id="frequency"
                  className="detailFormInput"
                  placeholder="回数"
                  type="text"
                  inputMode="numeric"
                  value={frequency}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(setFrequency, 'frequency', e.target.value);
                  }}
                />

                <label className="detailLabel" htmlFor="sets">
                  セット数
                </label>
                <span className="textErrMid">{errFlg ? err.sets : ''}</span>
                <input
                  id="sets"
                  className="detailFormInput"
                  placeholder="セット数"
                  type="text"
                  inputMode="numeric"
                  value={sets}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(setSets, 'sets', e.target.value);
                  }}
                />

                <label
                  className="detailLabel"
                  onClick={() => {
                    setShowCalendarFlg(!showCalendarFlg);
                  }}
                >
                  実施日
                </label>
                <span className="detailWorkDate">{calendarDate}</span>
              </section>
              <section className="text-center">
                <Calendar today={calendarDate} setDay={setCalendarDate} />
              </section>
              <div className="detailButtonContainer">
                <div className="detailButtonWrap">
                  <button
                    className={`detailButton ${!submitFlg ? 'disable' : ''}`}
                    disabled={!submitFlg}
                    onClick={() => registerResult()}
                  >
                    登録
                  </button>
                </div>
                <div className="detailButtonWrap">
                  <button className="detailButton" onClick={() => deleteRecord()}>
                    レコード削除
                  </button>
                </div>
              </div>
            </section>
            <section className="detailRecord">
              {loadingFlg ? (
                <ChartState message="loading..." />
              ) : (
                <Chart trainingData={trainingData} trainingTitle={trainingName} />
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Detail;
