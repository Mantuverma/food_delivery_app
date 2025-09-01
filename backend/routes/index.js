import express from "express";
import authRoute from "./auth.route.js";
const indexRoute = express.Router();

indexRoute.use("/auth", authRoute);

export default indexRoute;
