"use client";

import { useEffect, useMemo, useState } from "react";
import budgetService from "../../service/budgetService";
import { Loader2 } from "lucide-react";

interface StateProfile {
    id: number;
    name: string;
    profile: {
        slug: string;
        updatedAt: string;
    } | null;
}

const formatStateName = (name: string) => {
    if (!name) return "";
    const lower = name.toLowerCase();
    if (lower === "fct") return "FCT Abuja";
    const titleCase = lower.charAt(0).toUpperCase() + lower.slice(1);
    return titleCase.endsWith("state") ? titleCase : `${titleCase} State`;
};

const TotalExpenditureByState = () => {
    const [states, setStates] = useState<StateProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchStates() {
            try {
                const res = await budgetService.getAllStateProfiles();
                if (isMounted && res?.data?.success) {
                    setStates(res.data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch state profiles:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchStates();
        return () => { isMounted = false; };
    }, []);

    // Memoize the mapped cards to avoid recalculating formatStateName on every re-render
    const renderedCards = useMemo(() => {
        return states.map((state) => {
            const formattedName = formatStateName(state.name);
            const slug = state.profile?.slug || state.name.toLowerCase().replace(/\s+/g, '-');
            const href = `/state-explorer/${slug}`;

            return (
                <div
                    key={state.id}
                    className="bg-[#ebebeb] rounded-lg border border-[#d6d6d6] shadow-sm flex flex-col overflow-hidden"
                >
                    <div className="px-6 pt-6 pb-4 flex-1">
                        <h2 className="text-[17px] font-bold text-[#1a1a1a] mb-4">
                            {formattedName}
                        </h2>
                        <a
                            href={href}
                            className="text-[12px] font-semibold tracking-widest text-[#1D9E75] hover:text-[#0f6e56] uppercase transition-colors"
                        >
                            Explore Data
                        </a>
                    </div>
                    <div className="mx-6 border-t-2 border-[#1D9E75]" />
                    <div className="px-6 py-3">
                        <p className="text-[12px] text-[#555] flex items-center whitespace-nowrap">
                            <span>Last Updated</span>
                            <span className="mx-2 text-[#999]">-</span>
                            <span className="truncate">
                                June 28, 2023
                            </span>
                        </p>
                    </div>
                </div>
            );
        });
    }, [states]);

    return (
        <div className="min-h-screen bg-white px-8 py-10">
            <h1 className="text-[28px] font-normal text-[#1a1a1a] mb-10">
                Total Expenditure by State
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading state profiles...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {renderedCards}
                </div>
            )}
        </div>
    );
};

export default TotalExpenditureByState;