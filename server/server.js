import express from "express";
import { env } from "./lib/env.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth.js";
import { requireApiSecret } from "./middleware/auth-middleware.js";

const isProduction = env.NODE_ENV === "production";

const app = express();

app.use(
  cors({
    origin: isProduction ? env.CLIENT_URL : true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-secret"],
    credentials: true,
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running!",
    environment: env.NODE_ENV,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
  });
});

app.listen(env.PORT, () => {
  console.log("Server is running on port", env.PORT);
});
