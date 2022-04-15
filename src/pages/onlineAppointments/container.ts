import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useApi } from "src/hooks";
import { ApiMethods, Booking } from "src/model";

const useOnlineBookings = () => {
  const [fetchAllBookings, bookingState] = useApi();
  const [registerPatient] = useApi();
  const [selectRecord, setSelectRecord] = useState<any>(null);
  const [deleteRecordApi] = useApi();
  const [openModal, setOpenModal] = useState(false);
  const [bookAppointment] = useApi();
  useEffect(() => {
    fetchAllBookings("/hospital/online-booking-requests", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelectRecord = (record: any) => {
    setSelectRecord(record);
    setOpenModal(true);
  };
  const deleteRecord = async (id: string, status: string) => {
    toast
      .promise(
        deleteRecordApi(
          `/hospital/online-book-request/${id}/${status}/${selectRecord.phoneNumber}`,
          ApiMethods.DELETE,
          {}
        ),
        {
          loading: "Deleting record",
          success: "Record deleted successfully",
          error: "Error deleting record",
        }
      )
      .then(() => {
        window.location.reload();
      });
  };

  const handleBookAppointment = async (booking: Booking) => {
    toast
      .promise(
        bookAppointment(
          "/ipd-opd/patient/book-appointment",
          ApiMethods.POST,
          booking
        ),
        {
          loading: "Booking...",
          success: "Done",
          error: "Error",
        }
      )
      .then(() => {
        deleteRecord(selectRecord.id, "Accepted");
        setOpenModal(false);
      });
  };

  const handleAction = (type: "Accept" | "Reject") => {
    if (type === "Accept") {
      if (selectRecord.patientId) {
        const payload: Booking = {
          patientId: selectRecord.patientId,
          doctorId: selectRecord.doctorId,
          amount: 0,
          dateAndTime: new Date(selectRecord.dateAndTime).getTime().toString(),
          paid: false,
          patientName: `${selectRecord.firstName} ${selectRecord.lastName}`,
          treatmentType: selectRecord.treatmentType,
          wardType: selectRecord.wardType,
          isOnlineBooking: true,
          phoneNumber: selectRecord.phoneNumber,
        };
        handleBookAppointment(payload);
      } else {
        toast
          .promise(
            registerPatient("/ipd-opd/patient", ApiMethods.POST, {
              firstName: selectRecord.firstName,
              lastName: selectRecord.lastName,
              phoneNumber: selectRecord.phoneNumber,
              age: selectRecord.age,
            }),
            {
              loading: "Registering Patient",
              success: "Done",
              error: "Error!!!",
            }
          )
          .then((res) => {
            const payload: Booking = {
              patientId: String(res.data),
              doctorId: selectRecord.doctorId,
              amount: 0,
              dateAndTime: new Date(selectRecord.dateAndTime)
                .getTime()
                .toString(),
              paid: false,
              patientName: `${selectRecord.firstName} ${selectRecord.lastName}`,
              treatmentType: selectRecord.treatmentType,
              wardType: selectRecord.wardType,
              isOnlineBooking: true,
              phoneNumber: selectRecord.phoneNumber,
            };
            handleBookAppointment(payload);
          });
      }
    } else {
      deleteRecord(selectRecord.id, "Rejected");
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    setSelectRecord(null);
  };

  return {
    bookingState,
    selectRecord,
    setSelectRecord,
    openModal,
    handleModalClose,
    handleSelectRecord,
    handleAction,
  };
};

export default useOnlineBookings;
