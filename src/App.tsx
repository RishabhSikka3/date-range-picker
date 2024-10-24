import React from "react";
import "./App.css";
import { DateRangePicker } from "./components/DateRangePicker";

function App() {
  function calculateDateBefore(days: number): Date {
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - days
    );
  }

  const predefinedRanges = [
    {
      label: "Last 7 days",
      range: [calculateDateBefore(7), new Date()],
    },
    {
      label: "Last 30 days",
      range: [calculateDateBefore(30), new Date()],
    },
  ];

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
            range: [calculateDateBefore(7), new Date()],
          },
          {
            label: "Last 30 days",
            range: [calculateDateBefore(30), new Date()],
          },
        ]}
      />
    </div>
  );
}

export default App;
