import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "./Calendar";
import { BsCalendar3 } from "react-icons/bs";
import dayjs from "dayjs";
import { BENCHPRESS, LEGPRESS, PULLDOWN } from "../syumokuList";
import { useSelector } from "react-redux";
import { isLogin } from "../features/userSlice";

type ERR = {
  weight: string;
  frequency: string;
  sets: string;
}

const Detail: React.FC = () => {

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
  const user = useSelector(isLogin);

  const params = useParams();
  // アドレスからトレーニングの名前を取得する。
  const trainingName = params.query;
  let training = "";

  switch (trainingName) {
    case BENCHPRESS.en:
      training = BENCHPRESS.ja;
      break;
    case LEGPRESS.en:
      training = LEGPRESS.ja;
      break;
    case PULLDOWN.en:
      training = PULLDOWN.ja;
      break;
  }

  // バリデーション
  const validNum = (num: string, type: keyof ERR) => {
    if (num.length === 0 || num === '0') {
      setErrFlg(true);
      err[type] = "1以上の数値を入力してください";
    } else if (!num.match(/^[0-9]+$/)) {
      setErrFlg(true);
      err[type] = "半角数字で入力してください";
      setErr(err)
    } else {
      err[type] = "";
    }
    if (err.weight === "" && err.frequency === "" && err.sets === "") {
      setErrFlg(false);
    }
  }

  const setValue = (setFunc:React.Dispatch<React.SetStateAction<string>>, type: keyof ERR, value:string) => {
    validNum(value, type);
    setFunc(value);
  }

  // submitFlgの監視
  useEffect(() => {
    if (weight.length !== 0 && frequency.length !== 0 && sets.length !== 0 && !errFlg) {
      setSubmitFlg(true);
    } else {
      setSubmitFlg(false);
    }
  },[weight, frequency, sets]);

  return (

    <>
      <Link to="/"><button className="bg-pink-100 px-4 py-2 block">TOP</button></Link>
      <h2 className="text-center">{training}</h2>
      <section className="container mx-auto">
        <section className="w-1/5 mx-auto">

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
        <section className="w-2/5 text-center mx-auto">
          {showCalendarFlg ? <Calendar today={calendarDate} setDay={setCalendarDate}/> : ""}
        </section>
        <div className="text-center">
          <button className={`border inline-block w-1/5 bg-blue-200 py-1 ${!submitFlg ? "bg-gray-200" : ""}`} disabled={!submitFlg}>登録</button>
        </div>
      </section>
    </>
  );
};

export default Detail;
