import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form, message, Spin } from "antd";

const CreatePackage = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
    if (!formData.expired_at) {
      message.error("Please fill required fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/create-package", formData);
      message.success("Package created successfully!");
      console.log(response.data);

      // Clear form after success
      setFormData({
        expired_at: "",
        limit_traffic_common: "",
        limit_traffic_monthly: "",
        limit_traffic_weekly: "",
        limit_traffic_daily: "",
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to create package!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
      <h2
        style={{ textAlign: "center", color: "#003c8f", marginBottom: "20px" }}
      >
        Create New Package
      </h2>

      <Form layout="vertical">
        <Form.Item label="Expired At (YYYY-MM-DD HH:mm:ss)">
          <Input
            name="expired_at"
            value={formData.expired_at}
            onChange={handleChange}
            placeholder="e.g., 2025-12-31 23:59:59"
          />
        </Form.Item>

        <Form.Item label="Common Traffic Limit (bytes)">
          <Input
            name="limit_traffic_common"
            value={formData.limit_traffic_common}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Form.Item>

        <Form.Item label="Monthly Traffic Limit (bytes)">
          <Input
            name="limit_traffic_monthly"
            value={formData.limit_traffic_monthly}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Form.Item>

        <Form.Item label="Weekly Traffic Limit (bytes)">
          <Input
            name="limit_traffic_weekly"
            value={formData.limit_traffic_weekly}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Form.Item>

        <Form.Item label="Daily Traffic Limit (bytes)">
          <Input
            name="limit_traffic_daily"
            value={formData.limit_traffic_daily}
            onChange={handleChange}
            placeholder="Optional"
          />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "200px" }}
          >
            {loading ? <Spin /> : "Create Package"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePackage;
