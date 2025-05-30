import React, { useState } from "react";
import axios from "../api";
import { Input, Button, Form, message, Spin, Typography } from "antd";

const { Title } = Typography;

const SuspendPackage = () => {
  const [loading, setLoading] = useState(false);
  const [packageKey, setPackageKey] = useState("");

  const handleSubmit = async () => {
    if (!packageKey) {
      message.error("Please enter the Package Key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/suspend-package/${packageKey}`);
      message.success("Package suspended successfully!");
      console.log(response.data);
      setPackageKey("");
    } catch (error) {
      console.error(error);
      message.error("Failed to suspend package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Suspend Package
      </Title>

      <Form layout="vertical">
        <Form.Item label="Package Key">
          <Input
            value={packageKey}
            onChange={(e) => setPackageKey(e.target.value)}
            placeholder="Enter the package key"
          />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ backgroundColor: "#003c8f", width: "220px" }}
          >
            {loading ? <Spin /> : "Suspend Package"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SuspendPackage;
