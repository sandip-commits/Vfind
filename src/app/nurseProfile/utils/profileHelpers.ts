// Helper: Parse comma-separated values into an array
export const parseValues = (value: string | string[] | undefined): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((v) => {
      if (typeof v === "string") {
        // Remove brackets and quotes, then split by comma
        const cleanString = v.replace(/[\[\]"]/g, "").trim();
        return cleanString
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
      }
      return [];
    });
  }
  if (typeof value === "string") {
    // Remove brackets and quotes, then split by comma
    const cleanString = value.replace(/[\[\]"]/g, "").trim();
    return cleanString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  return [];
};

// Validate image file
export const validateImageFile = (file: File): string | null => {
  if (!file.type.startsWith("image/")) {
    return "Please select an image file";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Image size should be less than 5MB";
  }

  return null;
};