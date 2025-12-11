import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import Loader from "../../Loader/Loader";

const FILTERS = [
  { id: "today", label: "Today" },
  { id: "7days", label: "7 Days" },
  { id: "30days", label: "30 Days" },
];

const COLORS = ["#0088FE", "#FF8042", "#FFBB28"];

const AdminDashboard = () => {
  const axiosInstance = useAxios();
  const [filter, setFilter] = useState("today");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/admin/analytics?filter=${filter}`).then((res) => {
      setAnalytics(res.data);
      setLoading(false);
    });
  }, [filter]);

  if (loading) return <Loader></Loader>;

  return (
    <div className="p-5 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-5"
      >
        Admin Analytics Dashboard
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-md border ${
              filter === f.id ? "bg-blue-600 text-white" : "bg-gray-900"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Products"
          value={analytics.products.totalProducts}
        />
        <StatCard
          title="Products Added"
          value={analytics.products.productsAdded}
        />
        <StatCard title="New Users" value={analytics.users.newUsers} />
        <StatCard title="Total Users" value={analytics.users.totalUsers} />
        <StatCard
          title="Orders This Period"
          value={analytics.orders.ordersThisMonth}
        />
        <StatCard
          title="Active Managers"
          value={analytics.managers.activeManagers}
        />
      </div>

      {/* Charts Section */}
      <h3 className="text-2xl font-semibold mt-10 mb-3">Sales Charts</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <ChartWrapper title="Bar Chart">
          <BarChart width={300} height={220} data={analytics.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" />
          </BarChart>
        </ChartWrapper>

        {/* Line Chart */}
        <ChartWrapper title="Line Chart">
          <LineChart width={300} height={220} data={analytics.chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" strokeWidth={2} />
          </LineChart>
        </ChartWrapper>

        {/* Pie Chart */}
        <ChartWrapper title="Pie Chart">
          <PieChart width={300} height={220}>
            <Pie
              data={analytics.chartData}
              dataKey="sales"
              nameKey="name"
              outerRadius={90}
              label
            >
              {analytics.chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartWrapper>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900 p-5 rounded-lg shadow text-center"
  >
    <h4 className="text-gray-600 text-sm">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
);

// Chart Wrapper
const ChartWrapper = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-900 p-5 rounded-lg shadow flex flex-col items-center"
  >
    <h4 className="mb-2 font-semibold">{title}</h4>
    {children}
  </motion.div>
);

export default AdminDashboard;
