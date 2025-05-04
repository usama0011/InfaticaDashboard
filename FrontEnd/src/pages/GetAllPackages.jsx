import React, { useEffect, useState } from "react";
import axios from "../api";
import {
  Table,
  Spin,
  message,
  Typography,
  Tag,
  Select,
  Row,
  Col,
  Input,
} from "antd";
import {
  KeyOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TagOutlined,
  BarsOutlined,
  DashboardOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const GetAllPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [keySearch, setKeySearch] = useState("");

  const fetchAllPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/get-all-packages");
      const data = response.data?.results || [];
      setPackages(data);
      setFilteredPackages(data);
      message.success("Packages fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  useEffect(() => {
    let filtered = [...packages];

    if (statusFilter !== "All") {
      filtered = filtered.filter((pkg) => pkg.status === statusFilter);
    }

    if (keySearch.trim()) {
      filtered = filtered.filter((pkg) =>
        pkg.package_key.toLowerCase().includes(keySearch.toLowerCase())
      );
    }

    setFilteredPackages(filtered);
  }, [statusFilter, keySearch, packages]);
  const bytesToMB = (bytes) => {
    if (bytes === null || bytes === undefined || bytes === false) return "N/A";
    const mb = bytes / 1048576;
    return `${mb.toFixed(2)} MB`;
  };
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      `<span style="background-color: #d4edda; color: green; font-weight: bold;">$1</span>`
    );
  };

  const columns = [
    {
      title: (
        <span>
          <KeyOutlined /> Package Key
        </span>
      ),
      dataIndex: "package_key",
      key: "package_key",
      render: (text) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightMatch(text, keySearch),
          }}
        />
      ),
    },
    {
      title: (
        <span>
          <CalendarOutlined /> Created At
        </span>
      ),
      dataIndex: "created_at",
      key: "created_at",
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: (
        <span>
          <ClockCircleOutlined /> Expired
        </span>
      ),
      dataIndex: "expired_at",
      key: "expired_at",
      render: (val) => (val ? new Date(val).toLocaleString() : "Not Expired"),
    },
    {
      title: (
        <span>
          <TagOutlined /> Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <Tag color={val === "Active" ? "green" : "red"}>{val}</Tag>
      ),
    },
    {
      title: (
        <span>
          <BarsOutlined /> Proxies
        </span>
      ),
      dataIndex: "proxy_count",
      key: "proxy_count",
    },
    {
      title: (
        <span>
          <DashboardOutlined /> Common Limit
        </span>
      ),
      dataIndex: ["traffic_limits", "common"],
      key: "limit_traffic_common",
      render: (val) => (val === false ? "Unlimited" : val.toLocaleString()),
    },
    {
      title: (
        <span>
          <DownloadOutlined /> Used Traffic (MB)
        </span>
      ),
      dataIndex: ["traffic_usage", "common"],
      key: "traffic_used",
      render: (val) => bytesToMB(val),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        All Packages
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={12}>
          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            style={{ width: "100%" }}
          >
            <Option value="All">All Status</Option>
            <Option value="Active">Active</Option>
            <Option value="Terminated">Terminated</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12}>
          <Input
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
            placeholder="Paste or type Package Key to search"
            allowClear
          />
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <Spin size="large" />
        </div>
      ) : filteredPackages.length > 0 ? (
        <Table
          dataSource={filteredPackages}
          columns={columns}
          rowKey="package_key"
          bordered
          pagination={{ pageSize: 100 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No packages found.</p>
      )}
    </div>
  );
};

export default GetAllPackages;
