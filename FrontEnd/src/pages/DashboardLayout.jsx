import React from "react";
import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";
import OurMainLogo from "../assets/logo-black.svg";
import { cards } from "../utils/dashboardCards"; // Export your cards list to this file
import "../styles/DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <img src={OurMainLogo} alt="" className="infoatdimage" />
      <h1 className="mainilkj">Infatica.io Dashboard</h1>

      {/* Show dashboard cards only on root of dashboard (not in subroutes) */}
      {pathname === "/dashboard" || pathname === "/dashboard/" ? (
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <Link
              to={`/${card.path}`}
              key={index}
              className="dashboard-card-link"
            >
              <Card hoverable className="dashboard-card">
                <Card.Meta
                  title={
                    <span style={{ color: "#cb49b3" }}>
                      {card.icon} <br /> {card.title}
                    </span>
                  }
                  description={card.description}
                />
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default DashboardLayout;
