import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Calendar: React.FC = () => {

  type DATE = {
    day: number,
    date: string,
    month: number,
  }

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

  const getCalendarDate = (el:DATE) => {
    console.log(el);
  }

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  }

  return (
    <>
    <section className="inline-block">
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
                  <div className={index === 6 ? "w-10 text-center border-t border-l border-r hover:bg-gray-200" : "w-10 text-center border-t border-l hover:bg-gray-200"} key={el.date}>
                    <p className={ el.month !== currentDate.month() ? "text-gray-400 hover:cursor-pointer" : "hover:cursor-pointer"} key={el.date} onClick={() => getCalendarDate(el)}>{el.day}</p>
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
