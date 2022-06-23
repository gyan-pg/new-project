import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Calendar from "./Calendar";
import dayjs from "dayjs";

const Detail: React.FC = () => {
  const params = useParams();
  const trainingName = params.query;
  const [frequency, setFrequency] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [calendarDate, setCalendarDate] = useState(dayjs().format("YYYY-MM-DD"));
  // アドレスから種目名を取得する。
  const kind = useLocation().pathname.substring(8);

  console.log(kind);
  console.log(calendarDate);

  return (

    <>
      <Link to="/"><button className="bg-pink-100 px-4 py-2 block">TOP</button></Link>
      <section className="container mx-auto flex">
        <section className="w-3/5">
          <input className="px-2 py-1 border block w-full" placeholder="ウェイト重量(kg)" type="text" inputMode="numeric" value={weight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setWeight(e.target.value)}} />
          <input className="px-2 py-1 border block w-full" placeholder="回数" type="text" inputMode="numeric" value={frequency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFrequency(e.target.value)}} />
          <input className="px-2 py-1 border block w-full" placeholder="セット数" type="text" inputMode="numeric" value={sets} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSets(e.target.value)}} />
        </section>
        <section className="w-2/5 text-center">
          <Calendar today={calendarDate} setDay={setCalendarDate}/>
        </section>
      </section>
    </>
  );
};

export default Detail;
