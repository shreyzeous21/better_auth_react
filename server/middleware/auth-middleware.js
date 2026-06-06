import { auth } from "../lib/auth.js";
import { env } from "../lib/env.js";

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized!" });
    }
    req.user = session.user;
    req.session = session;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Authentication failed!" });
  }
};

export const requireApiSecret = (req, res, next) => {
  if (env.NODE_ENV !== "production") {
    return next();
  }

  const secret = req.headers["x-api-secret"];
  if (secret !== env.API_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Invalid API secret",
    });
  }

  next();
};
