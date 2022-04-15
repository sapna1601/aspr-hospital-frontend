import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { ChatBubble } from "@material-ui/icons";
import ChatBox from "src/pages/chatBot/chatBox";

const ChatBot: React.FC<{}> = () => {
  const [toggleChat, setToggleChat] = useState(false);

  return (
    <Box className="fixed bottom-0 right-0 m-16 flex justify-end flex-col items-end z-10 ">
      {toggleChat && <ChatBox />}
      <Box className="relative">
        {!toggleChat && (
          <span className="absolute right-0 -top-1 w-5 h-5 bg-red-600 rounded-full text-center leading-3 text-white">
            1
          </span>
        )}
        <ChatBubble
          onClick={() => setToggleChat((prev) => !prev)}
          fontSize="large"
          style={{ fontSize: "80px" }}
          className="text-primary cursor-pointer"
        />
      </Box>
    </Box>
  );
};
export default ChatBot;
