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

type BarChartProps = {
    title?: string;
    labels: string[];
    data: number[];
    label: string;
    color?: string;
};

const BarChart: React.FC<BarChartProps> = ({
    title,
    labels,
    data,
    label,
    color = "#6366f1",
}) => {
    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor: color,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            title: {
                display: !!title,
                text: title,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
