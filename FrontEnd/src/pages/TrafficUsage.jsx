import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Table, Spin, message } from "antd";

const TrafficUsage = () => {
  const [key, setKey] = useState(""); // Package Key input
  const [period, setPeriod] = useState("daily"); // Period input
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState(null);

  const fetchTrafficUsage = async () => {
    if (!key) {
      message.error("Please enter a valid Package Key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/traffic-usage", {
        key,
        period,
      });

      setUsageData(response.data);
      message.success("Traffic usage data fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch traffic usage data!");
    } finally {
      setLoading(false);
    }
  };

  // Prepare Table Data if available
  const tableData = usageData
    ? Object.entries(usageData).map(([time, value], index) => ({
        key: index,
        time,
        usage: value,
      }))
    : [];

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Usage (Bytes)",
      dataIndex: "usage",
      key: "usage",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "30px", fontSize: "28px", color: "#003c8f" }}>
        Check Traffic Usage
      </h2>

      <Input
        placeholder="Enter Package Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px" }}
      />

      <Input
        placeholder="Enter Period (daily, weekly, monthly, all)"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px" }}
      />

      <Button
        type="primary"
        onClick={fetchTrafficUsage}
        loading={loading}
        style={{ marginBottom: "30px", backgroundColor: "#003c8f" }}
      >
        Fetch Traffic Usage
      </Button>

      {loading ? (
        <Spin size="large" />
      ) : usageData ? (
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{ pageSize: 8 }}
          bordered
        />
      ) : (
        <p style={{ color: "#666" }}>No data fetched yet.</p>
      )}
    </div>
  );
};

export default TrafficUsage;
