import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser, useSession } from "src/hooks";

type LoginInputState = {
  hospitalId: string;
  password: string;
};

const useLoginContainer = () => {
  const session = useSession();
  const loggedInUser = useLoggedInUser();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<LoginInputState>({
    hospitalId: "",
    password: "",
  });
  const [isPatientLogin, setIsPatientLogin] = useState(false);
  useEffect(() => {
    if (!session.sessionUserLoading && loggedInUser.user?.role === "Admin")
      navigate("/");
    else if (
      !session.sessionUserLoading &&
      !loggedInUser.loading &&
      loggedInUser.user?.role === "Finance"
    )
      navigate("/rfpApproval");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, loggedInUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const property: string = e.target.name;
    const value: string = e.target.value;
    if (!isPatientLogin && property === "hospitalId" && value.startsWith("#")) {
      setIsPatientLogin(true);
    }
    if (isPatientLogin && property === "hospitalId" && !value.startsWith("#")) {
      setIsPatientLogin(false);
    }
    setLoginState({
      ...loginState,
      [property]: value,
    });
  };

  const handleSubmit = () => {
    let id = loginState.hospitalId;
    let password = loginState.password;
    if (isPatientLogin) {
      const patientId = id.substring(1);
      console.log(patientId);
      navigate("/patient-booking-history?id=" + patientId);
      return;
    }

    session
      .login(id, password)
      .then(() => {
        toast.success("Login Successful");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return {
    loginState,
    handleChange,
    handleSubmit,
    isPatientLogin,
  };
};

export default useLoginContainer;
