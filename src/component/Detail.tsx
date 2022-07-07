import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setSuccessMsg } from "../features/messageSlice";
import { BsCalendar3 } from "react-icons/bs";

import styles from "../cssModules/navitem.module.scss";

import dayjs from "dayjs";
import Calendar from "./Calendar";

import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { BENCHPRESS, LEGPRESS, PULLDOWN } from "../syumokuList";
import Chart from "./Chart";

type ERR = {
  weight: string;
  frequency: string;
  sets: string;
}

type RECORD = {
  id: string;
  weight: string;
  sets: string;
  registerDate: string;
  frequency: string;
}

const Detail: React.FC = () => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState("");
  const [frequency, setFrequency] = useState("");
  const [sets, setSets] = useState("");
  const [calendarDate, setCalendarDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [showCalendarFlg, setShowCalendarFlg] = useState(false);
  const [err, setErr] = useState<ERR>({
    weight: "",
    frequency: "",
    sets: ""
  });
  const [errFlg, setErrFlg] = useState(false);
  const [submitFlg, setSubmitFlg] = useState(false);
  const [trainingData, setTraingData] = useState<RECORD[]>([]);
  const user = useSelector(selectUser);

  const params = useParams();
  // アドレスからトレーニングの名前を取得する。
  const trainingName = params.query;
  let trainingTitle = "";

  switch (trainingName) {
    case BENCHPRESS.en:
      trainingTitle = BENCHPRESS.ja;
      break;
    case LEGPRESS.en:
      trainingTitle = LEGPRESS.ja;
      break;
    case PULLDOWN.en:
      trainingTitle = PULLDOWN.ja;
      break;
  }

  // バリデーション
  const validNum = (num: string, type: keyof ERR) => {
    if (num.length === 0 || num === '0') {
      setErrFlg(true);
      const errMsg = {...err};
      errMsg[type] = "1以上の数値を入力してください";
      setErr(errMsg);
    } else if (!num.match(/^[0-9]+$/)) {
      setErrFlg(true);
      const errMsg = {...err};
      errMsg[type] = "半角数字で入力してください";
      setErr(errMsg);
    } else {
      const errMsg = {...err};
      errMsg[type] = "";
      setErr(errMsg);
    }
  }

  const setValue = (setFunc:React.Dispatch<React.SetStateAction<string>>, type: keyof ERR, value:string) => {
    validNum(value, type);
    setFunc(value);
  }
  // errFlgのリセット
  useEffect(() => {
    if (err.weight === "" && err.frequency === "" && err.sets === "") {
      setErrFlg(false);
    }
  },[err]);

  // submitFlgの監視
  useEffect(() => {
    if ((weight.length !== 0 && frequency.length !== 0 && sets.length !== 0)) {
      setSubmitFlg(true);
    } else {
      setSubmitFlg(false);
    }
  },[weight, frequency, sets]);

  // 登録
  const registerResult = async () => {
    const colRef = collection(db, "trainingData");
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
    trainingData.map((elm) => {
      if (elm.registerDate === calendarDate) {
        skipFlg = true;
        const conf = window.confirm(`${calendarDate}のデータはすでに登録されています。上書きしますか？`);
        if (conf) {
          // updateの処理
          console.log("update");
          const ref = doc(db, "trainingData", elm.id);
          updateDoc(ref, {
            weight: weight,
            sets: sets,
            frequency: frequency,
          });
          refreshForm();
          dispatch(setSuccessMsg("レコードを更新しました。"));
          return false;
        }
      }
    })
    if (!skipFlg) {
      await addDoc(colRef, data);
      refreshForm();
      dispatch(setSuccessMsg("レコードを追加しました。"));
    }
  }

  // 入力フォームのリフレッシュ
  const refreshForm = () => {
    setWeight("");
    setFrequency("");
    setSets("");
  }

  // レコードの削除
  const deleteRecord = async () => {
    const target = trainingData.find((elm) => {
      if(elm.registerDate === calendarDate) {
        return elm;
      }
    })
    // 削除対象が存在しない
    if(!target) {
      alert("レコードが登録されていません。");
      return;
    }
    await deleteDoc(doc(db, "trainingData", target.id));
    // レコードを削除したことを表示する処理
  }

  // トレーニングデータの監視
  useEffect(() => {
    const q = query(collection(db, "trainingData"), where("uid", "==", user.uid), where("trainingName", "==", trainingName));
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
      setTraingData(trainingRecord);
    });
  return () => {
    unSub()
    };
  }, []);

  return (
    <>
      <div className="pt-20">
        <div className="text-center mb-4">
          <h2 className="inline-block text-center font-bold font-lg relative">{trainingTitle}<Link to={"/main"}><button className={styles.nav}>前</button></Link></h2>
        </div>
        <div className="flex justify-center">
          <section className="w-1/4 px-10">
            <section>

              <label className="ml-2 inline-block" htmlFor="weight">重量</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.weight : ""}</span>
              <input id="weight" className="px-2 py-1 border block w-full mb-4" placeholder="ウェイト重量(kg)" type="text" inputMode="numeric" value={weight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setWeight,"weight",e.target.value)}} />
              
              <label className="ml-2 inline-block" htmlFor="frequency">回数</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.frequency : ""}</span>
              <input id="frequency" className="px-2 py-1 border block w-full mb-4" placeholder="回数" type="text" inputMode="numeric" value={frequency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setFrequency,"frequency",e.target.value)}} />
              
              <label className="ml-2 inline-block" htmlFor="sets">セット数</label><span className="text-red-400 text-xs ml-4">{errFlg ? err.sets : ""}</span>
              <input id="sets" className="px-2 py-1 border block w-full mb-4" placeholder="セット数" type="text" inputMode="numeric" value={sets} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValue(setSets,"sets",e.target.value)}} />
              
              <label className="ml-2" onClick={() => {setShowCalendarFlg(!showCalendarFlg)}}>実施日</label>
              <div className="flex border content-between items-center mb-4" onClick={() => {setShowCalendarFlg(!showCalendarFlg)}}>
                <span className="px-2 py-1 w-full inline-block">{calendarDate}</span>
                <BsCalendar3 className="inline-block mr-2 hover:text-gray-500 hover:cursor-pointer transition transition-duration-500"/>
              </div>

            </section>
            <section className="text-center">
              {showCalendarFlg ? <Calendar today={calendarDate} setDay={setCalendarDate}/> : ""}
            </section>
            <div className="flex justify-between mx-auto pb-10">
              <button className={`w-2/5 border inline-block bg-blue-200 py-1 ${!submitFlg ? "bg-gray-200" : ""}`} disabled={!submitFlg} onClick={() => registerResult()}>登録</button>
              <button className="w-2/5 border inline-block bg-blue-200 py-1 text-sm" onClick={() => deleteRecord()}>レコード削除</button>
            </div>
          </section>
          <Chart trainingData={trainingData} trainingTitle={trainingTitle}/>
        </div>
      </div>
    </>
  );
};

export default Detail;
