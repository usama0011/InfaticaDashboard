import React, { useState } from "react";
import axios from "../api";
import {
  Input,
  Button,
  Card,
  Spin,
  message,
  Descriptions,
  Tag,
  List,
  Typography,
} from "antd";
import {
  KeyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const GetPackageInfo = () => {
  const [packageKey, setPackageKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [packageInfo, setPackageInfo] = useState(null);

  const fetchPackageInfo = async () => {
    if (!packageKey) {
      message.error("Please enter a Package Key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/get-package-info/${packageKey}`);
      setPackageInfo(response.data?.results || null);
      message.success("Package information fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch package info.");
    } finally {
      setLoading(false);
    }
  };

  const formatTrafficUsage = (usage) =>
    Object.entries(usage || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#003c8f", marginBottom: "20px" }}
      >
        <BarChartOutlined /> Get Package Information
      </h2>

      <Input
        placeholder="Enter Package Key"
        value={packageKey}
        onChange={(e) => setPackageKey(e.target.value)}
        style={{ marginBottom: "15px", padding: "10px" }}
      />

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Button
          type="primary"
          onClick={fetchPackageInfo}
          loading={loading}
          style={{ backgroundColor: "#003c8f", width: "220px" }}
        >
          Fetch Package Info
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "left" }}>
          <Spin size="large" />
        </div>
      ) : packageInfo ? (
        <Card title="📦 Package Details" bordered>
          <Descriptions column={1} bordered>
            <Descriptions.Item
              label={
                <>
                  <KeyOutlined /> Package Key
                </>
              }
            >
              {packageInfo.package_key}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <ClockCircleOutlined /> Created At
                </>
              }
            >
              {new Date(packageInfo.created_at).toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="Expired At">
              {packageInfo.expired_at || "Not Expired"}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              <Tag color={packageInfo.status === "Active" ? "green" : "red"}>
                {packageInfo.status}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Suspended">
              {packageInfo.is_suspended ? (
                <Tag color="red">Yes</Tag>
              ) : (
                <Tag color="green">No</Tag>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Active">
              {packageInfo.is_active ? (
                <Tag color="green">Yes</Tag>
              ) : (
                <Tag color="red">No</Tag>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Proxy Count">
              {packageInfo.proxy_count?.toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <ThunderboltOutlined /> Traffic Limits
                </>
              }
            >
              {Object.entries(packageInfo.traffic_limits || {}).map(
                ([k, v]) => (
                  <Tag key={k} color={v ? "orange" : "default"}>
                    {k}: {v.toString()}
                  </Tag>
                )
              )}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <BarChartOutlined /> Traffic Usage
                </>
              }
            >
              {formatTrafficUsage(packageInfo.traffic_usage)}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <>
                  <DeploymentUnitOutlined /> Proxy Lists
                </>
              }
            >
              {packageInfo.lists.length === 0 ? (
                "None"
              ) : (
                <List
                  dataSource={packageInfo.lists}
                  bordered
                  size="small"
                  renderItem={(item) => (
                    <List.Item>
                      <Text strong>{item.name}</Text> | Login: {item.login} |
                      Rotation: {item.rotation}s | Format: {item.format}
                    </List.Item>
                  )}
                />
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <p style={{ textAlign: "left", color: "#666" }}>No data to show.</p>
      )}
    </div>
  );
};

export default GetPackageInfo;
