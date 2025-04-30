import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

export const getTrafficUsage = async (req, res) => {
  try {
    const { key, period } = req.fields;

    if (!key || !period) {
      return res.status(400).json({
        message: "Package key and period are required.",
      });
    }

    // ✅ Send data as FormData (not JSON)
    const formData = new FormData();
    formData.append("key", key);
    formData.append("period", period);

    const response = await axios.post(
      "https://api.infatica.io/traffic-details",
      formData,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          ...formData.getHeaders(), // ✅ Required to set proper multipart boundaries
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching traffic usage:", error.message);
    res.status(500).json({
      message: "Failed to fetch traffic usage",
      error: error.message,
    });
  }
};

// Controller 2: Create New Package
export const createPackage = async (req, res) => {
  try {
    const {
      expired_at,
      limit_traffic_common,
      limit_traffic_monthly,
      limit_traffic_weekly,
      limit_traffic_daily,
    } = req.body;

    const response = await axios.post(
      "https://api.infatica.io/package",
      {
        expired_at,
        limit_traffic_common,
        limit_traffic_monthly,
        limit_traffic_weekly,
        limit_traffic_daily,
      },
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating package:", error.message);
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed to create package", error: error.message });
  }
};

// Controller 3: Update Package
export const updatePackage = async (req, res) => {
  try {
    const { packageKey } = req.params;
    const {
      limit_traffic_common,
      limit_traffic_monthly,
      limit_traffic_weekly,
      limit_traffic_daily,
    } = req.body;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}`,
      {
        limit_traffic_common,
        limit_traffic_monthly,
        limit_traffic_weekly,
        limit_traffic_daily,
      },
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating package:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update package", error: error.message });
  }
};

// Controller 4: Get Package Information
export const getPackageInfo = async (req, res) => {
  try {
    const { packageKey } = req.params;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.get(
      `https://api.infatica.io/package/${packageKey}`,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching package info:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch package info", error: error.message });
  }
};

// Controller 5: Get All Packages Information
export const getAllPackages = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/packages", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching all packages:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch all packages", error: error.message });
  }
};

// Controller 6: Get Filtered Packages Information
export const getFilteredPackages = async (req, res) => {
  try {
    const { packages } = req.body;

    if (!packages) {
      return res
        .status(400)
        .json({ message: "Packages field is required in request body." });
    }

    const response = await axios.post(
      "https://api.infatica.io/packages",
      { packages },
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching filtered packages:", error.message);
    res.status(500).json({
      message: "Failed to fetch filtered packages",
      error: error.message,
    });
  }
};

// Controller 7: Prolongate Package
export const prolongatePackage = async (req, res) => {
  try {
    const { packageKey } = req.params;
    const { expired_at } = req.body;

    if (!packageKey || !expired_at) {
      return res
        .status(400)
        .json({ message: "Package key and expired_at are required." });
    }

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/prolongate`,
      { expired_at },
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error prolongating package:", error.message);
    res
      .status(500)
      .json({ message: "Failed to prolongate package", error: error.message });
  }
};

// Controller 8: Suspend Package
export const suspendPackage = async (req, res) => {
  try {
    const { packageKey } = req.params;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/suspend`,
      {},
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error suspending package:", error.message);
    res
      .status(500)
      .json({ message: "Failed to suspend package", error: error.message });
  }
};
// Controller 9: Resume Package
export const resumePackage = async (req, res) => {
  try {
    const { packageKey } = req.params;
    const {
      expired_at,
      limit_traffic_common,
      limit_traffic_monthly,
      limit_traffic_weekly,
      limit_traffic_daily,
    } = req.body;

    if (!packageKey || !expired_at) {
      return res
        .status(400)
        .json({ message: "Package key and expired_at are required." });
    }

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/resume`,
      {
        expired_at,
        limit_traffic_common,
        limit_traffic_monthly,
        limit_traffic_weekly,
        limit_traffic_daily,
      },
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error resuming package:", error.message);
    res
      .status(500)
      .json({ message: "Failed to resume package", error: error.message });
  }
};
// Controller 10: Deactivate Package
export const deactivatePackage = async (req, res) => {
  try {
    const { packageKey } = req.params;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/deactivate`,
      {},
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error deactivating package:", error.message);
    res
      .status(500)
      .json({ message: "Failed to deactivate package", error: error.message });
  }
};

// Controller 11: Usage for All Packages
export const usageForAllPackages = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/usage", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching usage for all packages:", error.message);
    res.status(500).json({
      message: "Failed to fetch usage for all packages",
      error: error.message,
    });
  }
};

// Controller 12: Usage for a Single Package
export const usageForPackage = async (req, res) => {
  try {
    const { packageKey } = req.params;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.get(
      `https://api.infatica.io/package/${packageKey}/usage`,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching usage for package:", error.message);
    res.status(500).json({
      message: "Failed to fetch usage for package",
      error: error.message,
    });
  }
};

// Controller 13: Get All Proxy Lists for a Package
export const getAllProxyLists = async (req, res) => {
  try {
    const { packageKey } = req.params;

    if (!packageKey) {
      return res
        .status(400)
        .json({ message: "Package key is required in URL params." });
    }

    const response = await axios.get(
      `https://api.infatica.io/package/${packageKey}/lists`,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching proxy lists:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch proxy lists", error: error.message });
  }
};
export const viewProxyList = async (req, res) => {
  try {
    const { packageKey } = req.params;
    const fields = req.body;

    if (!packageKey || !fields?.id || !fields?.name) {
      return res
        .status(400)
        .json({ message: "Package key, id, and name are required." });
    }

    // 🔧 Build form-data payload
    const formData = new FormData();
    formData.append("id", fields.id);
    formData.append("name", fields.name);

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/viewlist`,
      formData,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          ...formData.getHeaders(), // required for multipart/form-data
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error viewing proxy list:", error.message);
    res.status(500).json({
      message: "Failed to view proxy list",
      error: error.message,
    });
  }
};
// Controller 15: Get Statistics
export const getStatistics = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/stats", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching statistics:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch statistics", error: error.message });
  }
};
// Controller 16: Get Online Residential Statistics
export const getOnlineStatistics = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/nodes-info", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching online statistics:", error.message);
    res.status(500).json({
      message: "Failed to fetch online statistics",
      error: error.message,
    });
  }
};
// Controller 17: Get All Available Keys
export const getAllKeys = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/keys", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching all available keys:", error.message);
    console.log(error.message);
    res.status(500).json({
      message: "Failed to fetch available keys",
      error: error.message,
    });
  }
};

export const generateProxyList = async (req, res) => {
  try {
    const { packagekey } = req.params;
    const fields = req.body;
    console.log(fields); // should now print a proper object

    const formData = new FormData();
    Object.entries(fields).forEach(([key, val]) => {
      if (val && val.trim() !== "") {
        formData.append(key, val);
      }
    });

    const response = await axios.post(
      `https://api.infatica.io/package/${packagekey}/generate`,
      formData,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          ...formData.getHeaders(),
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error generating proxy list:", error.message);
    res.status(500).json({
      message: "Failed to generate proxy list",
      error: error.message,
    });
  }
};

export const getProxyListFormats = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/formats", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6", // or replace with your API key directly
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching proxy list formats:", error.message);
    res.status(500).json({
      message: "Failed to fetch proxy list formats",
      error: error.message,
    });
  }
};

export const removeProxyList = async (req, res) => {
  try {
    const { packageKey } = req.params;
    const { id, name } = req.fields; // <-- use fields instead of body

    if (!packageKey || !id || !name) {
      return res.status(400).json({
        message: "Package key, id, and name are required.",
      });
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);

    const response = await axios.post(
      `https://api.infatica.io/package/${packageKey}/removelist`,
      formData,
      {
        headers: {
          "api-key": "7cv9Bz2CZQvuWQL65OD6",
          ...formData.getHeaders(),
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error removing proxy list:", error.message);
    res.status(500).json({
      message: "Failed to remove proxy list",
      error: error.message,
    });
  }
};
// Controller 20: Get Available Countries for Proxylist
export const getProxyCountries = async (req, res) => {
  try {
    const response = await axios.get("https://api.infatica.io/countries", {
      headers: {
        "api-key": "7cv9Bz2CZQvuWQL65OD6", // Replace with env var in production
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({
      message: "Failed to fetch countries",
      error: error.message,
    });
  }
};
