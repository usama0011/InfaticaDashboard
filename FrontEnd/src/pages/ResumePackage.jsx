import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form, message, Spin, Typography } from "antd";

const { Title } = Typography;

const ResumePackage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    packageKey: "",
    expired_at: "",
    limit_traffic_common: "",
    limit_traffic_monthly: "",
    limit_traffic_weekly: "",
    limit_traffic_daily: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { packageKey, ...payload } = formData;

    if (!packageKey || !payload.expired_at) {
      message.error("Package key and expired_at are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/resume-package/${packageKey}`,
        payload
      );

      message.success("Package resumed successfully!");
      console.log(response.data);

      // Reset form
      setFormData({
        packageKey: "",
        expired_at: "",
        limit_traffic_common: "",
        limit_traffic_monthly: "",
        limit_traffic_weekly: "",
        limit_traffic_daily: "",
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to resume package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Resume Suspended Package
      </Title>

      <Form layout="vertical">
        <Form.Item label="Package Key">
          <Input
            name="packageKey"
            value={formData.packageKey}
            onChange={handleChange}
            placeholder="Enter the package key"
          />
        </Form.Item>

        <Form.Item label="New Expiration Date (YYYY-MM-DD HH:mm:ss)">
          <Input
            name="expired_at"
            value={formData.expired_at}
            onChange={handleChange}
            placeholder="e.g., 2025-12-31 23:59:59"
          />
        </Form.Item>

        <Form.Item label="Common Traffic Limit (optional)">
          <Input
            name="limit_traffic_common"
            value={formData.limit_traffic_common}
            onChange={handleChange}
            placeholder="in bytes"
          />
        </Form.Item>

        <Form.Item label="Monthly Traffic Limit (optional)">
          <Input
            name="limit_traffic_monthly"
            value={formData.limit_traffic_monthly}
            onChange={handleChange}
            placeholder="in bytes"
          />
        </Form.Item>

        <Form.Item label="Weekly Traffic Limit (optional)">
          <Input
            name="limit_traffic_weekly"
            value={formData.limit_traffic_weekly}
            onChange={handleChange}
            placeholder="in bytes"
          />
        </Form.Item>

        <Form.Item label="Daily Traffic Limit (optional)">
          <Input
            name="limit_traffic_daily"
            value={formData.limit_traffic_daily}
            onChange={handleChange}
            placeholder="in bytes"
          />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "220px" }}
          >
            {loading ? <Spin /> : "Resume Package"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResumePackage;
