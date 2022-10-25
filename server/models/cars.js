/////////////////////////////////////////////
//
//  File Name:      /server/models/cars.js
//  Author:         Lau, Wai Yung
//  Student ID:     301269737
//  Date:           25 Oct 2022
//  Web app name:   https://my-vy-app.herokuapp.com/
//
/////////////////////////////////////////////

let mongoose = require("mongoose");

// create a model class with schema:
// Carname: String, Category: String, Carmodel: String, Price: Number
// with collection named as "cars"
let Car = mongoose.Schema(
  {
    Carname: String,
    Category: String,
    Carmodel: String,
    Price: Number,
  },
  {
    collection: "cars",
  }
);

module.exports = mongoose.model("Car", Car);
