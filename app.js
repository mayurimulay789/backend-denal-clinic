const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require ("cookie-parser");
import ErrorMiddleware from "./middlewares/Error.js";
const cors = require('cors');

const dotenv = require("dotenv");

dotenv.config();

// importing routes
import userRoutes from "./routes/userRoutes.js";

import sliderRoutes from "./routes/sliderRoutes.js";

import otherRoutes from "./routes/otherRoutes.js";

const app = express();

// using middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is working...");
});

// using routes
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/slider", sliderRoutes);

app.use("/api/v1/other", otherRoutes);


// CUSTOM ERROR HANDLER
app.use(ErrorMiddleware);


export default app;
