import React, { useState } from "react";
import axios from "../api";
import { Form, Input, Button, Typography, Spin, message, Row, Col } from "antd";

const { Title } = Typography;

const GenereteProxyList = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleGenerate = async (values) => {
    try {
      setLoading(true);
      const { packageKey, ...body } = values;
      const response = await axios.post(
        `/generate-proxy-list/${packageKey}`,
        body
      );
      message.success("Proxy list generated successfully!");
      console.log("Proxy list response:", response.data);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to generate proxy list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Generate Proxy List for Package
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleGenerate}
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label="Package Key"
          name="packageKey"
          rules={[{ required: true, message: "Package key is required" }]}
        >
          <Input placeholder="Enter package key" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Proxy List Name"
              name="proxy-list-name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Proxy List Login"
              name="proxy-list-login"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Proxy List Password" name="proxy-list-password">
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Country (optional)" name="proxy-list-country">
              <Input placeholder="e.g. US, DE, FR" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City (optional)" name="proxy-list-city">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Rotation Period (s)"
              name="proxy-list-rotation-period"
            >
              <Input type="number" placeholder="3600" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Rotation Mode" name="proxy-list-rotation-mode">
              <Input placeholder="0, 1, or 2" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Format (optional)" name="proxy-list-format">
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "240px", backgroundColor: "#003c8f" }}
          >
            {loading ? <Spin /> : "Generate Proxy List"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GenereteProxyList;
