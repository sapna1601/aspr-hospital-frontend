import { Avatar, Box, Divider } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { HeaderAndDrawer, Modal, Text } from "src/common/components";
import { useApi } from "src/hooks";
import { ApiMethods, Doctor } from "src/model";
interface IProps {}

const About: React.FC<IProps> = () => {
  const [fetchDoctors, { data }] = useApi<Array<Doctor>>();
  const [openModal, setOpenModal] = useState(false);
  const [doctor, setDoctor] = useState<Doctor>();
  useEffect(() => {
    fetchDoctors("/hospital/doctors", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _handleDoctorProfileClick = useCallback(
    (id) => {
      setOpenModal(true);
      const filterDoctor = data.find((doctor) => doctor.id === id);
      setDoctor(filterDoctor);
    },
    [data]
  );
  return (
    <>
      <HeaderAndDrawer />
      <Box className="w-full min-h-screen h-auto flex-col flex justify-center items-center">
        <Text variant="h1">ASPR Hospital</Text>
        <Divider light className="w-96" style={{ margin: "10px 0" }} />
        <Box className="mt-15 flex-wrap flex w-full justify-center items-center h-auto">
          {data?.length &&
            data.map((item) => (
              <Box
                onClick={() => _handleDoctorProfileClick(item.id)}
                className="p-5 mt-5 flex flex-col mx-10 justify-center w-60 items-center relative cursor-pointer"
              >
                <Box className="w-32 h-32 absolute blur-[100px] z-0 bg-primary"></Box>
                <Avatar
                  style={{ height: "100px", width: "100px" }}
                  alt="Remy Sharp"
                  src={item.profilePic}
                />
                <Text variant="subtitle1">{`${item.honorific}. ${item.fullName}`}</Text>
                <Text variant="caption">{item.expertise.join(", ")}</Text>
              </Box>
            ))}
        </Box>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="w-[500px] h-[500px] bg-white flex justify-center items-center flex-col p-4">
          <Box className="p-5 mt-5 flex flex-col mx-10 justify-center w-60 items-center relative">
            <Box className="w-32 h-32 absolute blur-[100px] z-0 bg-primary"></Box>
            <Avatar
              style={{ height: "250px", width: "250px" }}
              alt="Remy Sharp"
              src={doctor?.profilePic}
            />
            <Text variant="subtitle1">{`${doctor?.honorific}. ${doctor?.fullName}`}</Text>
            <Text variant="caption">{doctor?.expertise.join(", ")}</Text>
          </Box>
          <Text variant="caption">
            A doctor is involved in performing several practices such as
            examining, diagnosing and identifying various diseases, disorders,
            and illnesses to provide accurate treatment. A doctor job comes with
            the responsibility of prescribing medicines and providing
            therapeutic and surgical care to patients.
          </Text>
        </Box>
      </Modal>
    </>
  );
};

export default About;
