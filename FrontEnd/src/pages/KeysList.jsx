import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Spin, Typography, message } from "antd";

const { Title } = Typography;

const KeysList = () => {
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/keys");
      const rawKeys = response.data?.results || [];
      const formattedKeys = rawKeys.map((key, index) => ({
        id: index,
        packageKey: key,
      }));
      setKeys(formattedKeys);
      message.success("Package keys fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch package keys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const columns = [
    {
      title: "# No",
      key: "index",
      render: (text, record, index) => index,
      width: 80,
    },
    {
      title: "Package Key",
      dataIndex: "packageKey",
      key: "packageKey",
    },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Available Package Keys
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : keys.length > 0 ? (
        <Table
          dataSource={keys}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No keys available.</p>
      )}
    </div>
  );
};

export default KeysList;
