import React, { useState } from "react";
import axios from "../api";
import { Input, Button, Form, message, Spin, Typography, Table } from "antd";

const { Title } = Typography;

const ViewProxyList = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [proxyData, setProxyData] = useState([]);

  const handleSubmit = async () => {
    if (!packageKey || !id || !name) {
      message.error("Package key, ID, and name are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/view-proxy-list/${packageKey}`, {
        id,
        name,
      });
      const proxies = response.data?.results || [];
      setProxyData(proxies);
      message.success("Proxy list fetched!");
    } catch (error) {
      console.error(error);
      message.error("Failed to view proxy list.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Proxy",
      dataIndex: "proxy",
      key: "proxy",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        View Proxy List
      </Title>

      <Form layout="vertical">
        <Form.Item label="Package Key">
          <Input
            value={packageKey}
            onChange={(e) => setPackageKey(e.target.value)}
            placeholder="Enter package key"
          />
        </Form.Item>
        <Form.Item label="List ID">
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter list ID"
          />
        </Form.Item>
        <Form.Item label="List Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter list name"
          />
        </Form.Item>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "220px" }}
          >
            {loading ? <Spin /> : "View List"}
          </Button>
        </div>
      </Form>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : proxyData.length > 0 ? (
        <Table
          dataSource={proxyData}
          columns={columns}
          rowKey={(record, index) => index}
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No proxy data loaded.
        </p>
      )}
    </div>
  );
};

export default ViewProxyList;
