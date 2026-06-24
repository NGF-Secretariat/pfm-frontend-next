import { Box } from "@mui/material";
import StateExpenditurePage from "../../../components/StateDescription";
import StateExpenditurePageTwo from "../../../components/stateGraph";
import budgetService from "../../../service/budgetService";

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
