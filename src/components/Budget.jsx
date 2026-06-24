"use client";

const Budget = () => {

    const nav = [
        {
            title: "Original Budget",
            description: "Government's estimated revenue and proposed expenditure over a period of one year.",
            href: "/group-explorer?type=original&year=2018&categories=all&states=all",
            icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
            accent: "#1D9E75",
            bg: "#f0faf6",
        },
        {
            title: "Actual",
            description: "Government's actual revenue and expenditure over the budget period.",
            href: "/group-explorer?type=actual&year=2018&categories=all&states=all",
            icon: "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2z",
            accent: "#BA7517",
            bg: "#fdf6ec",
        },
        {
            title: "Budget Performance Indicators",
            description: "Measurable values of the performance of the government's budget.",
            href: "/group-explorer?type=pi&year=2019&categories=all&states=all",
            icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",

            accent: "#378ADD",
            bg: "#eef6fd",
        },
        {
            title: "Revised Budget",
            description: "Government's revised revenue and proposed expenditure over a period of one year.",
            href: "/group-explorer?type=revised&year=2020&categories=all&states=all",
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
            accent: "#7A37DD",
            bg: "#f5eefd",
        },
    ];
    return (
        <section className="py-16 w-full bg-[#f8faf8]">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                <h2 className="text-[28px] font-bold text-[#012c14] mb-2">Budgets</h2>
                <p className="text-sm text-[#666] mb-9">Access fiscal data across all budget categories</p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                    {nav?.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-xl border-[1.5px] border-[#e8ede8] p-7 flex flex-col gap-3 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 cursor-pointer"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = card.bg)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                        >
                            <div
                                className="w-11 h-11 rounded-[10px] flex items-center justify-center"
                                style={{ background: card.bg }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={card.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={card.icon} />
                                </svg>
                            </div>
                            <h3 className="text-[17px] font-bold text-[#143D2E]">{card.title}</h3>
                            <p className="text-[13.5px] text-[#666] leading-relaxed flex-1">{card.description}</p>
                            <a

                                href={card.href}
                                className="inline-flex items-center gap-1 hover:gap-2 text-[13px] font-bold transition-all duration-150"
                                style={{ color: card.accent }}
                            >
                                View here
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Budget;
