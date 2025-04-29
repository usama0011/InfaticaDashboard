import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Card, Spin, message, Descriptions } from "antd";

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
      const response = await axios.get(`/api/get-package-info/${packageKey}`);
      setPackageInfo(response.data);
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
            {Object.entries(packageInfo).map(([key, value], idx) => (
              <Descriptions.Item key={idx} label={key}>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : value?.toString()}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Card>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>No data to show.</p>
      )}
    </div>
  );
};

export default GetPackageInfo;
