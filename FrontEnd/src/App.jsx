import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Card, Button } from "antd";

import {
  CloudOutlined,
  PlusSquareOutlined,
  EditOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  StopOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DeploymentUnitOutlined,
  EyeOutlined,
  LineChartOutlined,
  KeyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./App.css";

import OurMainLogo from "../src/assets/logo-black.svg";
import Login from "./pages/Login";
import TrafficUsage from "./pages/TrafficUsage";
import CreatePackage from "./pages/CreatePackage";
import UpdatePackage from "./pages/UpdatePackage";
import GetPackageInfo from "./pages/GetPackageInfo";
import GetAllPackages from "./pages/GetAllPackages";
import GetFilteredPackages from "./pages/GetFilteredPackages";
import ProlongatePackage from "./pages/ProlongatePackage";
import DeactivatePackage from "./pages/DeactivatePackage";
import UsageAllPackages from "./pages/UsageAllPackages";
import UsageSinglePackage from "./pages/UsageSinglePackage";
import ProxyLists from "./pages/ProxyLists";
import ViewProxyList from "./pages/ViewProxyList";
import Statistics from "./pages/Statistics";
import KeysList from "./pages/KeysList";
import GenereteProxyList from "./pages/GenereteProxyList";
import DeleteProxyList from "./pages/DeleteProxyList";
import Signup from "./pages/Signup";
import RequireAuth from "./utils/RequireAuth";

const cards = [
  {
    title: "Traffic Usage",
    description: "Get detailed traffic consumption.",
    path: "/traffic-usage",
    icon: <CloudOutlined />,
  },
  {
    title: "Create Package",
    description: "Create a new proxy package.",
    path: "/create-package",
    icon: <PlusSquareOutlined />,
  },
  {
    title: "Update Package",
    description: "Update an existing package.",
    path: "/update-package",
    icon: <EditOutlined />,
  },
  {
    title: "Get Package Info",
    description: "Retrieve details of a specific package.",
    path: "/get-package-info",
    icon: <InfoCircleOutlined />,
  },
  {
    title: "All Packages",
    description: "View all packages.",
    path: "/all-packages",
    icon: <AppstoreOutlined />,
  },
  {
    title: "Filtered Packages",
    description: "Filter and view specific packages.",
    path: "/filtered-packages",
    icon: <FilterOutlined />,
  },
  {
    title: "Prolongate Package",
    description: "Extend a package's expiry date.",
    path: "/prolongate-package",
    icon: <ClockCircleOutlined />,
  },
  {
    title: "Deactivate Package",
    description: "Permanently deactivate a package.",
    path: "/deactivate-package",
    icon: <StopOutlined />,
  },
  {
    title: "Usage All Packages",
    description: "View overall usage.",
    path: "/usage-all-packages",
    icon: <BarChartOutlined />,
  },
  {
    title: "Usage Single Package",
    description: "View usage of one package.",
    path: "/usage-single-package",
    icon: <PieChartOutlined />,
  },
  {
    title: "Proxy Lists",
    description: "View proxy lists of a package.",
    path: "/proxy-lists",
    icon: <DeploymentUnitOutlined />,
  },
  {
    title: "View Proxy List",
    description: "View details of a proxy list.",
    path: "/view-proxy-list",
    icon: <EyeOutlined />,
  },
  {
    title: "Statistics",
    description: "Overall account traffic stats.",
    path: "/statistics",
    icon: <LineChartOutlined />,
  },
  {
    title: "Keys List",
    description: "List of all available package keys.",
    path: "/keys-list",
    icon: <KeyOutlined />,
  },
  {
    title: "Generate Proxy List",
    description: "Genreate Proxylist package keys.",
    path: "/genereateproxylist",
    icon: <KeyOutlined />,
  },
  {
    title: "Delete Proxy List",
    description: "View Proxylist Format.",
    path: "/removeproxylist",
    icon: <DeleteOutlined />,
  },
];

const Dashboard = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="App">
      {!isLoginPage && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={OurMainLogo} alt="" className="infoatdimage" />
            <Button
              type="primary"
              danger
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              style={{ marginRight: "20px" }}
            >
              Logout
            </Button>
          </div>
          <h1 className="mainilkj">Infatica.io Dashboard</h1>
          <div className="dashboard-grid">
            {cards.map((card, index) => (
              <Link to={card.path} key={index} className="dashboard-card-link">
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
        </>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* ✅ added */}
        {/* ✅ Protected Routes */}
        <Route
          path="/traffic-usage"
          element={
            <RequireAuth>
              <TrafficUsage />
            </RequireAuth>
          }
        />
        <Route
          path="/create-package"
          element={
            <RequireAuth>
              <CreatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/update-package"
          element={
            <RequireAuth>
              <UpdatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/get-package-info"
          element={
            <RequireAuth>
              <GetPackageInfo />
            </RequireAuth>
          }
        />
        <Route
          path="/all-packages"
          element={
            <RequireAuth>
              <GetAllPackages />
            </RequireAuth>
          }
        />
        <Route
          path="/filtered-packages"
          element={
            <RequireAuth>
              <GetFilteredPackages />
            </RequireAuth>
          }
        />
        <Route
          path="/prolongate-package"
          element={
            <RequireAuth>
              <ProlongatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/deactivate-package"
          element={
            <RequireAuth>
              <DeactivatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/usage-all-packages"
          element={
            <RequireAuth>
              <UsageAllPackages />
            </RequireAuth>
          }
        />
        <Route
          path="/usage-single-package"
          element={
            <RequireAuth>
              <UsageSinglePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/proxy-lists"
          element={
            <RequireAuth>
              <ProxyLists />
            </RequireAuth>
          }
        />
        <Route
          path="/view-proxy-list"
          element={
            <RequireAuth>
              <ViewProxyList />
            </RequireAuth>
          }
        />
        <Route
          path="/statistics"
          element={
            <RequireAuth>
              <Statistics />
            </RequireAuth>
          }
        />
        <Route
          path="/keys-list"
          element={
            <RequireAuth>
              <KeysList />
            </RequireAuth>
          }
        />
        <Route
          path="/genereateproxylist"
          element={
            <RequireAuth>
              <GenereteProxyList />
            </RequireAuth>
          }
        />
        <Route
          path="/removeproxylist"
          element={
            <RequireAuth>
              <DeleteProxyList />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}

export default App;
