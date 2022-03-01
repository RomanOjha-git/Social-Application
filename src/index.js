import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "../router/route.js";
import storageRouter from "../router/storageRoute.js";
import google_OAuth_route from "../router/google_OAuth_route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { httpServer, app } from "../socket/io.js";
dotenv.config();
const PORT = process.env.PORT;
app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cookieParser());
app.unsubscribe(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
import("../db/userDataConnection.js");
import("../db/userStorageConnection.js");

// Connection router
app.use(router);
app.use(storageRouter);
import "../socket/io.js";

// using google authentication function

app.use(google_OAuth_route);

// listening to a 'PORT'
httpServer.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
