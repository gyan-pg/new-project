import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

type PROPS = {
  today: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: React.FC<PROPS> = ({today, setDay}) => {

  type DATE = {
    day: number,
    date: string,
    month: number,
  }
  const [currentDay, setCurrentDay] = useState(today);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendar, setCalendar] = useState<any>();

  // カレンダーの初めの日を取得
  const getStartDate = () => {
    const date = dayjs(currentDate.startOf("month"));
    const youbiNum = date.day();
    return date.subtract(youbiNum, "days");
  };
  // カレンダーの最後の日を取得
  const getEndDate = () => {
    const date = dayjs(currentDate.endOf("month"));
    const youbiNum = date.day();
    return date.add(6 - youbiNum, "days");
  }

  const getCalendar = () => {
    let startDate = getStartDate();
    const endDate = getEndDate();
    const weekNum = Math.ceil(endDate.diff(startDate, "days") / 7);

    const calendar = [];
    for (let week = 0; week < weekNum; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        weekRow.push({
          day: startDate.get("date"),
          date: startDate.format("YYYY-MM-DD"),
          month: startDate.get("month"),
        });
        startDate = startDate.add(1, "days");
      };
      calendar.push(weekRow);
    }
    return calendar;
  };

  useEffect(() => {
    const calendar = getCalendar();
    setCalendar(calendar);
  },[currentDate]);

  // useCallbackを使う？
  const getCalendarDate = (el:DATE) => {
    setDay(el.date);
    setCurrentDay(el.date);
  }

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  }

  return (
    <>
    <section className="inline-block mb-4">
      <div className="flex justify-between items-center mb-2 mt-2">
        <AiFillCaretLeft className="hover:cursor-pointer" onClick={() => {prevMonth()}}/>
        <span>{currentDate.format("YYYY年MM月")}</span>
        <AiFillCaretRight className="hover:cursor-pointer ml-4" onClick={() => {nextMonth()}} />
      </div>
      <div className="inline-block border-b">
        {calendar ? calendar.map((elm: [], index:number) => {
          return (
            <div key={index} className="flex">{
              elm.map((el:DATE, index) => {
                return( 
                  <div className={`w-10 text-center border-t border-l hover:bg-gray-200 ${index === 6 ? "border-r" : ""}`} key={el.date}>
                    <p className={`hover:cursor-pointer ${el.month !== currentDate.month() ? "text-gray-400 " : ""}
                       ${el.date === currentDay ? "text-pink-500" : ""}`}
                       key={el.date} onClick={() => getCalendarDate(el)}>{el.day}</p>
                  </div>
                )
              })
            }</div>
          )
        }) : ""}
      </div>
    </section>
    </>
  );
};

export default Calendar;
