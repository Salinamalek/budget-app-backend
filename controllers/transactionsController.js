const express = require("express");
const transaction = express.Router();
const transactionArray = require("../model/transactions");
const { validateURL } = require("../model/validation");

//read
transaction.get("/", (req, res) => {
  res.status(200).json(transactionArray);
});

transaction.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionArray[index]) {
    res.status(200).json(transactionArray[index]);
  } else {
    res.redirect("/*");
  }
});

//new
transaction.post("/", validateURL, (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

//delete
transaction.delete("/:id", (req, res) => {
  transactionArray.pop(req.body);
  res.json(transactionArray.at({ id }));
});

//update
transaction.put("/:id", validateURL, (req, res) => {
  if (transactionArray[req.params.id]) {
    transactionArray[req.params.id] = req.body;
    res.status(200).json(transactionArray[req.params.id]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = transaction;
