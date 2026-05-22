"use client"


const Distribution = ({ year = 2025 }) => {

    return (
        <div className="py-16 bg-white">
            <div className="mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left: heading + image placeholder */}
                    <div>
                        <p className="text-2xl font-bold tracking-widest text-[#1D9E75] uppercase mb-2.5">
                            Explore Comparative data of states
                        </p>
                        <h2 className="text-base font-bold leading-tight text-[#143D2E] mb-3">
                            Users can run selected queries across multiple states and budget performance indicators
                        </h2>
                        <button
                            className="bg-[#012c14] hover:bg-[#0f6e56] text-white px-[18px] py-[8px] font-bold whitespace-nowrap transition-colors duration-150 rounded-lg"
                        >
                            Run Comparison
                        </button>

                    </div>

                    {/* Right: bar chart */}
                    <div>
                        <div className="mt-5 mb-5 px-4 py-3 bg-[#f8faf8] rounded-lg border border-[#e8ede8]">
                            <p className="text-[13px] text-[#888] leading-relaxed">Distribution of the total expenditure of the 36 state governments, Approved budget {year}</p>
                        </div>
                        <BudgetBar data={STATES_DATA} />
                    </div>
                </div>
            </div>
        </div>
    )
}


function BudgetBar({ data }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {data.map((d) => (
                <div key={d.name} className="grid grid-cols-[110px_1fr_52px] items-center gap-2">
                    <span className="text-xs text-[#444] text-right whitespace-nowrap overflow-hidden text-ellipsis">{d.name}</span>
                    <div className="h-3.5 bg-[#f0f0f0] rounded-sm overflow-hidden">
                        <div
                            className="h-full rounded-sm transition-[width] duration-500 ease-out"
                            style={{
                                width: `${(d.pct / 42.9) * 100}%`,
                                background: d.name === "Others" ? "#d0d0d0" : "#1D9E75",
                            }}
                        />
                    </div>
                    <span className="text-[11px] text-[#666] text-right">{d.pct}%</span>
                </div>
            ))}
        </div>
    );
}

const STATES_DATA = [
    { name: "Lagos", pct: 12.1, color: "#1D9E75" },
    { name: "FCT-Abuja", pct: 5.9, color: "#1D9E75" },
    { name: "Rivers", pct: 5.2, color: "#1D9E75" },
    { name: "Kano", pct: 4.1, color: "#1D9E75" },
    { name: "Delta", pct: 3.6, color: "#1D9E75" },
    { name: "Oyo", pct: 2.9, color: "#1D9E75" },
    { name: "Kaduna", pct: 2.7, color: "#1D9E75" },
    { name: "Edo", pct: 2.4, color: "#1D9E75" },
    { name: "Anambra", pct: 2.2, color: "#1D9E75" },
    { name: "Akwa Ibom", pct: 2.0, color: "#1D9E75" },
    { name: "Others", pct: 55.0, color: "#d0d0d0" },
];


export default Distribution