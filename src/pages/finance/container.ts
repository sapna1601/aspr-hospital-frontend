import { useCallback, useEffect } from "react";
import { useApi } from "src/hooks";
import { ApiMethods } from "src/model";

const useFinanceContainer = () => {
  const [fetchPendingApprovals, fetchPendingApprovalsState] =
    useApi<Array<any>>();
  const [updateRfp, updateRfpState] = useApi();

  useEffect(() => {
    fetchPendingApprovals("/rfp/Pending", ApiMethods.GET);
  }, []);
  const handleAction = useCallback(
    (rfpId: string, action: "Approved" | "Rejected") => {
      updateRfp(`/rfp/action/${rfpId}/${action}`, ApiMethods.POST).then(() => {
        window.location.reload();
      });
    },
    []
  );
  return {
    fetchPendingApprovalsState,
    handleAction,
    updateRfpState,
  };
};

export default useFinanceContainer;
