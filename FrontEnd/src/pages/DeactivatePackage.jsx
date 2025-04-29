import React, { useState } from "react";
import axios from "../api";
import {
  Input,
  Button,
  Form,
  message,
  Spin,
  Typography,
  Descriptions,
  Card,
} from "antd";

const { Title } = Typography;

const DeactivatePackage = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");
  const [packageInfo, setPackageInfo] = useState(null);

  const handleSubmit = async () => {
    if (!packageKey) {
      message.error("Please enter the Package Key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/deactivate-package/${packageKey}`);
      setPackageInfo(response.data?.results || null);
      message.success("Package deactivated successfully!");
      setPackageKey("");
    } catch (error) {
      console.error(error);
      message.error("Failed to deactivate package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Deactivate Package
      </Title>

      <Form layout="vertical">
        <Form.Item label="Package Key">
          <Input
            value={packageKey}
            onChange={(e) => setPackageKey(e.target.value)}
            placeholder="Enter the package key"
          />
        </Form.Item>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "220px" }}
          >
            {loading ? <Spin /> : "Deactivate Package"}
          </Button>
        </div>
      </Form>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : packageInfo ? (
        <Card title={`Package ${packageInfo.package_key} Details`} bordered>
          <Descriptions column={1}>
            <Descriptions.Item label="Status">
              {packageInfo.status}
            </Descriptions.Item>
            <Descriptions.Item label="Is Active">
              {packageInfo.is_active ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Is Suspended">
              {packageInfo.is_suspended ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(packageInfo.created_at).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Expired At">
              {packageInfo.expired_at ? packageInfo.expired_at : "Not Expired"}
            </Descriptions.Item>
            <Descriptions.Item label="Proxy Count">
              {packageInfo.proxy_count.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Traffic Limits">
              {JSON.stringify(packageInfo.traffic_limits)}
            </Descriptions.Item>
            <Descriptions.Item label="Traffic Usage">
              {JSON.stringify(packageInfo.traffic_usage)}
            </Descriptions.Item>
            <Descriptions.Item label="Lists">
              {packageInfo.lists.length === 0
                ? "None"
                : JSON.stringify(packageInfo.lists)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : null}
    </div>
  );
};

export default DeactivatePackage;
