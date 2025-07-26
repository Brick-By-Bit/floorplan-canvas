// App.tsx
import React, { useState } from "react";
import CanvasEditor from "./components/CanvasEditor";
import Toolbar from "./components/Toolbar";
import TailwindTest from "./components/TailwindTest";

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
    <div className="p-5 bg-gray-50 min-h-screen">
      <TailwindTest />
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <input 
          type="file" 
          onChange={handleUpload}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600"
        />
        <Toolbar setTool={setTool} triggerClear={() => setClearTrigger(true)} />
      </div>
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
