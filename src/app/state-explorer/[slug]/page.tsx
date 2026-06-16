import { Box } from "@mui/material";
import StateExpenditurePage from "../../../components/StateDescription";
import StateExpenditurePageTwo from "../../../components/stateGraph";

export default async function StateSlug({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <Box>
            <StateExpenditurePage slug={slug} />
            <StateExpenditurePageTwo slug={slug} />
        </Box>
    );
}
