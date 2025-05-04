import React, { useState } from "react";
import axios from "../api";
import {
  Input,
  Button,
  Spin,
  Typography,
  message,
  Form,
  Descriptions,
  Card,
} from "antd";

const { Title } = Typography;

const UsageSinglePackage = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");
  const [usageData, setUsageData] = useState(null);

  const handleFetch = async () => {
    if (!packageKey) {
      message.error("Please enter a package key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/usage-package/${packageKey}`);
      const usage = response.data?.results || null;
      setUsageData(usage);
      message.success("Usage data fetched!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch usage data.");
    } finally {
      setLoading(false);
    }
  };
  const bytesToMB = (bytes) => {
    if (bytes === null || bytes === undefined || bytes === false) return "N/A";
    const mb = bytes / 1048576;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Usage for Single Package
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
            onClick={handleFetch}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "200px" }}
          >
            {loading ? <Spin /> : "Get Usage"}
          </Button>
        </div>
      </Form>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : usageData ? (
        <Card title={`Usage for Package: ${usageData.key}`} bordered>
          <Descriptions column={1}>
            <Descriptions.Item label="Daily">
              {bytesToMB(usageData.daily)}
            </Descriptions.Item>
            <Descriptions.Item label="Weekly">
              {bytesToMB(usageData.weekly)}
            </Descriptions.Item>
            <Descriptions.Item label="Monthly">
              {bytesToMB(usageData.monhtly)}
            </Descriptions.Item>
            <Descriptions.Item label="Common">
              {bytesToMB(usageData.common)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No data available.</p>
      )}
    </div>
  );
};

export default UsageSinglePackage;
