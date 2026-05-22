import { Suspense } from "react";
import GroupExplorer from "../../modules/group-explorer";

export default function GroupExplorerPage() {
  return (
    <Suspense fallback={null}>
      <GroupExplorer />
    </Suspense>
  );
}
