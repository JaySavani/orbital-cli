import { Suspense } from "react";
import DeviceApprovalContent from "./DeviceApprovalContent";
import { Spinner } from "@/components/ui/spinner";

export default function DeviceApprovalPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner />
        </div>
      }
    >
      <DeviceApprovalContent />
    </Suspense>
  );
}
