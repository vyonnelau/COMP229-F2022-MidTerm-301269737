/////////////////////////////////////////////
//
//  File Name:      /server/routes/cars.js
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

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
// get the car list from DB and display on cars/index.ejs
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
//  when "Add a car" button is pressed, go to add.ejs
router.get("/add", (req, res, next) => {
  res.render("cars/add", {
    title: "Add a Car",
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
// add a car details from user's input and insert to DB
router.post("/add", (req, res, next) => {
  let newCar = car({
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });
  car.create(newCar, (err, car) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the car list
      res.redirect("/cars");
    }
  });
});

// GET the Car Details page in order to edit an existing Car
// when "Update" button is pressed, go to details.ejs
// with the particular car selected
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  car.findById(id, (err, cartoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", { 
        title: "Update Car Detail", 
        cars: cartoedit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
// update a car details from user's input and update the DB using the ID
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecar = car({
    _id: id,
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price: req.body.Price,
  });
  car.updateOne({ _id: id }, updatecar, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the car list
      res.redirect("/cars");
    }
  });
});

// when "Delete" button is pressed, go to delete.ejs
router.get("/delete", (req, res, next) => {
  res.render("cars/delete", {
    title: "Delete a Car",
  });
});

// POST - process the information passed from the delete page
// delete multiple DB entries by specifying Car Name and/or Price Range
// Car name is optional but Price range is mandatory
router.post("/delete", (req, res, next) => {
  // to delete
  // car name is not specified, only delete using price range
  if (req.body.Carname == "")
    myquery = { Price : { $gt :  req.body.minprice, $lt : req.body.maxprice}};
  else
    myquery = { Carname: req.body.Carname, Price : { $gt :  req.body.minprice, $lt : req.body.maxprice}};

  //car.find(myquery, function(err, cars) {
  car.deleteMany(myquery, function(err, cars) {
    if (err) throw err;
    console.log(myquery);
    console.log(cars + " document(s) deleted");
    res.redirect("/cars");
  });
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  car.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh car list
      res.redirect("/cars");
    }
  });
});

module.exports = router;
