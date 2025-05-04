import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Spin, message, Typography, Input } from "antd";

const { Title } = Typography;
const { Search } = Input;

const UsageAllPackages = () => {
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchUsageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/usage-all");
      const data = response.data?.results || [];
      setUsageData(data);
      setFilteredData(data);
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

  // Convert bytes to MB
  const bytesToMB = (bytes) => {
    if (bytes == null) return "N/A";
    const mb = bytes / 1048576;
    return `${mb.toFixed(2)} MB`;
  };

  // Handle search input
  const onSearch = (value) => {
    setSearchText(value);
    const filtered = usageData.filter((item) =>
      item.key.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Package Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Daily Usage (MB)",
      dataIndex: "daily",
      key: "daily",
      render: (val) => bytesToMB(val),
    },
    {
      title: "Weekly Usage (MB)",
      dataIndex: "weekly",
      key: "weekly",
      render: (val) => bytesToMB(val),
    },
    {
      title: "Monthly Usage (MB)",
      dataIndex: "monhtly",
      key: "monhtly",
      render: (val) => bytesToMB(val),
    },
    {
      title: "Common Usage (MB)",
      dataIndex: "common",
      key: "common",
      render: (val) => bytesToMB(val),
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Traffic Usage for All Packages
      </Title>

      <Search
        placeholder="Search by Package Key"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 400 }}
      />

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Spin size="large" />
        </div>
      ) : filteredData.length > 0 ? (
        <Table
          dataSource={filteredData}
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
