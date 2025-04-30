import React, { useEffect, useState } from "react";
import axios from "../api";
import { Table, Typography, Spin, message } from "antd";

const { Title } = Typography;

const ProxyCountries = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("/proxy-countries");
        const data = response.data || {};

        // Convert object to array of { code, name }
        const formatted = Object.entries(data).map(([code, name]) => ({
          code,
          name,
        }));

        setCountries(formatted);
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const columns = [
    {
      title: "Country Code",
      dataIndex: "code",
      key: "code",
      width: 150,
    },
    {
      title: "Country Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "30px" }}>
      <Title level={3} style={{ textAlign: "center", color: "#003c8f" }}>
        Available Proxy Countries
      </Title>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={countries}
          columns={columns}
          rowKey="code"
          bordered
          pagination={{ pageSize: 20 }}
        />
      )}
    </div>
  );
};

export default ProxyCountries;
