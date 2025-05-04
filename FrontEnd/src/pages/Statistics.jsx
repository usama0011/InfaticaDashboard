import React, { useEffect, useState } from "react";
import axios from "../api";
import { Spin, Typography, Card, Row, Col, Descriptions, message } from "antd";
import {
  UserOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  BarChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/stats");
      setStats(response.data);
      message.success("Statistics loaded!");
    } catch (error) {
      console.error(error);
      message.error("Failed to load statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  const bytesToGB = (bytes) => {
    if (typeof bytes !== "number") return bytes;
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };
  const getIconForKey = (key) => {
    const lower = key.toLowerCase();
    if (lower.includes("user"))
      return <UserOutlined style={{ color: "#1890ff" }} />;
    if (lower.includes("traffic") || lower.includes("download"))
      return <CloudDownloadOutlined style={{ color: "#52c41a" }} />;
    if (lower.includes("usage") || lower.includes("bandwidth"))
      return <BarChartOutlined style={{ color: "#722ed1" }} />;
    if (lower.includes("data"))
      return <DatabaseOutlined style={{ color: "#eb2f96" }} />;
    return <CloudOutlined style={{ color: "#aaa" }} />;
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Account Statistics
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", padding: "30px 0" }}>
          <Spin size="large" />
        </div>
      ) : stats ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered>
              <Descriptions title="General Stats" column={1}>
                {Object.entries(stats).map(([key, value], index) => (
                  <Descriptions.Item
                    key={index}
                    label={
                      <span>
                        {getIconForKey(key)}{" "}
                        <span style={{ marginLeft: 8 }}>{key}</span>
                      </span>
                    }
                  >
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : key.toLowerCase().includes("usage") ||
                        key.toLowerCase().includes("traffic") ||
                        key.toLowerCase().includes("data")
                      ? bytesToGB(value)
                      : value?.toString()}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Card>
          </Col>
        </Row>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No statistics available.
        </p>
      )}
      <br />
    </div>
  );
};

export default Statistics;
