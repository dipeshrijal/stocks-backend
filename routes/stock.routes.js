const express = require("express");
const Stock = require("../schema/stock.schema");

const router = express.Router();

router.get("/stocks", async (req, res) => {
  try {
    let status = {};
    if (req.query.status === "profit") status = { sum: { $gte: 0 } };
    if (req.query.status === "loss") status = { sum: { $lte: 0 } };

    let match = req.query.symbol
      ? { symbol: req.query.symbol.toUpperCase() }
      : {};

    var someDate = new Date();
    var numberOfDaysToSubstract = req.query.date;
    var result = someDate.setDate(someDate.getDate() - numberOfDaysToSubstract);

    const aggregrate = Stock.aggregate([]);
    const stocks = await aggregrate
      .match(match)
      .match({ date: { $gte: new Date(result) } })
      .group({
        _id: "$symbol",
        sum: { $sum: "$amount" },
      })
      .match(status)
      .sort({ sum: "desc" });

    res.send(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.get("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    var today = new Date();
    var numberOfDaysToSubstract = req.query.date || 1500;
    var result = today.setDate(today.getDate() - numberOfDaysToSubstract);

    const stocks = await Stock.find({
      symbol: id.toUpperCase(),
      date: { $gte: new Date(result) },
    }).sort("date action");
    res.send(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
