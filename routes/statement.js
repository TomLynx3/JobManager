const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const moment = require("moment");

const JobsCash = require("../models/JobsCash");
const LogsCash = require("../models/LogsCash");

const Material = require("../models/Material");

//Updated
// @route   POST api/statement/cash
//@ desc    post a log for cash
//@access   Private

router.post("/cash", auth, async (req, res) => {
  const { amount, date, description } = req.body;

  try {
    const newLog = new LogsCash({
      date: moment(date).format("dddd, MMMM DD YYYY"),
      amount,
      description,
      user: req.user.id,
    });
    const log = await newLog.save();
    res.json({ msg: "Cash Balance was succesfully edited", log });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

//Updated
// @route   GET api/statement/cash/logs
//@ desc    Get cash logs.
//@access   Private
router.get("/cash/logs", auth, async (req, res) => {
  try {
    let logs = await LogsCash.find({ user: req.user.id }, null, {
      limit: 10,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

//Updated
// @route   Delete api/statement/cash/logs
//@ desc    delete cash logs.
//@access   Private

router.delete("/cash/logs/:id", auth, async (req, res) => {
  try {
    let log = await LogsCash.findById(req.params.id);

    if (!log) return res.status(404).json({ error: "Log Not Found" });
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    await LogsCash.findByIdAndRemove(req.params.id);
    res.json({ msg: "Log deleted", _id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   GET api/statement/cash
//@ desc    get statement for cash
//@access   Private
router.get("/cash", auth, async (req, res) => {
  try {
    const jobs = await JobsCash.find({ user: req.user.id });
    const logs = await LogsCash.find({ user: req.user.id });
    const jobs_total = jobs.reduce(function (acc, obj) {
      return acc + obj.total_earned;
    }, 0);

    const logs_total = logs.reduce(function (acc, obj) {
      return acc + obj.amount;
    }, 0);

    const result = jobs_total - logs_total;
    res.json(result.toFixed(2));
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   Post api/statement/material
//@ desc   Add Material
//@access   Private

router.post("/material", auth, async (req, res) => {
  const { amount, date, description, type } = req.body;

  try {
    const newMaterial = new Material({
      date: moment(date).format("dddd, MMMM DD YYYY"),
      amount,
      description,
      type,
      user: req.user.id,
    });
    const material = await newMaterial.save();

    res.status(200).json({ msg: `${type} was successfully added`, material });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   POST api/statement/getmaterial
//@ desc    Get All Material items for period.
//@access   Private.
router.post("/getmaterial", auth, async (req, res) => {
  const { from, to } = req.body;

  let days = [];
  const getDays = (from, to) => {
    if (from == undefined && to == undefined) {
      const curr = moment();
      if (curr.date() <= 15) {
        const periodStart = moment(curr).startOf("month");
        const periodEnd = moment(curr).startOf("month").add(14, "days");
        for (let i = periodStart.date(); i <= periodEnd.date(); i++) {
          let current = moment(periodStart)
            .date(i)
            .format("dddd, MMMM DD YYYY");
          days.push(current);
        }
      } else {
        const periodStart = moment(curr).startOf("month").add(15, "days");
        const periodEnd = moment(curr).endOf("month");
        for (let i = periodStart.date(); i <= periodEnd.date(); i++) {
          let current = moment(periodStart)
            .date(i)
            .format("dddd, MMMM DD YYYY");
          days.push(current);
        }
      }
    } else {
      const periodStart = moment(from);
      const periodEnd = moment(to);
      for (let i = periodStart.date(); i <= periodEnd.date(); i++) {
        let current = moment(periodStart).date(i).format("dddd, MMMM DD YYYY");
        days.push(current);
      }
    }
  };

  try {
    getDays(from, to);

    let material = await Material.find({
      date: { $in: days },
      user: req.user.id,
    });

    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   DELETE api/statement/material
//@ desc    DELETE Material Item
//@access   Private
router.delete("/material/:id", auth, async (req, res) => {
  try {
    let materialItem = await Material.findById(req.params.id);

    if (!materialItem)
      return res.status(404).json({ error: "Can't find material item.." });
    //Make sure user has permissions owns job
    if (materialItem.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    await Material.findByIdAndRemove(req.params.id);
    res.json({ msg: "Material item deleted successfully", _id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
