"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  totalUsers: number;
  totalVets: number;
}

const DonutUsersVets: React.FC<DonutChartProps> = ({ totalUsers, totalVets }) => {
  const total = totalUsers + totalVets;

  const data: ChartData<"doughnut"> = {
    labels: ["Usuarios", "Veterinarias"],
    datasets: [
      {
        data: [totalUsers, totalVets],
        backgroundColor: [
          "#6BA292", 
          "#BC6C25", 
        ],
        borderColor: [
          "#6BA292", 
          "#BC6C25", 
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) => {
            const currentValue = tooltipItem.raw as number;
            const percentage = total ? ((currentValue / total) * 100).toFixed(2) : "0";
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}  className="mb-8 text-2xl font-bold text-center sm:text-4xl md:text-3xl lg:text-3xl font-poppins text-customBrown">
        Porcentaje de Usuarios y Veterinarias
      </h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutUsersVets;
