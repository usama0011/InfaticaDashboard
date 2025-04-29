import React, { useEffect, useState } from "react";
import axios from "../api";
import { Spin, Typography, Card, Row, Col, Descriptions, message } from "antd";

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
                  <Descriptions.Item key={index} label={key}>
                    {typeof value === "object"
                      ? JSON.stringify(value)
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
    </div>
  );
};

export default Statistics;
