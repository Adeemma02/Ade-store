import React, { useState } from "react";
import { Helmet } from "react-helmet";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "AdeEmma's Store",
    storeDescription: "",
    emailNotifications: true,
    currency: "NIG",
    twoFactorAuth: false,
    businessHours: { start: "09:00", end: "17:00" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!settings.storeName.trim())
      newErrors.storeName = "Store name is required";
    if (settings.storeDescription.length > 500)
      newErrors.storeDescription = "Description cannot exceed 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name.includes("businessHours")) {
      const [_, key] = name.split(".");
      setSettings({
        ...settings,
        businessHours: { ...settings.businessHours, [key]: value },
      });
    } else {
      setSettings({
        ...settings,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    setErrors({ ...errors, [name]: "" });
    setMessage({ text: "", type: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: "Please fix the errors in the form.", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("vendorSettings", JSON.stringify(settings));
      setSubmittedData(settings); // Store submitted data
      setMessage({ text: "Settings saved successfully!", type: "success" });
      setSettings({
        storeName: "",
        storeDescription: "",
        emailNotifications: true,
        currency: "NIG",
        twoFactorAuth: false,
        businessHours: { start: "09:00", end: "17:00" },
      });
    } catch {
      setMessage({
        text: "Failed to save settings. Try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    setSettings(submittedData);
    setSubmittedData(null);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Helmet>
        <title>Settings - Vendor Dashboard</title>
        <meta
          name="description"
          content="Configure your vendor account settings."
        />
      </Helmet>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#3D99F5] mb-6">
        Store Settings
      </h2>
      {message.text && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Submitted Settings
          </h3>
          <div className="space-y-4">
            <p>
              <strong>Store Name:</strong> {submittedData.storeName}
            </p>
            {submittedData.storeDescription && (
              <p>
                <strong>Store Description:</strong>{" "}
                {submittedData.storeDescription}
              </p>
            )}
            <p>
              <strong>Email Notifications:</strong>{" "}
              {submittedData.emailNotifications ? "Enabled" : "Disabled"}
            </p>
            <p>
              <strong>Currency:</strong> {submittedData.currency}
            </p>
            <p>
              <strong>Two-Factor Authentication:</strong>{" "}
              {submittedData.twoFactorAuth ? "Enabled" : "Disabled"}
            </p>
            <p>
              <strong>Business Hours:</strong>{" "}
              {submittedData.businessHours.start} -{" "}
              {submittedData.businessHours.end}
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80 transition-colors duration-200"
          >
            Edit Settings
          </button>
        </div>
      )}

      {/* Form */}
      {!submittedData && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            {/* Store Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.storeName ? "border-red-500" : "border-gray-300"
                }`}
                required
                aria-invalid={errors.storeName ? "true" : "false"}
                aria-describedby={
                  errors.storeName ? "storeName-error" : undefined
                }
              />
              {errors.storeName && (
                <p id="storeName-error" className="text-red-500 text-sm mt-1">
                  {errors.storeName}
                </p>
              )}
            </div>

            {/* Store Description */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Store Description
              </label>
              <textarea
                name="storeDescription"
                value={settings.storeDescription}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.storeDescription ? "border-red-500" : "border-gray-300"
                }`}
                rows="4"
                aria-invalid={errors.storeDescription ? "true" : "false"}
                aria-describedby={
                  errors.storeDescription
                    ? "storeDescription-error"
                    : "storeDescription-desc"
                }
              ></textarea>
              <p
                id="storeDescription-desc"
                className="text-gray-500 text-sm mt-1"
              >
                Describe your store (max 500 characters).{" "}
                <span>({settings.storeDescription.length}/500)</span>
              </p>
              {errors.storeDescription && (
                <p
                  id="storeDescription-error"
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.storeDescription}
                </p>
              )}
            </div>

            {/* Email Notifications */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5 text-[#3D99F5] focus:ring-[#3D99F5] border-gray-300 rounded"
                />
                <span className="text-gray-700 font-medium">
                  Enable Email Notifications
                </span>
              </label>
              <p className="text-gray-500 text-sm mt-1">
                Receive updates about orders and customer inquiries.
              </p>
            </div>

            {/* Two-Factor Authentication */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                  className="mr-2 h-5 w-5 text-[#3D99F5] focus:ring-[#3D99F5] border-gray-300 rounded"
                />
                <span className="text-gray-700 font-medium">
                  Enable Two-Factor Authentication
                </span>
              </label>
              <p className="text-gray-500 text-sm mt-1">
                Add an extra layer of security to your account.
              </p>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Currency
              </label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] border-gray-300"
              >
                <option value="NIG">Naira (NGN)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">Pound Sterling (GBP)</option>
              </select>
            </div>

            {/* Business Hours */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Business Hours
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-600 text-sm mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="businessHours.start"
                    value={settings.businessHours.start}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-600 text-sm mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="businessHours.end"
                    value={settings.businessHours.end}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-6 w-full bg-[#3D99F5] text-white px-4 py-3 rounded-md hover:bg-[#3D99F5]/80 transition-colors duration-200 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
