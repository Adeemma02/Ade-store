import React, { useState } from "react";
import { Helmet } from "react-helmet";

const Settings = () => {
  const [settings, setSettings] = useState({
    platformFee: 5,
    currency: "USD",
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin settings updated:", settings);
  };

  return (
    <div>
      <Helmet>
        <title>Platform Settings - Admin Dashboard</title>
        <meta name="description" content="Configure platform-wide settings." />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">
        Platform Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Platform Fee (%)</label>
            <input
              type="number"
              name="platformFee"
              value={settings.platformFee}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="NIG">NIG</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="mr-2"
              />
              Enable Maintenance Mode
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
