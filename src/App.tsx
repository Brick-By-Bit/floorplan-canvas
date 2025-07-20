// App.tsx
import React, { useState } from "react";
import CanvasEditor from "./components/CanvasEditor";
import Toolbar from "./components/Toolbar";

export type Tool = "line" | "rect";

function App() {
  const [tool, setTool] = useState<Tool>("rect");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [clearTrigger, setClearTrigger] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" onChange={handleUpload} />
      <Toolbar setTool={setTool} triggerClear={() => setClearTrigger(true)} />
      <CanvasEditor
        tool={tool}
        imageUrl={imageUrl}
        clearTrigger={clearTrigger}
        onClearHandled={() => setClearTrigger(false)}
      />
    </div>
  );
}

export default App;
