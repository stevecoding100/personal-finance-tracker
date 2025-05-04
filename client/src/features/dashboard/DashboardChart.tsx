import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Transaction } from "./type";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

interface DashboardChartProps {
    data: Transaction[];
}

const DashboardChart = ({ data }: DashboardChartProps) => {
    const groupedByDate: { [date: string]: number } = {};

    data.forEach((tx) => {
        const date = new Date(tx.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        groupedByDate[date] = (groupedByDate[date] || 0) + tx.amount;
    });

    const labels = Object.keys(groupedByDate);
    const amounts = Object.values(groupedByDate);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Spending",
                data: amounts,
                fill: false,
                borderColor: "rgb(99, 102, 241)", // indigo-500
                tension: 0.3,
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
        },
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Spending Overview</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DashboardChart;
