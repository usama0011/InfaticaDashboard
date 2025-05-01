import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import logo from "../assets/logo-black.svg";

const { Title } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://infatica-dashboard-backend.vercel.app/api/stats",
        values
      );
      message.success("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      message.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <img src={logo} alt="logo" className="login-logo" />
          <Title level={3} className="login-title">
            Create Your Account
          </Title>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="John Doe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="johndoe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="******"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
              block
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Already have an account? <a href="/login">Login here</a>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
