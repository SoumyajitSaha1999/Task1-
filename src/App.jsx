import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import DataTable from "./Components/DataTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main-div">
        <div className="sub-div">
          <h1>DataGrid Example</h1>
          <DataTable />
        </div>
      </div>
    </>
  );
}

export default App;
