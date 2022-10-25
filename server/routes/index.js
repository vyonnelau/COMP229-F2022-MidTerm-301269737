/////////////////////////////////////////////
//
//  File Name:      /server/models/index.js
//  Author:         Lau, Wai Yung
//  Student ID:     301269737
//  Date:           25 Oct 2022
//  Web app name:   https://my-vy-app.herokuapp.com/
//
/////////////////////////////////////////////

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let car = require("../models/cars");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    cars: "",
  });
});

module.exports = router;
