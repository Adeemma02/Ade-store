import React from "react";
import { Package, Truck, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (₦)",
        data: [1000, 1500, 2000, 1800, 2500, 3000],
        borderColor: "#3D99F5",
        backgroundColor: "rgba(61, 153, 245, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Trend" },
    },
  };

  return (
    <div>
      <Helmet>
        <title>Analytics - Vendor Dashboard</title>
        <meta
          name="description"
          content="View your sales and performance analytics."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <Package size={32} className="text-[#3D99F5] mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold text-[#3D99F5]">120</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <Truck size={32} className="text-yellow-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold text-yellow-600">45</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <TrendingUp size={32} className="text-green-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold text-green-600">₦5,230</p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
        <Line data={salesData} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
