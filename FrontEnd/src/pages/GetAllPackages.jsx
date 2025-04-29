import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin, message, Typography } from "antd";

const { Title } = Typography;

const GetAllPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  const fetchAllPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/get-all-packages");
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
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Expired At",
      dataIndex: "expired_at",
      key: "expired_at",
    },
    {
      title: "Common Limit",
      dataIndex: "limit_traffic_common",
      key: "limit_traffic_common",
      render: (value) => value?.toLocaleString() || "N/A",
    },
    {
      title: "Used Traffic",
      dataIndex: "traffic_used",
      key: "traffic_used",
      render: (value) => value?.toLocaleString() || "N/A",
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
          rowKey="key"
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
