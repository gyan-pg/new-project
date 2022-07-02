import React, { useEffect, useState } from 'react';

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
  // console.log(trainingTitle);

  const [dataAmount, setDataAmount] = useState(0);
  const [displayWidth, setDisplayWidth] = useState(0);

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
      {
        data.length ?
          <div style={{ height: "300px", width: `${displayWidth < 150 ? 150 : displayWidth}px` }}>
            <Line 
              data={graphData}
              options={options}
              id="chart-key"
            />
          </div>
        :
          "データが登録されていません。"
      }
    </>
  );
};

export default Chart;