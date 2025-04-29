import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin, Typography, message } from "antd";

const { Title } = Typography;

const OnlineStats = () => {
  const [loading, setLoading] = useState(false);
  const [onlineStats, setOnlineStats] = useState(null);

  const fetchOnlineStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/online-stats");
      setOnlineStats(response.data);
      message.success("Online statistics fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch online statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineStats();
  }, []);

  // Convert the onlineStats object to an array for the table data.
  const dataSource = onlineStats
    ? Object.entries(onlineStats).map(([country, count], index) => ({
        key: index,
        country,
        count,
      }))
    : [];

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Available Proxies",
      dataIndex: "count",
      key: "count",
      render: (count) => (count ? count.toLocaleString() : "0"),
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Online Residential Statistics
      </Title>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : onlineStats ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="country"
          bordered
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No online statistics available.
        </p>
      )}
    </div>
  );
};

export default OnlineStats;
