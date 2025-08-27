import { StepProps } from "../types/FormTypes";
import { Check } from "lucide-react";


const shifts = ["Morning", "Afternoon", "Night"];

export function ShiftPreferenceStep({ formData, handleCheckboxChange, handleChange }: StepProps) {
  // Check if all shifts are selected
  const allSelected = shifts.every(shift => formData.shiftPreferences.includes(shift));

  // Toggle Select All / Deselect All
  const toggleSelectAll = () => {
    if (allSelected) {
      handleChange("shiftPreferences", []); 
    } else {
      handleChange("shiftPreferences", [...shifts]); 
    }
  };

  return (
    <>
      <h2 className="font-[16px] font-semibold text-[#121224]">
        Which shifts are you open to working?
      </h2>

      <div className="flex flex-col gap-4 mt-5">
        {/* Select All / Deselect All button */}
        <button
          type="button"
          onClick={toggleSelectAll}
          className={`inline-flex w-fit px-4 py-2 r font-semibold text-[14px] ${
            allSelected
              ? ""
              : ""
          }`}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        {/* Individual shift options */}
        <div className="flex flex-col gap-3">
          {shifts.map((shift) => {
            const isSelected = formData.shiftPreferences.includes(shift);
            return (
              <label key={shift} className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 ${
                    isSelected ? "border-blue-700 bg-blue-700" : "border-gray-400"
                  }`}
                  onClick={() => handleCheckboxChange("shiftPreferences", shift)}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="text-[14px] font-medium">{shift}</span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}
