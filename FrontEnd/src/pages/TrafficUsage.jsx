import React, { useState } from "react";
import axios from "../api";
import { Button, Input, Table, Spin, message, Select, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const TrafficUsage = () => {
  const [key, setKey] = useState(""); // Package Key
  const [period, setPeriod] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState(null);

  const fetchTrafficUsage = async () => {
    if (!key || !period) {
      message.error("Please provide both Package Key and Period.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("key", key);
      formData.append("period", period);

      const response = await axios.post("/traffic-usage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      <Title level={3} style={{ color: "#003c8f", marginBottom: "20px" }}>
        Traffic Usage of Package
      </Title>

      <Input
        placeholder="Enter Package Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px", width: "100%" }}
      />

      <Select
        value={period}
        onChange={(val) => setPeriod(val)}
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="Select Period"
      >
        <Option value="daily">Daily</Option>
        <Option value="weekly">Weekly</Option>
        <Option value="monthly">Monthly</Option>
        <Option value="all">All</Option>
      </Select>

      <Button
        type="primary"
        onClick={fetchTrafficUsage}
        loading={loading}
        style={{ backgroundColor: "#003c8f", width: "100%" }}
      >
        {loading ? <Spin /> : "Fetch Traffic Usage"}
      </Button>

      <div style={{ marginTop: "30px" }}>
        {loading ? (
          <Spin size="large" />
        ) : usageData ? (
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            bordered
          />
        ) : (
          <p style={{ color: "#888" }}>No traffic data fetched yet.</p>
        )}
      </div>
    </div>
  );
};

export default TrafficUsage;
