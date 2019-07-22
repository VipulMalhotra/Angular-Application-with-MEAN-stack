var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json({success: true, data : products});
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  console.log(req)
  if(req.body['isbn'] === undefined || req.body['title'] === undefined) {
    res.json({success: false, message : "Invalid Parameter"})
  } else {
    Book.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json({success: true, message: "Book posted successfully.", data: post})
    });
    
  }
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
    if (err) return next(err);
    console.log(post)
    res.json({success: true, message: "Book upated successfully.", data: post})
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({success: true, message: "Book deleted successfully."})
  });
});

module.exports = router;