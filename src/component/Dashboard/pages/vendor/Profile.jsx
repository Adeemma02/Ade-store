import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: null,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submittedData, setSubmittedData] = useState(null); // Store submitted data
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (
      !profile.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    )
      newErrors.email = "Invalid email format";
    if (profile.phone && !profile.phone.match(/^\+?\d{10,15}$/))
      newErrors.phone = "Invalid phone number (10-15 digits)";
    if (profile.password && profile.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (profile.password !== profile.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setMessage({ text: "", type: "" });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ text: "Image size must be less than 2MB", type: "error" });
        return;
      }
      setProfile({ ...profile, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file));
      setMessage({ text: "", type: "" });
    }
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
      const savedData = { ...profile, profilePicture: null }; // Exclude file for localStorage
      localStorage.setItem("vendorProfile", JSON.stringify(savedData));
      setSubmittedData(savedData); // Store submitted data
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setProfile({
        name: "",
        email: "",
        phone: "",
        address: "",
        profilePicture: null,
        password: "",
        confirmPassword: "",
      });
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setMessage({
        text: "Failed to update profile. Try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    setProfile({ ...submittedData, password: "", confirmPassword: "" });
    setSubmittedData(null);
    setMessage({ text: "", type: "" });
    if (submittedData.profilePicture) {
      setPreviewImage(URL.createObjectURL(submittedData.profilePicture));
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <Helmet>
        <title>Profile - Vendor Dashboard</title>
        <meta
          name="description"
          content="Manage your vendor profile information."
        />
      </Helmet>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#3D99F5] mb-6">
        Vendor Profile
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
            Submitted Profile
          </h3>
          <div className="space-y-4">
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            {submittedData.phone && (
              <p>
                <strong>Phone:</strong> {submittedData.phone}
              </p>
            )}
            {submittedData.address && (
              <p>
                <strong>Address:</strong> {submittedData.address}
              </p>
            )}
            {previewImage && (
              <div>
                <strong>Profile Picture:</strong>
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mt-2 object-cover"
                />
              </div>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80 transition-colors duration-200"
          >
            Edit Profile
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
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2 font-medium">
                Profile Picture
              </label>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="mt-2 text-sm text-[#3D99F5] hover:underline"
              >
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Upload profile picture"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address
              </label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] border-gray-300"
                rows="4"
                aria-describedby="address-desc"
              ></textarea>
              <p id="address-desc" className="text-gray-500 text-sm mt-1">
                Enter your business address for shipping purposes.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                New Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D99F5] ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
                </p>
              )}
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
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
