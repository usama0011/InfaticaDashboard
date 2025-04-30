import express from "express";
import formidable from "express-formidable";

import {
  createPackage,
  deactivatePackage,
  generateProxyList,
  getAllKeys,
  getAllPackages,
  getAllProxyLists,
  getFilteredPackages,
  getOnlineStatistics,
  getPackageInfo,
  getProxyCountries,
  getProxyListFormats,
  getStatistics,
  getTrafficUsage,
  prolongatePackage,
  removeProxyList,
  resumePackage,
  suspendPackage,
  updatePackage,
  usageForAllPackages,
  usageForPackage,
  viewProxyList,
} from "../controllers/allapiscontroller.js";
import multer from "multer";
const router = express.Router();
const upload = multer(); // default: stores in memory
// POST route for traffic usage
router.post("/traffic-usage", formidable(), getTrafficUsage);
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
router.post(
  "/generate-proxylist/:packagekey",
  upload.none(), // ⬅️ Parse form-data
  generateProxyList
);
router.post("/remove-proxylist/:packageKey", formidable(), removeProxyList);

router.get("/proxylist-formats", getProxyListFormats);
router.get("/proxy-countries", getProxyCountries);

export default router;
