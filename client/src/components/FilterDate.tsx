type FilterDateProps = {
    selectedMonth: string;
    selectedYear: string;
    handleMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleReset: () => void;
};

const FilterDate = ({
    selectedMonth,
    selectedYear,
    handleMonthChange,
    handleYearChange,
    handleReset,
}: FilterDateProps) => {
    return (
        <div>
            {/* Filter Controls */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start m-10">
                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="rounded-lg border px-4 py-2 text-sm"
                >
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <option key={idx} value={idx}>
                            {new Date(0, idx).toLocaleString("default", {
                                month: "long",
                            })}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="rounded-lg border px-4 py-2 text-sm"
                >
                    {Array.from({ length: 5 }).map((_, idx) => {
                        const year = new Date().getFullYear() - idx;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
                <button
                    onClick={handleReset}
                    className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm hover:bg-red-200"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FilterDate;
