import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Typography, Spin, message } from "antd";

const { Title } = Typography;

const FormatsList = () => {
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);

  const fetchFormats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/proxylist-formats");
      const rawData = response.data || {};

      // Convert object to array of objects
      const formatted = Object.entries(rawData).map(([key, value]) => ({
        key,
        format: value,
        description: `Format ${key}`,
      }));

      setFormats(formatted);
      message.success("Formats fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch formats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormats();
  }, []);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Format",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Proxy List Formats
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : formats.length > 0 ? (
        <Table
          dataSource={formats}
          columns={columns}
          rowKey="key"
          bordered
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No formats found.</p>
      )}
    </div>
  );
};

export default FormatsList;
