import { StepProps } from "../types/FormTypes";
import { Check } from "lucide-react";

export function QualificationStep({ formData, handleChange }: StepProps) {
    const options = [
        "Clinical Lead / Manager",
        "Registered Nurse (RN)",
        "Enrolled Nurse (EN)",
        "Assistant in Nursing (AIN)",
        "Other",
    ];

    return (
        <>
            <h2 className="font-[16px] font-semibold text-[#121224]">
                What is your current nursing qualification?
            </h2>

            <div className="flex flex-col gap-3 mt-5 w-fit">
                {options.map((opt) => {
                    const isSelected = formData.qualification === opt;
                    return (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                            <div
                                className={`w-5 h-5 flex items-center justify-center border-2 ${
                                    isSelected ? "border-blue-700 bg-blue-700" : "border-gray-400"
                                }`}
                                onClick={() => handleChange("qualification", opt)}
                            >
                                {isSelected && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className="text-[14px] font-medium">{opt}</span>
                        </label>
                    );
                })}
            </div>

            {formData.qualification === "Other" && (
                <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.otherQualification}
                    onChange={(e) => handleChange("otherQualification", e.target.value)}
                    className="mt-3 w-full border rounded p-2"
                />
            )}
        </>
    );
}
