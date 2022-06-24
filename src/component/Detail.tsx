import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Calendar from "./Calendar";
import { BsCalendar3 } from "react-icons/bs";
import dayjs from "dayjs";
import { BENCHPRESS, LEGPRESS, PULLDOWN } from "../syumokuList";


const Detail: React.FC = () => {
  const params = useParams();
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


  const [frequency, setFrequency] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [calendarDate, setCalendarDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [showCalendarFlg, setShowCalendarFlg] = useState(false);
  // アドレスから種目名を取得する。
  const kind = useLocation().pathname.substring(8);

  console.log(kind);
  console.log('calendarDate',calendarDate);
  console.log(training);

  return (

    <>
      <Link to="/"><button className="bg-pink-100 px-4 py-2 block">TOP</button></Link>
      <h2 className="text-center">{training}</h2>
      <section className="container mx-auto">
        <section className="w-1/5 mx-auto">
          <input className="px-2 py-1 border block w-full" placeholder="ウェイト重量(kg)" type="text" inputMode="numeric" value={weight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setWeight(e.target.value)}} />
          <input className="px-2 py-1 border block w-full" placeholder="回数" type="text" inputMode="numeric" value={frequency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFrequency(e.target.value)}} />
          <input className="px-2 py-1 border block w-full" placeholder="セット数" type="text" inputMode="numeric" value={sets} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSets(e.target.value)}} />
          <div className="flex border content-between items-center">
            <span className="px-2 py-1 w-full inline-block">実施日：{calendarDate}</span>
            <BsCalendar3 className="inline-block mr-2 hover:text-gray-500 hover:cursor-pointer"
                         onClick={() => {setShowCalendarFlg(!showCalendarFlg)}}/>
          </div>
        </section>
        <section className="w-2/5 text-center mx-auto">
          {showCalendarFlg ? <Calendar today={calendarDate} setDay={setCalendarDate}/> : ""}
        </section>
      </section>
    </>
  );
};

export default Detail;
