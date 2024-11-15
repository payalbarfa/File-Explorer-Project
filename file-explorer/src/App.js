import React from "react";
import Folder from "./components/fileExplorer";
import { useSelector } from "react-redux";
import "./App.css";
function App() {
  const explorerData = useSelector((state) => state.explorer.explorerData);

  return (
    <div className="App">
      <Folder explorer={explorerData} />

    </div>
  );
}

export default App;
