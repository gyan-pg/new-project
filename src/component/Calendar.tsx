import React, {useEffect, useState} from "react";
import dayjs from "dayjs";

const Calendar = () => {

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
  },[]);

  return (
    <>
    calendar
      {calendar ? calendar.map((elm:any) => {
        return (
          <div>{
            elm.map((el:any) => {
              return <span key={el.date}>{el.date}</span>;
            })
          }</div>
        )
      }) : ""}
    </>
  );
};

export default Calendar;
