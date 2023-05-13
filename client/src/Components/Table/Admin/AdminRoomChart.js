import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

function AdminRoomChart(props) {
    const total_sales = props.display
        .map((item) => item.bookingPrice)
        .reduce((a, b) => a + b, 0);

    const salesByDate = {};
    props.display.forEach((item) => {
        const date = item.startTime.split(" ")[0];
        salesByDate[date] = (salesByDate[date] || 0) + item.bookingPrice;
    });

    // Get an array of accumulated sales values
    const sales = Object.values(salesByDate);

    // Get an array of labels (unique dates)
    const labels = Object.keys(salesByDate);

    // Calculate percentage change from start to end
    const endSales = sales[0];
    const startSales = sales[sales.length - 1];
    const percentageChange = (((endSales - startSales) / startSales) * 100).toFixed(1);

    // Create the chart data object
    const data = {
        labels,
        datasets: [
            {
                label: "Sales $",
                data: sales,
                borderColor: "rgba(30,89,220,255)",
                backgroundColor: "rgba(30,89,220,255, 0.1)",
                borderWidth: 6,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "MMM dd",
                    },
                },
                grid: {
                    display: false, // Hide the vertical grid lines
                },
                ticks: {
                    autoSkip: false,
                    font: {
                        weight: "bold",
                    },
                    maxTicksLimit: 7,
                },
            },
            y: {
                grid: {
                    color: "rgba(0, 0, 0, 0.1)", // Set the color of the horizontal grid lines
                },
                min: Math.min(...sales)*0.9,
            },
        },
    };
    return (
        <div className="bg-gray-800 rounded-xl py-5 px-8 w-full h-[36rem] flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${total_sales}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-500">
                        {props.room}
                    </p>
                </div>

                {percentageChange > 0 && <p className="text-lg font-bold text-emerald-400">
                    🡅 {percentageChange}%
                </p>}
                {percentageChange < 0 && <p className="text-lg font-bold text-red-500">
                    🡇 {percentageChange}%
                </p>}
                {percentageChange === '0.0' && <p className="text-lg font-bold text-gray-500">
                    {percentageChange}%
                </p>}
            </div>
            <div className="flex-1">
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default AdminRoomChart;
