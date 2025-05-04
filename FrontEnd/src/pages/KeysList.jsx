import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Spin, Typography, message } from "antd";

const { Title } = Typography;

const KeysList = () => {
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/keys");
      const rawKeys = response.data?.results || [];
      const formattedKeys = rawKeys.map((key, index) => ({
        id: index,
        packageKey: key,
      }));
      setKeys(formattedKeys);
      message.success("Package keys fetched successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch package keys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);
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
      title: "# No",
      key: "index",
      render: (text, record, index) => index,
      width: 80,
    },
    {
      title: "Package Key",
      dataIndex: "packageKey",
      key: "packageKey",
      render: (text) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightMatch(text, searchText),
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#003c8f" }}>
        Available Package Keys
      </Title>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by Package Key"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : keys.length > 0 ? (
        <Table
          dataSource={keys.filter((item) =>
            item.packageKey.toLowerCase().includes(searchText.toLowerCase())
          )}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 100 }}
        />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No keys available.</p>
      )}
    </div>
  );
};

export default KeysList;

//Available Package Keys
