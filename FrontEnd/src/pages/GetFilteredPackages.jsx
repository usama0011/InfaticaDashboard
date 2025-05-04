import React, { useState } from "react";
import axios from "../api";
import { Input, Button, Table, Spin, message, Typography, Tag } from "antd";

const { Title } = Typography;
const { Search } = Input;
import {
  KeyOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TagOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  BarsOutlined,
  DownloadOutlined,
  CloudOutlined,
  LockOutlined,
} from "@ant-design/icons";

const GetFilteredPackages = () => {
  const [loading, setLoading] = useState(false);
  const [inputKeys, setInputKeys] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loginFilter, setLoginFilter] = useState(""); // ✅ for login search

  const handleFetch = async () => {
    const trimmedKeys = inputKeys.trim();
    if (!trimmedKeys) {
      message.error("Please enter at least one package key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/get-filtered-packages", {
        packages: trimmedKeys,
      });
      setFilteredPackages(response.data?.results || []);
      message.success("Filtered packages fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch filtered packages.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter logic based on login field in lists
  const getFilteredByLogin = () => {
    if (!loginFilter.trim()) return filteredPackages;

    return filteredPackages.filter((pkg) =>
      pkg.lists?.some((item) =>
        item.login?.toLowerCase().includes(loginFilter.toLowerCase())
      )
    );
  };
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
      '<span style="background-color: #d4edda; color: green; font-weight: 600;">$1</span>'
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
          <ClockCircleOutlined /> Expired At
        </span>
      ),
      dataIndex: "expired_at",
      key: "expired_at",
      render: (val) => (val ? val : "Not Expired"),
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
          <PauseCircleOutlined /> Suspended
        </span>
      ),
      dataIndex: "is_suspended",
      key: "is_suspended",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: (
        <span>
          <CheckCircleOutlined /> Active
        </span>
      ),
      dataIndex: "is_active",
      key: "is_active",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: (
        <span>
          <BarsOutlined /> Proxy Count
        </span>
      ),
      dataIndex: "proxy_count",
      key: "proxy_count",
      render: (val) => val?.toLocaleString(),
    },
    {
      title: (
        <span>
          <DownloadOutlined /> Traffic Used - Daily (MB)
        </span>
      ),
      dataIndex: ["traffic_usage", "daily"],
      key: "usage_daily",
      render: (val) => bytesToMB(val),
    },
    {
      title: (
        <span>
          <DownloadOutlined /> Traffic Used - Weekly (MB)
        </span>
      ),
      dataIndex: ["traffic_usage", "weekly"],
      key: "usage_weekly",
      render: (val) => bytesToMB(val),
    },
    {
      title: (
        <span>
          <DownloadOutlined /> Traffic Used - Monthly (MB)
        </span>
      ),
      dataIndex: ["traffic_usage", "monthly"],
      key: "usage_monthly",
      render: (val) => bytesToMB(val),
    },
    {
      title: (
        <span>
          <DownloadOutlined /> Traffic Used - Common (MB)
        </span>
      ),
      dataIndex: ["traffic_usage", "common"],
      key: "usage_common",
      render: (val) => bytesToMB(val),
    },
    {
      title: (
        <span>
          <LockOutlined /> Proxy Lists
        </span>
      ),
      dataIndex: "lists",
      key: "lists",
      render: (lists) => {
        if (!lists || lists.length === 0) return "None";
        return (
          <div>
            {lists.map((item, idx) => (
              <div key={idx} style={{ marginBottom: 6 }}>
                <div>
                  <strong>Login:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(item.login || "", loginFilter),
                    }}
                  />
                </div>
                <div>
                  <strong>Password:</strong> {item.password}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Get Filtered Packages (Full Details)
      </Title>

      <Input.TextArea
        rows={3}
        placeholder="Enter comma-separated package keys (e.g., key1,key2,key3)"
        value={inputKeys}
        onChange={(e) => setInputKeys(e.target.value)}
        style={{ marginBottom: "15px" }}
      />

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Button
          type="primary"
          onClick={handleFetch}
          loading={loading}
          style={{ backgroundColor: "#003c8f", width: "220px" }}
        >
          Fetch Filtered Packages
        </Button>
      </div>

      {filteredPackages.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <Search
            placeholder="Filter by Proxy Login (e.g. zohaibSultan-cm)"
            allowClear
            enterButton="Search"
            value={loginFilter}
            onChange={(e) => setLoginFilter(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : getFilteredByLogin().length > 0 ? (
        <Table
          dataSource={getFilteredByLogin()}
          columns={columns}
          rowKey="package_key"
          bordered
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 100 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No packages found.</p>
      )}
    </div>
  );
};

export default GetFilteredPackages;
