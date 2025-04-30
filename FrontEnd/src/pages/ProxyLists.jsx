import React, { useState } from "react";
import axios from "../api";
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
      const response = await axios.get(`/proxy-lists/${packageKey}`);
      const rawLists = response.data?.results || [];

      const formatted = rawLists.map((item, index) => ({
        key: item.id,
        id: item.id,
        name: item.name,
        login: item.login,
        password: item.password || "N/A",
        network: item.network || "N/A",
        rotation: item.rotation,
        rotation_mode: item.rotation_mode,
        format: item.format,
        country: item.geo?.[0]?.country || "-",
        region: item.geo?.[0]?.region || "-",
        city: item.geo?.[0]?.city || "-",
        isp: item.geo?.[0]?.isp || "-",
      }));

      setProxyLists(formatted);
      message.success("Proxy lists fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch proxy lists.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "#", render: (_, __, index) => index + 1 },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Login", dataIndex: "login", key: "login" },
    { title: "Password", dataIndex: "password", key: "password" },
    { title: "Network", dataIndex: "network", key: "network" },
    { title: "Rotation (s)", dataIndex: "rotation", key: "rotation" },
    {
      title: "Rotation Mode",
      dataIndex: "rotation_mode",
      key: "rotation_mode",
    },
    { title: "Format", dataIndex: "format", key: "format" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Region", dataIndex: "region", key: "region" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "ISP", dataIndex: "isp", key: "isp" },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}>
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
          rowKey="id"
          bordered
          pagination={{ pageSize: 6 }}
          scroll={{ x: "max-content" }}
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
