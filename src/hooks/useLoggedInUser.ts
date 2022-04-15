import { useEffect, useState } from "react";
import { ApiMethods, LoggedInUser } from "src/model";
import useApi from "./useApi";
import { useSession } from "src/hooks";

const useLoggedInUser = () => {
  const [loggedInUserAtom, setLoggedInUserAtom] = useState<LoggedInUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchLoggedInUser, fetchLoggedInUserState] = useApi<LoggedInUser>();
  const session = useSession();
  const { user } = session;
  useEffect(() => {
    if (user?.uid) {
      fetchLoggedInUser(
        `/authUser/loggedInUser?uid=${user?.uid}`,
        ApiMethods.GET
      ).finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!fetchLoggedInUserState.loading && fetchLoggedInUserState.data) {
      setLoggedInUserAtom(fetchLoggedInUserState.data);
    }
  }, [fetchLoggedInUserState]);
  return {
    user: loggedInUserAtom,
    loading,
  };
};

export default useLoggedInUser;
