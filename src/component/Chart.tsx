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
import { isPropertyAccessOrQualifiedName } from 'typescript';

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

  // TODO:リファクタリング
  const [displayWidth, setDisplayWidth] = useState(0);
  const [commentFlg, setCommentflg] = useState(false);
  // 注釈のモーションの制御
  const [animateFlg, setAnimateflg] = useState(false);
  // chart.jsに渡すデータ
  const [visibleData, setVisibleData] = useState([]);
  const [visibleLabel, setVisibleLabel] = useState([]);
  // 全期間の総負荷データ
  const [processedData, setProcessedData] = useState([]);
  // 全期間のラベル
  const [processedLabel, setProcessedLabel] = useState([]);
  // レコードの件数
  const [recordNum, setRecordNum] = useState(0);
  const [recordPages, setRecordPages] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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
    // レコードの制御に必要な数値をセット
    const numOfPages = Math.ceil(trainingData.length / 10);
    setRecordNum(trainingData.length);
    setRecordPages(numOfPages);
    setTotalPage(numOfPages);
    setProcessedData(amount);
    setCurrentPage(numOfPages);
    setProcessedLabel(labelArr);

    const setData = () => {
      if(trainingData.length > 10) {
        const tempData = amount.slice(trainingData.length-10);
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
    setDisplayWidth(trainingData.length < 10 ? trainingData.length * 40 : 400);
    setVisibleData(tmp.data);
    setVisibleLabel(tmp.label);

  },[trainingData])

  const prevPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    if (newPage === 1) {
      setVisibleData(processedData.slice(0, 10));
      setVisibleLabel(processedLabel.slice(0, 10));
    } else if(newPage > 1 && newPage < totalPage){
      setVisibleData(processedData.slice(recordNum - ((totalPage - newPage + 1) * 10), recordNum - ((totalPage - newPage) * 10)));
      setVisibleLabel(processedLabel.slice(recordNum - ((totalPage - newPage + 1) * 10), recordNum - ((totalPage - newPage) * 10)));
    }
  }

  const nextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    if (newPage === totalPage) {
      setVisibleData(processedData.slice(recordNum-10));
      setVisibleLabel(processedLabel.slice(recordNum-10));
    } else {
      setVisibleData(processedData.slice((newPage - 1) * 10, newPage * 10));
      setVisibleLabel(processedLabel.slice((newPage - 1) * 10, newPage * 10));
    }
  }
  
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
                <div className="pb-10 relative" style={{ height: "400px", width: `${displayWidth < 200 ? 200 : displayWidth}px` }}>
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
         
          <div className="pb-10 flex justify-center">
          {totalPage > 1 ?
            <> 
              {currentPage === 1 ? "" : <button className="px-3 py-1" onClick={() => prevPage()}>前の期間</button>}
              {totalPage > currentPage ? <button className="px-3 py-1" onClick={() => nextPage()}>次の期間</button> : ""}
            </>
          : ""}
          </div>
        
      </section>
    </>
  );
};

export default Chart;