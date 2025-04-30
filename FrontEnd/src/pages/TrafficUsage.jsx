import React, { useState } from "react";
import axios from "../api";
import { Button, Input, Table, Spin, message, Select, Typography } from "antd";
import { CloudOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const TrafficUsage = () => {
  const [key, setKey] = useState("");
  const [period, setPeriod] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState([]);

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

      const parsed = [];

      // Flattening the nested response structure
      Object.entries(response.data || {}).forEach(([region, usage]) => {
        Object.entries(usage).forEach(([time, value]) => {
          parsed.push({
            key: `${region}-${time}`,
            region,
            time,
            usage: value,
          });
        });
      });

      setUsageData(parsed);
      message.success("Traffic usage data fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch traffic usage data!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "📍 Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "🕒 Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "📶 Usage (Bytes)",
      dataIndex: "usage",
      key: "usage",
    },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <Title level={3} style={{ color: "#003c8f", marginBottom: "20px" }}>
        <CloudOutlined style={{ color: "#1890ff", marginRight: 8 }} />
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
        style={{
          backgroundColor: "#003c8f",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {loading ? <Spin /> : "Fetch Traffic Usage"}
      </Button>

      <div>
        {loading ? (
          <Spin size="large" />
        ) : usageData.length > 0 ? (
          <Table
            dataSource={usageData}
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
