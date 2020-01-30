const express = require("express");
var mongoxlsx = require("mongo-xlsx");
var XLSX = require("xlsx");

module.exports = db => {
  const router = new express.Router();

  router.post('/search', function (req, res) {
    db.collection(collection)
      .findOne({ staffId: req.body.staffId })
      .then(user => {
        if (!user) {
          res.status(404).end();
        } else {
          res.json(user);
        }
      });
  });


  router.post("/bulkregister", (req, res) => {
    db.collection("users").drop();
    db.collection("users").insertMany(req.body, function (err1, result) {
      if (err1) {
        res.status(500).send();
        res.end();
      } else {
        res.status(200).end();
      }
    });
  });

  return router;
};
