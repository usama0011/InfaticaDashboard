import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card } from "antd";
import {
  CloudOutlined,
  PlusSquareOutlined,
  EditOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DeploymentUnitOutlined,
  EyeOutlined,
  LineChartOutlined,
  GlobalOutlined,
  KeyOutlined,
  DeleteOutlined,
  HeatMapOutlined,
} from "@ant-design/icons"; // Ant Design Icons imported
import OurMainLogo from "../src/assets/logo-black.svg";
import TrafficUsage from "./pages/TrafficUsage";
import CreatePackage from "./pages/CreatePackage";
import UpdatePackage from "./pages/UpdatePackage";
import GetPackageInfo from "./pages/GetPackageInfo";
import GetAllPackages from "./pages/GetAllPackages";
import GetFilteredPackages from "./pages/GetFilteredPackages";
import ProlongatePackage from "./pages/ProlongatePackage";
import SuspendPackage from "./pages/SuspendPackage";
import ResumePackage from "./pages/ResumePackage";
import DeactivatePackage from "./pages/DeactivatePackage";
import UsageAllPackages from "./pages/UsageAllPackages";
import UsageSinglePackage from "./pages/UsageSinglePackage";
import ProxyLists from "./pages/ProxyLists";
import ViewProxyList from "./pages/ViewProxyList";
import Statistics from "./pages/Statistics";
import OnlineStats from "./pages/OnlineStats";
import KeysList from "./pages/KeysList";
import "./App.css";
import GenereteProxyList from "./pages/GenereteProxyList";
import FormatsList from "./pages/FormatsList";
import DeleteProxyList from "./pages/DeleteProxyList";
import ProxyCountries from "./pages/ProxyCountries";

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
    title: "Suspend Package",
    description: "Temporarily suspend a package.",
    path: "/suspend-package",
    icon: <PauseCircleOutlined />,
  },
  {
    title: "Resume Package",
    description: "Resume a suspended package.",
    path: "/resume-package",
    icon: <PlayCircleOutlined />,
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
  // {
  //   title: "Online Stats",
  //   description: "Country-wise online residential proxies.",
  //   path: "/online-stats",
  //   icon: <GlobalOutlined />,
  // },
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
    title: "Proxy Format",
    description: "View Proxylist Format.",
    path: "/viewproxyformat",
    icon: <KeyOutlined />,
  },
  {
    title: "Delete Proxy List",
    description: "View Proxylist Format.",
    path: "/removeproxylist",
    icon: <DeleteOutlined />,
  },
  // {
  //   title: "Proxy Countries",
  //   description: "List of Proxy Countries!.",
  //   path: "/proxycountries",
  //   icon: <HeatMapOutlined />,
  // },
];

function App() {
  return (
    <Router>
      <div className="App">
        <img src={OurMainLogo} alt="" className="infoatdimage" />
        <h1 className="mainilkj">Infatica.io Dashobard</h1>
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
        <br />
        <Routes>
          <Route path="/traffic-usage" element={<TrafficUsage />} />
          <Route path="/create-package" element={<CreatePackage />} />
          <Route path="/update-package" element={<UpdatePackage />} />
          <Route path="/get-package-info" element={<GetPackageInfo />} />
          <Route path="/all-packages" element={<GetAllPackages />} />
          <Route path="/filtered-packages" element={<GetFilteredPackages />} />
          <Route path="/prolongate-package" element={<ProlongatePackage />} />
          <Route path="/suspend-package" element={<SuspendPackage />} />
          <Route path="/resume-package" element={<ResumePackage />} />
          <Route path="/deactivate-package" element={<DeactivatePackage />} />
          <Route path="/usage-all-packages" element={<UsageAllPackages />} />
          <Route
            path="/usage-single-package"
            element={<UsageSinglePackage />}
          />
          <Route path="/proxy-lists" element={<ProxyLists />} />
          <Route path="/view-proxy-list" element={<ViewProxyList />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* <Route path="/online-stats" element={<OnlineStats />} /> */}
          <Route path="/keys-list" element={<KeysList />} />
          <Route path="/genereateproxylist" element={<GenereteProxyList />} />
          <Route path="/viewproxyformat" element={<FormatsList />} />
          <Route path="/removeproxylist" element={<DeleteProxyList />} />
          {/* <Route path="/proxycountries" element={<ProxyCountries />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
