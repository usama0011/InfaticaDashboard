import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Table, Spin, Typography, message, Form } from "antd";

const { Title } = Typography;

const ProxyLists = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");
  const [proxyLists, setProxyLists] = useState([]);

  const fetchProxyLists = async () => {
    if (!packageKey) {
      message.error("Please enter a package key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/proxy-lists/${packageKey}`);
      setProxyLists(response.data?.results || []);
      message.success("Proxy lists fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch proxy lists.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "List Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        All Proxy Lists by Package
      </Title>

      <Form layout="vertical">
        <Form.Item label="Package Key">
          <Input
            value={packageKey}
            onChange={(e) => setPackageKey(e.target.value)}
            placeholder="Enter package key"
          />
        </Form.Item>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            type="primary"
            onClick={fetchProxyLists}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "200px" }}
          >
            {loading ? <Spin /> : "Get Proxy Lists"}
          </Button>
        </div>
      </Form>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : proxyLists.length > 0 ? (
        <Table
          dataSource={proxyLists}
          columns={columns}
          rowKey="key"
          bordered
          pagination={{ pageSize: 6 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No proxy lists found.
        </p>
      )}
    </div>
  );
};

export default ProxyLists;
