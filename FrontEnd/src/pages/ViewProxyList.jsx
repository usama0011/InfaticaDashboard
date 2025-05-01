import React, { useState } from "react";
import axios from "../api";
import {
  Input,
  Button,
  Form,
  message,
  Spin,
  Typography,
  Table,
  Modal,
} from "antd";
import { saveAs } from "file-saver";

const { Title } = Typography;

const ViewProxyList = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [proxyData, setProxyData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filename, setFilename] = useState("proxy_list");

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

      const proxies = response.data || [];

      const parsedData = proxies.map((proxyStr, index) => {
        const [auth, hostPort] = proxyStr.split("@");
        const [ip, port] = hostPort?.split(":") || [];
        return {
          key: index,
          proxy: proxyStr,
          ip,
          port,
          type: "HTTP",
        };
      });

      setProxyData(parsedData);
      message.success("Proxy list fetched!");
    } catch (error) {
      console.error(error);
      message.error("Failed to view proxy list.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!proxyData.length) return;

    const headers = ["IP", "Port", "Type", "Proxy String"];
    const rows = proxyData.map((item) => [
      item.ip,
      item.port,
      item.type,
      item.proxy,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename || "proxy_list"}.csv`);
    setIsModalVisible(false);
    message.success("CSV downloaded successfully!");
  };

  const columns = [
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
    {
      title: "Proxy String",
      dataIndex: "proxy",
      key: "proxy",
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
        <>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ color: "#2e7d32" }}>
              Total Proxies: {proxyData.length}
            </Title>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Download CSV
            </Button>
          </div>

          <Table
            dataSource={proxyData}
            columns={columns}
            bordered
            pagination={{ pageSize: 50 }}
            scroll={{ x: true }}
          />
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No proxy data loaded.
        </p>
      )}

      <Modal
        title="Download CSV"
        open={isModalVisible}
        onOk={downloadCSV}
        onCancel={() => setIsModalVisible(false)}
        okText="Download"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter file name"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ViewProxyList;
