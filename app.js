
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const smartBinRoutes = require("./api/routes/SmartBinRoutes");
const staffRoutes = require("./api/routes/StaffRoutes");
const userRoutes = require("./api/routes/UserRoutes");
const locationRoutes = require("./api/routes/LocationRoutes");
const binRoutes = require("./api/routes/BinRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


//Routes which should handle requests
app.use("/SmartBin", smartBinRoutes);
app.use("/Staff", staffRoutes);
app.use("/User", userRoutes);
app.use("/Bin", binRoutes);
app.use("/Location", locationRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.status + " " + error.message
        }
    });
});

module.exports = app;