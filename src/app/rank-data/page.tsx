import { Suspense } from "react";
import GroupExplorer from "../../modules/group-explorer";

export default function RankDataPage() {
  return (
    <Suspense fallback={null}>
      <GroupExplorer isRank={true} />
    </Suspense>
  );
}
