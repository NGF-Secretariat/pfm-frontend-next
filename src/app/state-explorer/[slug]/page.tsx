import { Box } from "@mui/material";
import StateExpenditurePage from "../../../components/StateDescription";
import StateExpenditurePageTwo from "../../../components/stateGraph";
import budgetService from "../../../service/budgetService";

export function generateStaticParams() {
    const states = [
        "abia", "adamawa", "akwa-ibom", "anambra", "bauchi", "bayelsa", "benue", "borno",
        "cross-river", "delta", "ebonyi", "edo", "ekiti", "enugu", "gombe", "imo",
        "jigawa", "kaduna", "kano", "katsina", "kebbi", "kogi", "kwara", "lagos",
        "nasarawa", "niger", "ogun", "ondo", "osun", "oyo", "plateau", "rivers",
        "sokoto", "taraba", "yobe", "zamfara", "fct", "default"
    ];
    return states.map((slug) => ({ slug }));
}

export default async function StateSlug({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let profile = null;
    try {
        const res = await budgetService.getStateProfileBySlug(slug);
        if (res?.data?.success) {
            profile = res.data.data;
        }
    } catch (error) {
        console.error("Failed to fetch state profile on server:", error);
    }

    return (
        <Box>
            <StateExpenditurePage slug={slug} profile={profile} />
            <StateExpenditurePageTwo slug={slug} profile={profile} />
        </Box>
    );
}
