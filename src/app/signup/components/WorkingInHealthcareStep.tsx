import { StepProps } from "../types/FormTypes";
import organisationListJson from "./json/organisationList.json";
import { useState } from "react";
import { Check } from "lucide-react";

interface Organisation {
  name: string;
}

const organisationList: Organisation[] = organisationListJson as Organisation[];

export function WorkingInHealthcareStep({ formData, handleChange }: StepProps) {
  const [query, setQuery] = useState(formData.organisation || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredList = organisationList.filter((org) =>
    org.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (name: string) => {
    setQuery(name);
    handleChange("organisation", name);
    setShowSuggestions(false);
  };

  const clearOrganisation = () => {
    setQuery("");
    handleChange("organisation", "");
  };

  const yesNoOptions = ["Yes", "No"];
  const experienceOptions = [
    "Less than 6 months",
    "6 months – 1 year",
    "1–3 years",
    "3 - 5 years",
    "Over 5 years",
  ];

  return (
    <>
      <h2 className="font-[16px] font-semibold text-[#121224]">
        Are you currently working in the healthcare field in Australia?
      </h2>

      <div className="flex flex-col gap-3  mt-5 w-fit">
        {yesNoOptions.map((opt) => {
          const isSelected = formData.workingInHealthcare === opt;
          return (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-5 h-5 flex items-center justify-center border-2 ${
                  isSelected ? "border-blue-700 bg-blue-700" : "border-gray-400"
                }`}
                onClick={() => handleChange("workingInHealthcare", opt)}
              >
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-[14px] font-medium">{opt}</span>
            </label>
          );
        })}
      </div>

      {formData.workingInHealthcare === "Yes" && (
        <>
          <h2 className="mt-4 font-[16px] font-semibold text-[#121224]">
            How long have you been working in your current/most recent role?
          </h2>
          <div className="flex flex-col gap-3 mt-5 w-fit">
            {experienceOptions.map((opt) => {
              const isSelected = formData.experience === opt;
              return (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-5 h-5 flex items-center justify-center border-2 ${
                      isSelected ? "border-blue-700 bg-blue-700" : "border-gray-400"
                    }`}
                    onClick={() => handleChange("experience", opt)}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-[14px] font-medium">{opt}</span>
                </label>
              );
            })}
          </div>

          {/* Organisation Combo Box */}
          <div className="relative mt-5 w-full max-w-md">
            <h3 className="font-medium mb-2">Name of Organisation</h3>

            {formData.organisation === "" && (
              <p className="text-red-500 text-sm mt-1">
                Please enter or select an organisation.
              </p>
            )}

            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleChange("organisation", e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={(e) => {
                  if (!e.relatedTarget || !e.relatedTarget.closest(".suggestions-dropdown")) {
                    setTimeout(() => setShowSuggestions(false), 1);
                  }
                }}
                placeholder="Type or select an organisation"
                className="w-full border rounded p-2"
              />

              {showSuggestions && filteredList.length > 0 && (
                <ul className="suggestions-dropdown absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow">
                  {filteredList.map((org, index) => (
                    <li
                      key={`${org.name}-${index}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(org.name)}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {org.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {formData.organisation && (
              <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mt-3 w-fit">
                {formData.organisation}
                <button
                  type="button"
                  onClick={clearOrganisation}
                  className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
