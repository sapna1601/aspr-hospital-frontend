import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useApi } from "src/hooks";
import { ApiMethods, Patient } from "src/model";

const useOt = () => {
  const [openModal, setOpaModal] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [fetchPatientByPhoneNumber] = useApi<Patient>();
  const [fetchOtPatients, fetchOtPatientsState] = useApi();

  useEffect(() => {
    fetchOtPatients("/ot/patient-list", ApiMethods.GET);
  }, []);
  const handleGetPatientByPhoneNumber = useCallback((phone: string) => {
    toast
      .promise(
        fetchPatientByPhoneNumber(`/ipd-opd/patient/${phone}`, ApiMethods.GET),
        {
          loading: "Fetching Patient",
          success: "Done",
          error: "Error Fetching Patient",
        }
      )
      .then((res) => {
        if (res.data) {
          setPatient(res.data);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    openModal,
    setOpaModal,
    handleGetPatientByPhoneNumber,
    patient,
    fetchOtPatientsState,
  };
};

export default useOt;
