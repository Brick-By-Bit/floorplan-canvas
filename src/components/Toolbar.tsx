import React from "react";
import type { Tool } from "../App";

interface Props {
  setTool: (tool: Tool) => void;
  triggerClear: () => void;
}

const Toolbar: React.FC<Props> = ({ setTool, triggerClear }) => {
  return (
    <div style={{ margin: "10px 0" }}>
      <button onClick={() => setTool("rect")}>Rectangle</button>
      <button onClick={() => setTool("line")}>Line</button>
      <button onClick={triggerClear}>Clear</button>
    </div>
  );
};

export default Toolbar;
