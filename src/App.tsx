import React from "react";
import "./App.css";
import { DateRangePicker } from "./components/DateRangePicker";

function App() {
  return (
    <div className="App">
      <DateRangePicker
        onChange={(range, weekends) => {
          console.log("Selected range:", range);
          console.log("Weekend dates:", weekends);
        }}
        predefinedRanges={[
          {
            label: "Last 7 days",
            range: [new Date(2023, 8, 1), new Date(2023, 8, 7)],
          },
          {
            label: "Last 30 days",
            range: [new Date(2023, 7, 1), new Date(2023, 7, 30)],
          },
        ]}
      />
    </div>
  );
}

export default App;
