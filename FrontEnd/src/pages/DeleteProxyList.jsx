import React, { useState } from "react";
import axios from "../api";
import { Form, Input, Button, Typography, message, Spin } from "antd";

const { Title } = Typography;

const DeleteProxyList = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRemove = async (values) => {
    try {
      setLoading(true);
      const { packageKey, id, name } = values;

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);

      const response = await axios.post(
        `/remove-proxylist/${packageKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Proxy list removed successfully!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to remove proxy list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={3} style={{ textAlign: "center", color: "#c62828" }}>
        Remove Proxy List
      </Title>
      <Form form={form} layout="vertical" onFinish={handleRemove}>
        <Form.Item
          label="Package Key"
          name="packageKey"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter package key" />
        </Form.Item>
        <Form.Item label="Proxy List ID" name="id" rules={[{ required: true }]}>
          <Input placeholder="Enter proxy list ID" />
        </Form.Item>
        <Form.Item
          label="Proxy List Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter proxy list name" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading} danger>
            {loading ? <Spin /> : "Remove Proxy List"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeleteProxyList;
