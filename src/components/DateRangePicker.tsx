import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "./Calendar";
import { DatePickerControls } from "./DatePickerControls";
import { PredefinedRanges } from "./PredefinedRanges";

interface DateRangePickerProps {
  onChange: (range: [Date | null, Date | null], weekends: Date[]) => void;
  predefinedRanges?: { label: string; range: [Date, Date] }[];
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  predefinedRanges,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [showCalendarFor, setShowCalendarFor] = useState<
    "start" | "end" | null
  >(null); // Track which input is focused

  const calendarRef = useRef<HTMLDivElement>(null); // Ref to detect outside click

  // Close the calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendarFor(null); // Hide calendar when clicked outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateChange = (date: Date, isStart: boolean) => {
    if (isWeekend(date)) {
      alert("Weekends cannot be selected.");
      return;
    }

    if (isStart) {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(null);
      }
    } else {
      if (startDate && date < startDate) {
        alert("End date must be after the start date.");
        return;
      }
      setEndDate(date);
    }

    setShowCalendarFor(null); // Close calendar after selecting date

    if (startDate && endDate) {
      handleRangeChange(startDate, endDate);
    }
  };

  const handleRangeChange = (start: Date, end: Date) => {
    const weekends: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      if (isWeekend(current)) {
        weekends.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    onChange([start, end], weekends);
  };

  const handlePredefinedRange = (range: [Date, Date]) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
    handleRangeChange(range[0], range[1]);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Start Date"
            value={startDate ? startDate.toDateString() : ""}
            readOnly
            onClick={() => setShowCalendarFor("start")} // Show calendar for start date
          />
          <span className="absolute right-3 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          {showCalendarFor === "start" && (
            <div
              ref={calendarRef}
              className="absolute z-10 bg-white shadow-lg border rounded-lg mt-2 p-4 w-80"
            >
              <DatePickerControls
                year={year}
                month={month}
                onYearChange={setYear}
                onMonthChange={setMonth}
              />
              <Calendar
                year={year}
                month={month}
                startDate={startDate}
                endDate={endDate}
                onDateChange={(date) => handleDateChange(date, true)} // Handle start date
                isWeekend={isWeekend}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="End Date"
            value={endDate ? endDate.toDateString() : ""}
            readOnly
            onClick={() => setShowCalendarFor("end")} // Show calendar for end date
          />
          <span className="absolute right-3 top-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          {showCalendarFor === "end" && (
            <div
              ref={calendarRef}
              className="absolute z-10 bg-white shadow-lg border rounded-md mt-2"
            >
              <DatePickerControls
                year={year}
                month={month}
                onYearChange={setYear}
                onMonthChange={setMonth}
              />
              <Calendar
                year={year}
                month={month}
                startDate={startDate}
                endDate={endDate}
                onDateChange={(date) => handleDateChange(date, false)} // Handle end date
                isWeekend={isWeekend}
              />
            </div>
          )}
        </div>
      </div>

      {predefinedRanges && (
        <PredefinedRanges
          predefinedRanges={predefinedRanges}
          onSelectRange={handlePredefinedRange}
        />
      )}
    </div>
  );
};
