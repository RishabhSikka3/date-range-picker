import React from "react";

interface DatePickerControlsProps {
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export const DatePickerControls: React.FC<DatePickerControlsProps> = ({
  year,
  month,
  onYearChange,
  onMonthChange,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - 50 + i
  ); // Generate 100 years

  return (
    <div className="flex items-center justify-between p-2 space-x-4">
      <select
        className="border rounded px-2 py-1"
        value={month}
        onChange={(e) => onMonthChange(parseInt(e.target.value))}
      >
        {monthNames.map((monthName, index) => (
          <option key={index} value={index}>
            {monthName}
          </option>
        ))}
      </select>

      <select
        className="border rounded px-2 py-1"
        value={year}
        onChange={(e) => onYearChange(parseInt(e.target.value))}
      >
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>
    </div>
  );
};
