// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "897498234u823u";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // you can use this in controllers if needed
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is invalid or expired" });
  }
};
