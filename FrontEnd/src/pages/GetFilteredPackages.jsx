import React, { useState } from "react";
import axios from "../api";
import { Input, Button, Table, Spin, message, Typography, Tag } from "antd";

const { Title } = Typography;

const GetFilteredPackages = () => {
  const [loading, setLoading] = useState(false);
  const [inputKeys, setInputKeys] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const handleFetch = async () => {
    const trimmedKeys = inputKeys.trim();

    if (!trimmedKeys) {
      message.error("Please enter at least one package key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/get-filtered-packages", {
        packages: trimmedKeys,
      });
      setFilteredPackages(response.data?.results || []);
      message.success("Filtered packages fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch filtered packages.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Package Key",
      dataIndex: "package_key",
      key: "package_key",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: "Expired At",
      dataIndex: "expired_at",
      key: "expired_at",
      render: (val) => (val ? val : "Not Expired"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <Tag color={val === "Active" ? "green" : "red"}>{val}</Tag>
      ),
    },
    {
      title: "Suspended",
      dataIndex: "is_suspended",
      key: "is_suspended",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Proxy Count",
      dataIndex: "proxy_count",
      key: "proxy_count",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: "Traffic Limit - Daily",
      dataIndex: ["traffic_limits", "daily"],
      key: "limit_daily",
      render: (val) => (val === false ? "Unlimited" : val),
    },
    {
      title: "Traffic Limit - Weekly",
      dataIndex: ["traffic_limits", "weekly"],
      key: "limit_weekly",
      render: (val) => (val === false ? "Unlimited" : val),
    },
    {
      title: "Traffic Limit - Monthly",
      dataIndex: ["traffic_limits", "monthly"],
      key: "limit_monthly",
      render: (val) => (val === false ? "Unlimited" : val),
    },
    {
      title: "Traffic Limit - Common",
      dataIndex: ["traffic_limits", "common"],
      key: "limit_common",
      render: (val) => (val === false ? "Unlimited" : val),
    },
    {
      title: "Traffic Used - Daily",
      dataIndex: ["traffic_usage", "daily"],
      key: "usage_daily",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: "Traffic Used - Weekly",
      dataIndex: ["traffic_usage", "weekly"],
      key: "usage_weekly",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: "Traffic Used - Monthly",
      dataIndex: ["traffic_usage", "monthly"],
      key: "usage_monthly",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: "Traffic Used - Common",
      dataIndex: ["traffic_usage", "common"],
      key: "usage_common",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: "Proxy Lists",
      dataIndex: "lists",
      key: "lists",
      render: (lists) => (lists.length === 0 ? "None" : JSON.stringify(lists)),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Get Filtered Packages (Full Details)
      </Title>

      <Input.TextArea
        rows={3}
        placeholder="Enter comma-separated package keys (e.g., key1,key2,key3)"
        value={inputKeys}
        onChange={(e) => setInputKeys(e.target.value)}
        style={{ marginBottom: "15px" }}
      />

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Button
          type="primary"
          onClick={handleFetch}
          loading={loading}
          style={{ backgroundColor: "#003c8f", width: "220px" }}
        >
          Fetch Filtered Packages
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : filteredPackages.length > 0 ? (
        <Table
          dataSource={filteredPackages}
          columns={columns}
          rowKey="package_key"
          bordered
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 6 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No packages found.</p>
      )}
    </div>
  );
};

export default GetFilteredPackages;
