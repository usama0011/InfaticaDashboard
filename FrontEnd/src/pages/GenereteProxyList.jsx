import React, { useState } from "react";
import axios from "../api";
import {
  Form,
  Input,
  Button,
  Typography,
  Spin,
  message,
  Row,
  Col,
  Select,
  Modal,
} from "antd";
import { saveAs } from "file-saver";

const { Title } = Typography;

const GenereteProxyList = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [csvModalVisible, setCsvModalVisible] = useState(false);
  const [csvFilename, setCsvFilename] = useState("proxy_list");
  const [storedPackageKey, setStoredPackageKey] = useState("");
  const [csvLoading, setCsvLoading] = useState(false);

  const handleGenerate = async (values) => {
    try {
      setLoading(true);
      const { packagekey, ...fields } = values;
      setStoredPackageKey(packagekey); // ✅ Save package key

      // ✅ Convert to FormData
      const formData = new FormData();
      Object.entries(fields).forEach(([key, val]) => {
        if (val && val.trim() !== "") {
          formData.append(key, val);
        }
      });

      const response = await axios.post(
        `/generate-proxylist/${packagekey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setModalData(response.data); // store response data
        setModalVisible(true); // show modal
        message.success("Proxy list generated successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to generate proxy list.");
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadCSV = async () => {
    setCsvLoading(true); // ⏳ Start loading

    const packageKey = storedPackageKey; // ✅ use stored value
    const id = modalData?.results?.id;
    const name = modalData?.results?.name;

    if (!packageKey || !id || !name) {
      return message.error("Missing required proxy list identifiers.");
    }

    try {
      const response = await axios.post(`/view-proxy-list/${packageKey}`, {
        id,
        name,
      });

      const proxyList = response.data || [];

      const parsedData = proxyList.map((proxyStr) => {
        const [auth, hostPort] = proxyStr.split("@");
        const [ip, port] = hostPort?.split(":") || [];
        return [ip, port, "HTTP", proxyStr];
      });

      const headers = ["IP", "Port", "Type", "Proxy String"];
      const csvContent = [headers, ...parsedData]
        .map((row) =>
          row
            .map((cell) =>
              typeof cell === "string" && cell.includes(",")
                ? `"${cell}"`
                : cell
            )
            .join(",")
        )
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${csvFilename || "proxy_list"}.csv`);

      setCsvModalVisible(false);
      message.success("CSV downloaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch or download proxy list.");
    } finally {
      setCsvLoading(false); // ✅ Stop loading
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
          name="packagekey"
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
        {/* Optional Fields */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Proxy List Password" name="proxy-list-password">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="proxy-list-country">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Region" name="proxy-list-region">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City" name="proxy-list-city">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ISP" name="proxy-list-isp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ZIP Code" name="proxy-list-zip">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Rotation Period (seconds)"
              name="proxy-list-rotation-period"
            >
              <Input type="number" placeholder="e.g. 3600" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Rotation Mode" name="proxy-list-rotation-mode">
              <Select placeholder="Select a rotation mode">
                <Select.Option value="0">0 - Instant</Select.Option>
                <Select.Option value="1">1 - 5 seconds</Select.Option>
                <Select.Option value="2">2 - No rotation</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Network" name="proxy-list-network">
              <Input placeholder="IP, subnet, or list" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Proxy List Format" name="proxy-list-format">
              <Select placeholder="Select a format">
                <Select.Option value="1">
                  login:password@host:port
                </Select.Option>
                <Select.Option value="2">
                  host,port,login,password
                </Select.Option>
                <Select.Option value="3">
                  http://login:password@host:port
                </Select.Option>
                <Select.Option value="4">
                  socks5://login:password@host:port
                </Select.Option>
                <Select.Option value="5">
                  login:password:host:port
                </Select.Option>
                <Select.Option value="6">
                  host:port:login:password
                </Select.Option>
                <Select.Option value="7">
                  login@password@host@port
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
      <Modal
        title="✅ Proxy List Generated"
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        okText="Close"
        footer={[
          <Button
            key="download"
            onClick={() => {
              console.log("Download button clicked");
              setCsvModalVisible(true);
            }}
          >
            Download CSV
          </Button>,
          <Button
            key="close"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            Close
          </Button>,
        ]}
      >
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(modalData, null, 2)}
        </pre>
      </Modal>
      <Modal
        title="Download Proxy List as CSV"
        open={csvModalVisible}
        onCancel={() => setCsvModalVisible(false)}
        okText={csvLoading ? <Spin size="small" /> : "Download"}
        okButtonProps={{ disabled: csvLoading }}
        onOk={handleDownloadCSV}
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter CSV file name"
          value={csvFilename}
          onChange={(e) => setCsvFilename(e.target.value)}
          disabled={csvLoading}
        />
      </Modal>
    </div>
  );
};

export default GenereteProxyList;
