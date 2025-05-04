interface DashboardCardProps {
    label: string;
    amount: number;
}

const DashboardCard = ({ label, amount }: DashboardCardProps) => (
    <div className="rounded-xl p-4 bg-indigo-500 shadow-sm">
        <p className="text-gray-500">{label} Party Planning</p>
        <h2 className="text-xl font-semibold">232.${amount.toFixed(2)}</h2>
    </div>
);

export default DashboardCard;
