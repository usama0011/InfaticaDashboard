import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Spin, message, Typography, Tag } from "antd";

const { Title } = Typography;

const GetAllPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const fetchAllPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/get-all-packages");
      setPackages(response.data?.results || []);
      message.success("Packages fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

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
      title: "Expired",
      dataIndex: "expired_at",
      key: "expired_at",
      render: (val) => (val ? new Date(val).toLocaleString() : "Not Expired"),
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
      title: "Proxies",
      dataIndex: "proxy_count",
      key: "proxy_count",
    },
    {
      title: "Common Limit",
      dataIndex: ["traffic_limits", "common"],
      key: "limit_traffic_common",
      render: (val) => (val === false ? "Unlimited" : val.toLocaleString()),
    },
    {
      title: "Used Traffic",
      dataIndex: ["traffic_usage", "common"],
      key: "traffic_used",
      render: (val) => val?.toLocaleString() || "0",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        All Packages
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Spin size="large" />
        </div>
      ) : packages.length > 0 ? (
        <Table
          dataSource={packages}
          columns={columns}
          rowKey="package_key"
          bordered
          pagination={{ pageSize: 8 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No packages found.</p>
      )}
    </div>
  );
};

export default GetAllPackages;

///Status Filter Apply Here in Get All Pakages
