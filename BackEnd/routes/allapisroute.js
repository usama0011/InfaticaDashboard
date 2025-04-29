import express from "express";
import {
  createPackage,
  deactivatePackage,
  getAllKeys,
  getAllPackages,
  getAllProxyLists,
  getFilteredPackages,
  getOnlineStatistics,
  getPackageInfo,
  getStatistics,
  getTrafficUsage,
  prolongatePackage,
  resumePackage,
  suspendPackage,
  updatePackage,
  usageForAllPackages,
  usageForPackage,
  viewProxyList,
} from "../controllers/allapiscontroller.js";

const router = express.Router();
// POST route for traffic usage
router.post("/traffic-usage", getTrafficUsage);
router.post("/create-package", createPackage);
router.post("/update-package/:packageKey", updatePackage);
router.get("/get-package-info/:packageKey", getPackageInfo);
router.get("/get-all-packages", getAllPackages);
router.post("/get-filtered-packages", getFilteredPackages);
router.post("/prolongate-package/:packageKey", prolongatePackage);
router.post("/suspend-package/:packageKey", suspendPackage);
router.post("/resume-package/:packageKey", resumePackage);
router.post("/deactivate-package/:packageKey", deactivatePackage);
router.get("/usage-all", usageForAllPackages);
router.get("/usage-package/:packageKey", usageForPackage);
router.get("/proxy-lists/:packageKey", getAllProxyLists);
router.post("/view-proxy-list/:packageKey", viewProxyList);
router.get("/stats", getStatistics);
router.get("/online-stats", getOnlineStatistics);
router.get("/keys", getAllKeys);

export default router;
