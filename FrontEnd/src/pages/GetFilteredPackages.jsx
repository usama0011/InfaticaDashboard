import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Table, Spin, message, Typography } from "antd";

const { Title } = Typography;

const GetFilteredPackages = () => {
  const [loading, setLoading] = useState(false);
  const [inputKeys, setInputKeys] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const handleFetch = async () => {
    const trimmedKeys = inputKeys.trim();

    if (!trimmedKeys) {
      message.error("Please enter at least one package key.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/get-filtered-packages", {
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

  const columns = [
    {
      title: "Package Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Expired At",
      dataIndex: "expired_at",
      key: "expired_at",
    },
    {
      title: "Traffic Used",
      dataIndex: "traffic_used",
      key: "traffic_used",
      render: (val) => val?.toLocaleString() || "N/A",
    },
    {
      title: "Common Limit",
      dataIndex: "limit_traffic_common",
      key: "limit_traffic_common",
      render: (val) => val?.toLocaleString() || "N/A",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Get Filtered Packages
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

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : filteredPackages.length > 0 ? (
        <Table
          dataSource={filteredPackages}
          columns={columns}
          rowKey="key"
          bordered
          pagination={{ pageSize: 6 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No packages found.</p>
      )}
    </div>
  );
};

export default GetFilteredPackages;
