import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { LockOutlined, UserOutlined, CodeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-black.svg";
import axios from "axios";
import "../styles/Login.css";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://infatica-dashboard-backend.vercel.app/api/stats/auth/login",
        values
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      message.success("Login successful!");
      navigate("/traffic-usage");
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <img src={logo} alt="Infatica Logo" className="login-logo" />
          <Title level={3} className="login-title">
            Welcome to Infatica.io
          </Title>
          <Text type="secondary">Admin Dashboard Login</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="login-button"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-link">
          <Text type="secondary">Don't have an account?</Text>{" "}
          <a href="/signup">Sign up</a>
        </div>
      </Card>

      <div className="login-footer">
        <CodeOutlined style={{ marginRight: "8px", fontSize: "16px" }} />
        <Text type="secondary">
          Developed by <strong>Muix</strong>
        </Text>
      </div>
    </div>
  );
};

export default Login;
