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

  const [dataAmount, setDataAmount] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);
  const [commentFlg, setCommentflg] = useState(false);
  const [animateFlg, setAnimateflg] = useState(false);

  const toggleShow = () => {
    setAnimateflg(!animateFlg);
    
    if (!commentFlg) {
      setCommentflg(!commentFlg);
    } else {
      setTimeout(() => {
        setCommentflg(!commentFlg);
      }, 1000);
    }
  }

  useEffect(() => {
    setDataAmount(trainingData.length);
    setDisplayWidth(trainingData.length * 30);
  },[trainingData])

  let data = trainingData.sort(function (a:any, b:any) {
    return (a.registerDate < b.registerDate) ? -1 : 1;
  });

  // console.log("sorted",data);

  const labelArr = data.map((elm:ChartData) => {
    return elm.registerDate;
  })

  const amount = data.map((elm:ChartData) => {
    return Number(elm.weight) * Number(elm.sets) * Number(elm.frequency);
  })

  // console.log(labelArr)
  
  const graphData = {
    labels: labelArr,
    datasets: [
      {
        label: trainingTitle,
        data: amount,
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
      <section className="flex justify-center">
        {
          data.length ?
            <div className="pb-20 relative" style={{ height: "400px", width: `${displayWidth < 150 ? 150 : displayWidth}px` }}>
              <div className="flex items-center justify-center">
                <h2 className="text-center">{trainingTitle}:総負荷グラフ<AiOutlineQuestionCircle className="inline-block hover:cursor-pointer" style={{ position: "relative", top: "-2px" }} onClick={() => toggleShow()}/></h2>
                {commentFlg ? <Comment animate={animateFlg}/> : ""}
              </div>
              <Line 
                data={graphData}
                options={options}
                id="chart-key"
              />
            </div>
          :
            "データが登録されていません。"
        }
      </section>
    </>
  );
};

export default Chart;