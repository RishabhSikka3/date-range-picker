import React from "react";

interface CalendarProps {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (date: Date, isStart: boolean) => void;
  isWeekend: (date: Date) => boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  startDate,
  endDate,
  onDateChange,
  isWeekend,
}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the weekday index of the 1st day
  const dates = [];

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Push empty cells for the days before the first day of the month
  for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
    dates.push(<div key={`empty-${i}`} className="text-center p-2" />);
  }

  // Push actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isDisabled = isWeekend(date);

    const isSelected =
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime());

    dates.push(
      <button
        key={day}
        disabled={isDisabled}
        onClick={() =>
          onDateChange(date, !startDate || Boolean(startDate && endDate))
        }
        className={`p-2 m-1 text-center w-full rounded-md ${
          isDisabled ? "text-gray-300" : "hover:bg-blue-100"
        } ${isSelected ? "bg-blue-500 text-white" : ""}`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {weekdays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{dates}</div>
    </div>
  );
};
