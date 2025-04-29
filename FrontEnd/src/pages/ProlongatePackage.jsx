import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form, message, Spin, Typography } from "antd";

const { Title } = Typography;

const ProlongatePackage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    packageKey: "",
    expired_at: "", // Format: YYYY-MM-DD HH:mm:ss
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { packageKey, expired_at } = formData;

    if (!packageKey || !expired_at) {
      message.error("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/prolongate-package/${packageKey}`,
        {
          expired_at,
        }
      );

      message.success("Package expiration extended successfully!");
      console.log(response.data);

      setFormData({ packageKey: "", expired_at: "" });
    } catch (error) {
      console.error(error);
      message.error("Failed to prolongate package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Prolongate Package
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

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "220px" }}
          >
            {loading ? <Spin /> : "Prolongate Package"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProlongatePackage;
