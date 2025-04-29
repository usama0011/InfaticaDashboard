import React, { useState } from "react";
import axios from "../api";
import { Input, Button, Card, Spin, message, Descriptions, Tag } from "antd";

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

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#003c8f", marginBottom: "20px" }}
      >
        Get Package Information
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
          style={{ backgroundColor: "#003c8f", width: "200px" }}
        >
          Fetch Package Info
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : packageInfo ? (
        <Card title="Package Details" bordered>
          <Descriptions column={1}>
            <Descriptions.Item label="Package Key">
              {packageInfo.package_key}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(packageInfo.created_at).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Expired At">
              {packageInfo.expired_at ? packageInfo.expired_at : "Not Expired"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={packageInfo.status === "Active" ? "green" : "red"}>
                {packageInfo.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Suspended">
              {packageInfo.is_suspended ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Active">
              {packageInfo.is_active ? "Yes" : "No"}
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
            <Descriptions.Item label="Proxy Lists">
              {packageInfo.lists.length === 0
                ? "None"
                : JSON.stringify(packageInfo.lists)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>No data to show.</p>
      )}
    </div>
  );
};

export default GetPackageInfo;
