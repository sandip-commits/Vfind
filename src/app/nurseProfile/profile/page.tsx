"use client";
import { useEffect, useState } from "react";
import { parseValues } from "../utils/profileHelpers";
import Loading from "../../../../components/loading";
import Image from "next/image";
import {
  MapPin,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  Info,
  HelpCircle,
  FileText,
  Lock,
  Briefcase,
  Shield,
  Edit,
  Check,
  X,
} from "lucide-react";

interface ProfileImage {
  url: string;
}

interface NurseProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  qualification: string;
  otherQualification?: string;
  experience: string;
  workingInHealthcare: string;
  jobTypes: string[] | string;
  openToOtherTypes?: string;
  startDate: string;
  startTime: string;
  jobSearchStatus: string;
  preferredLocations: string[];
  shiftPreferences: string[] | string;
  licenses?: string[] | string;
  certifications?: string[] | string;
  education?: string[] | string;
  residencyStatus?: string;
  visaType?: string;
  visaDuration?: string;
  maxWorkHours?: string;
  workHoursRestricted?: string;
  postcode?: string;
  organisation?: string;
  currentResidentialLocation?: string;
  profileImage?: ProfileImage | null;
}

interface EditableFieldProps {
  field: keyof NurseProfile;
  value: string | undefined;
  placeholder?: string;
  multiline?: boolean;
  onSave: (field: keyof NurseProfile, value: string) => void;
  disabled?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  field,
  value,
  placeholder = "Not specified",
  multiline = false,
  onSave,
  disabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const handleSave = () => {
    onSave(field, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value || "");
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 group">
        <span className="flex-1">{value || placeholder}</span>
        {!disabled && (
          <Edit
            className="w-3 h- text-blue-600 cursor-pointer "
            onClick={() => {
              setTempValue(value || "");
              setIsEditing(true);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {multiline ? (
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              handleSave();
            }
            if (e.key === "Escape") {
              handleCancel();
            }
          }}
          className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm resize-none"
          rows={2}
          autoFocus
        />
      ) : (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
            if (e.key === "Escape") {
              handleCancel();
            }
          }}
          className="flex-1 px-2 py-1 border border-blue-300 rounded text-sm"
          autoFocus
        />
      )}
      <Check
        className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-700"
        onClick={handleSave}
      />
      <X
        className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-700"
        onClick={handleCancel}
      />
    </div>
  );
};

interface EditableArrayFieldProps {
  field: keyof NurseProfile;
  values: string[];
  placeholder?: string;
  onSave: (field: keyof NurseProfile, values: string[]) => void;
}

const EditableArrayField: React.FC<EditableArrayFieldProps> = ({
  field,
  values,
  placeholder = "None specified",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValues, setTempValues] = useState(values.join('\n'));

  const handleSave = () => {
    const newValues = tempValues.split('\n').filter(v => v.trim());
    onSave(field, newValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValues(values.join('\n'));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        {values.length > 0 ? (
          <div className="space-y-2 group">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
              >
                {value}
              </div>
            ))}
            <div className="flex justify-end">
              <Edit
                className="w-3 h-3 text-blue-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setTempValues(values.join('\n'));
                  setIsEditing(true);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between group">
            <div className="text-gray-400 text-sm italic">{placeholder}</div>
            <Edit
              className="w-3 h-3 text-blue-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                setTempValues("");
                setIsEditing(true);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <textarea
        value={tempValues}
        onChange={(e) => setTempValues(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            handleSave();
          }
          if (e.key === "Escape") {
            handleCancel();
          }
        }}
        className="w-full px-3 py-2 border border-blue-300 rounded text-sm resize-none"
        rows={Math.max(3, tempValues.split('\n').length)}
        placeholder="Enter each item on a new line"
        autoFocus
      />
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>Press Ctrl+Enter to save, Escape to cancel</span>
        <Check
          className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-700"
          onClick={handleSave}
        />
        <X
          className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-700"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default function NurseProfilePage() {
  const [profile, setProfile] = useState<NurseProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://x8ki-letl-twmt.n7.xano.io/api:MeLrTB-C/get_nurse_profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFieldSave = async (field: keyof NurseProfile, newValue: string | string[]) => {
    if (!profile) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const updatedProfile = { ...profile, [field]: newValue };

      const res = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:MeLrTB-C/edit_nurse_profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update profile: ${res.status} ${errorText}`);
      }

      const updatedData = await res.json();
      setProfile(updatedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Failed to update profile");
    }
  };

  const handleStringFieldSave = (field: keyof NurseProfile, value: string) => {
    handleFieldSave(field, value);
  };

  const handleArrayFieldSave = (field: keyof NurseProfile, values: string[]) => {
    handleFieldSave(field, values);
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
      {error}
    </div>
  );
  if (!profile) return (
    <div className="flex justify-center items-center h-screen text-gray-600">
      No profile data found
    </div>
  );

  const renderArray = (value: string[] | string | undefined) =>
    parseValues(value) || [];

  const preferredLocationsArray = renderArray(profile.preferredLocations);
  const jobTypesArray = renderArray(profile.jobTypes);
  const shiftPreferencesArray = renderArray(profile.shiftPreferences);
  const certificationsArray = renderArray(profile.certifications);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Row: Profile Info */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Profile Image */}

          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
              {profile.profileImage?.url ? (
                <Image
                  src={profile.profileImage.url}
                  alt={profile.fullName}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
                  {profile.fullName?.charAt(0) || "N"}
                </div>
              )}
            </div>

            {/* Edit Button Below */}
            <label className="mt-2 bg-blue-600 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-blue-700">
              Edit
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  const file = e.target.files[0];

                  const formData = new FormData();
                  formData.append("profileImage", file); // send image as file

                  // append other profile fields (if endpoint requires full profile)
                  Object.entries(profile).forEach(([key, value]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (key !== "profileImage") formData.append(key, value as any);
                  });

                  const token = localStorage.getItem("token");
                  try {
                    const res = await fetch(
                      "https://x8ki-letl-twmt.n7.xano.io/api:MeLrTB-C/edit_nurse_profile",
                      {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                        body: formData,
                      }
                    );

                    if (!res.ok) throw new Error("Failed to update profile image");
                    const updatedData = await res.json();
                    setProfile(updatedData); // profileImage.url will update automatically
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (err: any) {
                    alert(err.message || "Error uploading image");
                  }
                }}
              />
            </label>
          </div>



          {/* Profile Info */}
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl  w-fit font-bold text-gray-900">
              <EditableField             
                field="fullName"
                value={profile.fullName}
                placeholder="Full Name"
                onSave={handleStringFieldSave}
                
              />
            </h1>
            <p className="text-gray-500 text-sm">
              Profile last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-700" />
                <EditableField
                  field="currentResidentialLocation"
                  value={profile.currentResidentialLocation}
                  placeholder="Location not specified"
                  onSave={handleStringFieldSave}
                />
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <EditableField
                  field="qualification"
                  value={profile.qualification}
                  placeholder="Qualification not specified"
                  onSave={handleStringFieldSave}
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-700" />
                <EditableField
                  field="phoneNumber"
                  value={profile.phoneNumber}
                  placeholder="Phone Number"
                  onSave={handleStringFieldSave}
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700" />
                <EditableField
                  field="email"
                  value={profile.email}
                  placeholder="Email"
                  onSave={handleStringFieldSave}
                  disabled={true}
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                Available: <EditableField
                  field="startDate"
                  value={profile.startDate || profile.startTime}
                  placeholder="Not specified"
                  onSave={handleStringFieldSave}
                />
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-700" />
                Status: <EditableField
                  field="jobSearchStatus"
                  value={profile.jobSearchStatus}
                  placeholder="Active"
                  onSave={handleStringFieldSave}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 2-Column Grid Below Header */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Quick links</h3>
            <div className="space-y-3">
              <button className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 text-sm w-full text-left">
                <HelpCircle className="w-4 h-4 text-blue-700" />
                <span>Need support?</span>
              </button>
              
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Data management</h3>
            <div className="space-y-3">
              <button className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 text-sm w-full text-left">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>View Terms of Use</span>
              </button>
              <button className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 text-sm w-full text-left">
                <Lock className="w-4 h-4 text-blue-700" />
                <span>View Privacy Policy</span>
              </button>
            </div>
          </div>

          {/* Visa & Residency Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="font-medium text-gray-900">Visa & Residency</h3>
              <Shield className="w-4 h-4 text-blue-700" />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Status:</span>
                <span className="ml-2 font-medium">
                  <EditableField
                    field="residencyStatus"
                    value={profile.residencyStatus}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </span>
              </div>
              <div>
                <span className="text-gray-500">Visa Type:</span>
                <span className="ml-2 font-medium">
                  <EditableField
                    field="visaType"
                    value={profile.visaType}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </span>
              </div>
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-2 font-medium">
                  <EditableField
                    field="visaDuration"
                    value={profile.visaDuration}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Job Search Preferences */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Job search preferences
              </h2>
            </div>

            {/* Preferred Locations */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Preferred work locations
              </h3>
              <EditableArrayField
                field="preferredLocations"
                values={preferredLocationsArray}
                placeholder="No preferred locations specified"
                onSave={handleArrayFieldSave}
              />
            </div>

            {/* Job Types */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Preferred job types</h3>
              <EditableArrayField
                field="jobTypes"
                values={jobTypesArray}
                placeholder="No job types specified"
                onSave={handleArrayFieldSave}
              />
              <div className="mt-2 text-sm text-gray-600">
                <strong>Open to other types:</strong>
                <EditableField
                  field="openToOtherTypes"
                  value={profile.openToOtherTypes}
                  placeholder="Not specified"
                  onSave={handleStringFieldSave}
                />
              </div>
            </div>

            {/* Shift Preferences */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Shift preferences</h3>
              <EditableArrayField
                field="shiftPreferences"
                values={shiftPreferencesArray}
                placeholder="No shift preferences specified"
                onSave={handleArrayFieldSave}
              />
            </div>

            {/* Available to start */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Available to start</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <EditableField
                    field="startTime"
                    value={profile.startDate || profile.startTime}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications & Certifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Qualifications & Certifications</h2>
              <Info className="w-4 h-4 text-blue-700" />
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Education</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <EditableField
                    field="qualification"
                    value={profile.qualification}
                    onSave={handleStringFieldSave}
                  />
                </div>
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <EditableField
                    field="otherQualification"
                    value={profile.otherQualification}
                    placeholder="Other Qualification"
                    onSave={handleStringFieldSave}
                  />
                </div>
              
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
              <EditableArrayField
                field="certifications"
                values={certificationsArray}
                placeholder="No certifications specified"
                onSave={handleArrayFieldSave}
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Work experience</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">
                    Healthcare Experience
                  </div>
                  <div className="text-sm text-gray-600 mt-1 flex">
                    <EditableField
                      field="experience"
                      value={profile.experience}
                      onSave={handleStringFieldSave}
                    /> | Currently working in healthcare: <EditableField
                      field="workingInHealthcare"
                      value={profile.workingInHealthcare}
                      onSave={handleStringFieldSave}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">
                    Organization Name
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <EditableField
                      field="organisation"
                      value={profile.organisation}
                      placeholder="Not specified"
                      onSave={handleStringFieldSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Preferences */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-lg font-medium text-gray-900">Work preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-1">
                  Maximum work hours
                </div>
                <div className="text-sm text-gray-600">
                  <EditableField
                    field="maxWorkHours"
                    value={profile.maxWorkHours}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-sm text-gray-900 mb-1">
                  Work hours restricted
                </div>
                <div className="text-sm text-gray-600">
                  <EditableField
                    field="workHoursRestricted"
                    value={profile.workHoursRestricted}
                    placeholder="Not specified"
                    onSave={handleStringFieldSave}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ---end--- */}
        </div>
      </div>
    </div>
  );
}