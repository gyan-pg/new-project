import React, { useEffect, useState } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import Comment from './Comment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  id: string;
  weight: string;
  sets: string;
  frequency: string;
  registerDate: string;
};

const Chart: React.FC<any> = ({trainingData, trainingTitle}) => {
  console.log('chart render');

  const [displayWidth, setDisplayWidth] = useState(0);
  const [commentFlg, setCommentflg] = useState(false);
  const [animateFlg, setAnimateflg] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [visibleLabel, setVisibleLabel] = useState([]);
  
  const toggleShow = () => {
    setAnimateflg(!animateFlg);
    
    if (!commentFlg) {
      setCommentflg(!commentFlg);
    } else {
      setTimeout(() => {
        setCommentflg(!commentFlg);
      }, 600);
    }
  }

  useEffect(() => {
    let data = trainingData.sort(function (a:any, b:any) {
      return (a.registerDate < b.registerDate) ? -1 : 1;
    });
    const labelArr = data.map((elm:ChartData) => {
      return elm.registerDate;
    });
    const amount = data.map((elm:ChartData) => {
      return Number(elm.weight) * Number(elm.sets) * Number(elm.frequency);
    });

    console.log(amount);
    const setData = () => {
      if(trainingData.length > 10) {
        const tempData = amount.slice(trainingData.length-10);
        console.log(tempData);
        const tempLabel = labelArr.slice(trainingData.length-10);
        const returnData = {data: tempData, label: tempLabel};
        return returnData;
      } else {
        const tempData = amount;
        const tempLabel = labelArr;
        const returnData = {data: tempData, label: tempLabel};
        return returnData;
      }
    };

    const tmp:any = setData();
    console.log("tmp",tmp);
    setDisplayWidth(trainingData.length * 30);
    setVisibleData(tmp.data);
    setVisibleLabel(tmp.label);

  },[trainingData])

  

  // console.log("sorted",data);

  // console.log(labelArr)
  
  const graphData = {
    labels: visibleLabel,
    datasets: [
      {
        label: trainingTitle,
        data: visibleData,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options: {} = {
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0
      }
    }
  };

  return (
    <>
      <section className="">
        {
          visibleData.length ?
            <>
              <h2 className="text-center">{trainingTitle}:総負荷グラフ<AiOutlineQuestionCircle className="inline-block hover:cursor-pointer" style={{ position: "relative", top: "-2px" }} onClick={() => toggleShow()}/></h2>
              <div className="flex justify-center">
                <div className="pb-20 relative" style={{ height: "400px", width: `${displayWidth < 150 ? 150 : displayWidth}px` }}>
                  <div className="flex items-center justify-center">
                    {commentFlg ? <Comment animate={animateFlg}/> : ""}
                  </div>
                  <Line 
                    data={graphData}
                    options={options}
                    id="chart-key"
                  />
                </div>
              </div>
            </>
          :
            "データが登録されていません。"
        }
      </section>
    </>
  );
};

export default Chart;