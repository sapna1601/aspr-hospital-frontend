import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  birthAndDeathCnt: { birth: number; death: number };
}

const BarChart: React.FC<IProps> = ({ birthAndDeathCnt }) => {
  console.log(birthAndDeathCnt);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Death And Birth",
      },
    },
  };

  const labels = ["Death", "Birth"];

  const data = {
    labels,
    datasets: [
      {
        label: "Death",
        data: [birthAndDeathCnt.death],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Birth",
        data: [0, birthAndDeathCnt.birth],
        backgroundColor: "rgba(31, 43, 91, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
