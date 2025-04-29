import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Spin, message, Typography } from "antd";

const { Title } = Typography;

const UsageAllPackages = () => {
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState([]);

  const fetchUsageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/usage-all");
      setUsageData(response.data?.results || []);
      message.success("Usage data fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch usage data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  const columns = [
    {
      title: "Package Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Daily Usage (bytes)",
      dataIndex: "daily",
      key: "daily",
      render: (val) => val?.toLocaleString() || "0",
    },
    {
      title: "Weekly Usage (bytes)",
      dataIndex: "weekly",
      key: "weekly",
      render: (val) => val?.toLocaleString() || "0",
    },
    {
      title: "Monthly Usage (bytes)",
      dataIndex: "monhtly", // using the typo as provided
      key: "monhtly",
      render: (val) => (val === null ? "N/A" : val.toLocaleString()),
    },
    {
      title: "Common Usage (bytes)",
      dataIndex: "common",
      key: "common",
      render: (val) => val?.toLocaleString() || "0",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Traffic Usage for All Packages
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Spin size="large" />
        </div>
      ) : usageData.length > 0 ? (
        <Table
          dataSource={usageData}
          columns={columns}
          rowKey="key"
          bordered
          pagination={{ pageSize: 8 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No usage data available.
        </p>
      )}
    </div>
  );
};

export default UsageAllPackages;
