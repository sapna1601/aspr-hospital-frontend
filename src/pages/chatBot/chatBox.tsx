import { Box } from "@material-ui/core";
import React from "react";
import { Text } from "src/common/components";
import {
  BookAppointmentOption,
  ChatStartMessage,
  ChooseOption,
  DoctorsSuggestion,
} from "src/pages/chatBot/chatComponents";
import useChatBot from "src/pages/chatBot/container";

/**
 *
 */
interface IWrapper {
  align: "left" | "right";
  children: React.ReactNode;
}
const Wrapper: React.FC<IWrapper> = ({ children, align }) => {
  return (
    <Box
      className={`rounded my-2 flex p-1 w-[87%] shadow-xl flex-col justify-center items-center ${
        align === "left" ? "float-left" : "float-right"
      }`}
    >
      {children}
    </Box>
  );
};

/**
 *
 * @returns
 */
const ChatBox: React.FC<{}> = () => {
  const { state, setState } = useChatBot();
  return (
    <Box className="h-[500px] shadow-sm  w-[350px] relative bg-white overflow-x-auto p-2 rounded">
      <Wrapper align="left">
        <ChatStartMessage />
      </Wrapper>
      <Wrapper align="left">
        <ChooseOption
          disabledOptions={!!state.selectedOption}
          selectedOption={(option) => {
            setState({ ...state, selectedOption: option });
          }}
        />
      </Wrapper>
      {state.selectedOption && (
        <>
          <Wrapper align="right">
            <Text>
              {state.selectedOption === "appointment"
                ? "Book Appointment"
                : "Doctor Suggestion"}
            </Text>
          </Wrapper>
          <Wrapper align="left">
            {state.selectedOption === "suggestion" ? (
              <DoctorsSuggestion />
            ) : (
              <BookAppointmentOption />
            )}
          </Wrapper>
        </>
      )}
    </Box>
  );
};

export default ChatBox;
