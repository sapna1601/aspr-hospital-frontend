import { useState } from "react";

const useChatBot = () => {
  const [state, setState] = useState({
    selectedOption: "",
  });

  return { state, setState };
};

export default useChatBot;
