import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "src/common/components";
import { useLoggedInUser, useSession } from "src/hooks";
import { UserRoles } from "src/model";

interface IProps {
  children: JSX.Element;
  authorization: UserRoles[];
}
const ProtectiveRoutes: React.FC<IProps> = ({
  children,
  authorization,
  ...props
}) => {
  const { user: authUser, sessionUserLoading: authLoading } = useSession();
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  useEffect(() => {
    if (!authLoading && !authUser) {
      navigate("/login");
    }
    if (loggedInUser.user) {
      if (!authorization.includes(loggedInUser.user.role)) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, authLoading, loggedInUser]);
  return (
    <>
      {authLoading || loggedInUser.loading ? (
        <Loader message="Loading..." />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectiveRoutes;
