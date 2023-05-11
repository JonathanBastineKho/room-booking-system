import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
          grid: {
            display: false, // Hide the vertical grid lines
          },
          ticks : {
            font : {
                weight: 'bold',
                
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)', // Set the color of the horizontal grid lines
          },
        },
      },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
    labels,
    datasets: [
        {
            label: "Sales",
            data: [0, 200, 100, 150, 300, 350, 500],
            borderColor: "rgba(30,89,220,255)",
            backgroundColor: "rgba(30,89,220,255, 0.1)",
            borderWidth : 6,
        },
    ],
};

function AdminRoomChart() {
    return (
        <div className="bg-gray-800 rounded-xl py-5 px-8 w-full">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        $45,385
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-500">
                        Sales this week
                    </p>
                </div>

                <p className="text-lg font-bold text-emerald-400">
                    ↑ 12.8%
                </p>
            </div>
            <Line options={options} data={data} />
        </div>
    );
}

export default AdminRoomChart;
