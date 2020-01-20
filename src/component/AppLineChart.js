import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';

// Average velocity of the last 3 sprints
const velocityAverageHelper = (sprints) => {
  let averageCnt = 0;
  const average = Math.round(sprints.reverse().reduce((acc, sprint) => {
    if (averageCnt === 3) return acc;
    if (sprint.velocity) {
      averageCnt += 1;
      return acc + parseInt(sprint.velocity, 10);
    }

    return acc;
  }, 0) / averageCnt);
  averageCnt = 0;
  return average;
};

const chartDataHelper = (average, totalPoint, datas) => {
  const chartDatas = [];
  chartDatas.push(totalPoint);

  let remainingTaskPoint = totalPoint;
  const tmpArr = new Array(datas.length).fill(0);
  let maxsprint = 0;
  datas.forEach((data) => {
    if (data.sprint !== '') {
      tmpArr[data.sprint] += parseInt(data.point, 10);
      if (maxsprint < data.sprint) maxsprint = parseInt(data.sprint, 10);
    }
  });

  const subtractArr = tmpArr.slice(0, maxsprint + 1);
  for (let i = 1; ;i += 1) {
    if (subtractArr[i]) {
      const reduce = subtractArr.slice(i, i + 1).reduce((acc, num) => acc + num);
      remainingTaskPoint -= reduce;
      chartDatas.push(remainingTaskPoint);
    } else {
      remainingTaskPoint -= average;
      chartDatas.push(remainingTaskPoint);
    }

    if (remainingTaskPoint - average < 0) {
      chartDatas.push(0);
      break;
    }
  }

  return chartDatas;
};

const AppLineChart = () => {
  // state
  const datas = Object.assign([], useSelector((state) => state.datas));
  const sprints = Object.assign([], useSelector((state) => state.sprints));

  // chart datas(plan)
  const labels = sprints.map((sprint, index) => `Sprint${index}`);
  const totalPoint = datas.reduce((acc, data) => {
    if (data.point.trim()) return acc + parseInt(data.point, 10);
    return acc;
  }, 0);

  const average = velocityAverageHelper(sprints);
  const chartDatas = chartDataHelper(average, totalPoint, datas);

  const data = {
    labels,
    datasets: [{
      label: 'Plan',
      data: chartDatas,
      backgroundColor: [
        'rgba(0, 0, 0, 0)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
      ],
      borderWidth: 1,
    }],
  };

  const option = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <Line data={data} option={option} />
  );
};

export default AppLineChart;
