import React from "react";

interface PredefinedRangesProps {
  predefinedRanges: { label: string; range: [Date, Date] }[];
  onSelectRange: (range: [Date, Date]) => void;
}

export const PredefinedRanges: React.FC<PredefinedRangesProps> = ({
  predefinedRanges,
  onSelectRange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {predefinedRanges.map((predefined) => (
        <button
          key={predefined.label}
          onClick={() => onSelectRange(predefined.range)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {predefined.label}
        </button>
      ))}
    </div>
  );
};
