const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const path = require("path");
const pdf = require("pdf-parse");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const Jobs = require("../models/Jobs");
const JobsCash = require("../models/JobsCash");
const Material = require("../models/Material");

// @route   GET api/jobs
//@ desc    Get current day jobs
//@access   Private
router.get("/", auth, async (req, res) => {
  let today = moment().format("dddd, MMMM DD YYYY");

  try {
    const jobs = await Jobs.find({ date: today, user: req.user.id });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   GET api/jobs/week
//@ desc    Get current week jobs
//@access   Private
router.get("/week", auth, async (req, res) => {
  let curr = moment();
  let days = [];
  let from_date = curr.startOf("week");

  for (i = 1; i <= 7; i++) {
    days.push(
      moment(from_date + 1)
        .add(i, "days")
        .format("dddd, MMMM DD YYYY")
    );
  }
  try {
    const jobs = await Jobs.find({ date: { $in: days }, user: req.user.id });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

//Updated
// @route  POST api/jobs/filtred
//@ desc    Get filtred jobs
//@access   Private
router.post("/filtred", auth, async (req, res) => {
  const { address, date, invoice } = req.body;

  try {
    if (address !== "") {
      const jobs = await Jobs.find({ user: req.user.id });
      const cashJobs = await JobsCash.find({ user: req.user.id });
      const jobFiltred = jobs.filter((job) => {
        const regex = new RegExp(address, "gi");
        return job.address.match(regex);
      });
      const cashFiltred = cashJobs.filter((job) => {
        const regex = new RegExp(address, "gi");
        return job.address.match(regex);
      });

      res.json({ cashFiltred: cashFiltred, jobFiltred: jobFiltred });
    }
    if (invoice !== "") {
      const jobs = await Jobs.find({
        invoice: { $in: invoice },
        user: req.user.id,
      });
      res.json({ cashFiltred: null, jobFiltred: jobs });
    }
    if (date !== "") {
      const dateFormat = moment(date).format("dddd, MMMM DD YYYY");
      const jobs = await Jobs.find({
        date: { $in: dateFormat },
        user: req.user.id,
      });
      const cash = await JobsCash.find({
        date: { $in: dateFormat },
        user: req.user.id,
      });

      res.json({ cashFiltred: cash, jobFiltred: jobs });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   POST   api/jobs/filtredweek
//@ desc    Get current day jobs
//@access   Private
router.post("/filtredweek", auth, async (req, res) => {
  const { date } = req.body;

  let curr = moment(date);
  let days = [];
  let from_date = curr.startOf("week");

  for (i = 1; i <= 7; i++) {
    days.push(
      moment(from_date + 1)
        .add(i, "days")
        .format("dddd, MMMM DD YYYY")
    );
  }

  try {
    const jobsFiltred = await Jobs.find({
      date: { $in: days },
      user: req.user.id,
    });
    res.json(jobsFiltred);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   POST api/jobs
//@ desc    Add new job
//@access   Private
router.post(
  "/",
  [auth, [check("address", "Address is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      date,
      company,
      address,
      invoice,
      amount,
      material,
      description,
      percentage,
      type,
    } = req.body;

    const taxes = amount * 0.13;

    const newJob = new Jobs({
      date: moment(date).format("dddd, MMMM DD YYYY"),
      invoice,
      address,
      amount,
      worker: req.user.name,
      unpaid: true,
      material,
      company,
      type,
      description,
      taxes: Number(taxes).toFixed(2),
      user: req.user.id,
    });

    try {
      if (type == "Service") {
        switch (company) {
          case "Express":
            newJob.total_earned = Number(amount / 2).toFixed(2);
            break;
          case "Energy":
            newJob.total_earned = Number(amount).toFixed(2);
            break;
        }
        const job = await newJob.save();
        res.json({ msg: "Job Successfully Added", job });
      } else {
        let commission = Number(percentage / 100);
        switch (commission) {
          case 0.1:
            newJob.type = "Excavation";
            newJob.total_earned = Number(amount * commission).toFixed(2);
          case 0.35:
            newJob.type = "Excavation";
            newJob.total_earned = Number(amount * commission).toFixed(2);
          case 0.45:
            newJob.type = "Excavation";
            newJob.total_earned = Number(amount * commission).toFixed(2);
        }
        const job = await newJob.save();
        res.json({ msg: "Job Successfully Added", job });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: "Server error" });
    }
  }
);

// @route   PUT api/jobs/:id
//@ desc    Update job
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    date,
    company,
    invoice,
    address,
    amount,
    material,
    description,
    unpaid,
    type,

    percentage,
  } = req.body;

  //Build job object
  const jobFields = {};
  if (date) jobFields.date = moment(date).format("dddd, MMMM DD YYYY");
  if (company) jobFields.company = company;
  if (address) jobFields.address = address;
  if (invoice) jobFields.invoice = invoice;
  if (amount) jobFields.amount = amount;
  if (material) jobFields.material = material;
  if (description) jobFields.description = description;
  if (type) jobFields.type = type;
  if (unpaid) jobFields.unpaid = unpaid;

  if (type == "Service") {
    switch (company) {
      case "Express":
        jobFields.total_earned = Number(amount / 2).toFixed(2);
        break;
      case "Energy":
        jobFields.total_earned = Number(amount).toFixed(2);
        break;
    }
  } else {
    let commission = Number(percentage / 100);
    switch (commission) {
      case 0.1:
        jobFields.type = "Excavation";
        jobFields.total_earned = Number(amount * commission).toFixed(2);
      case 0.35:
        jobFields.type = "Excavation";
        jobFields.total_earned = Number(amount * commission).toFixed(2);
      case 0.45:
        jobFields.type = "Excavation";
        jobFields.total_earned = Number(amount * commission).toFixed(2);
    }
  }

  try {
    let job = await Jobs.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job Not Found" });

    //Make sure user owns job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }
    job = await Jobs.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json({ msg: "Job was successfully edited ", job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

// @route   DELETE api/jobs/:id
//@ desc    Delete job
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let job = await Jobs.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job Not Found" });

    //Make sure user owns job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    await Jobs.findByIdAndRemove(req.params.id);

    res.json({ msg: "Job deleted", _id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

// @route   POST api/jobs/cash
//@ desc    Add cash Jobs
//@access   Private
router.post(
  "/cash",
  [auth, [check("address", "Address is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, address, amount, material, description } = req.body;

    try {
      const earned = amount / 2;
      const newJob = new JobsCash({
        date: moment(date).format("dddd, MMMM DD YYYY"),
        address,
        amount,
        worker: req.user.name,
        material,
        company: "Express",
        description,
        user: req.user.id,
        total_earned: Number(earned).toFixed(2),
      });
      const jobCash = await newJob.save();
      res.json({
        msg: "Cash Job Successfully Added",
        jobCash,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: "Server error" });
    }
  }
);

//UPDATED
// @route   POST api/jobs/getCash
//@ desc    Get All Cash jobs for period.
//@access   Private.
router.post("/getCash", auth, async (req, res) => {
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

    let cashJobs = await JobsCash.find({
      date: { $in: days },
      user: req.user.id,
    });

    res.json(cashJobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   DELETE api/jobs/cash
//@ desc    DELETE CASH JOB
//@access   Private.
router.delete("/cash/:id", auth, async (req, res) => {
  try {
    let job = await JobsCash.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job Not Found" });
    //Make sure user has permissions owns job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    await JobsCash.findByIdAndRemove(req.params.id);
    return res
      .status(200)
      .json({ msg: "Cash Job deleted", _id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

//Updated
// @route   PUT api/jobs/cash/:id
//@ desc    Update cash job
//@access   Private

router.put("/cash/:id", auth, async (req, res) => {
  const {
    date,
    address,
    material,
    amount,
    description,
    total_earned,
  } = req.body;

  const worker = req.user.role;
  //Build job object
  const jobFields = {};
  if (date) jobFields.date = moment(date).format("dddd, MMMM DD YYYY");
  if (address) jobFields.address = address;
  if (amount) jobFields.amount = amount;
  if (material) jobFields.material = material;
  if (description) jobFields.description = description;
  if (worker) jobFields.worker = req.user.name;
  if (total_earned) jobFields.total_earned = Number(amount / 2).toFixed(2);

  try {
    let job = await JobsCash.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job Not Found" });

    //Make sure user owns job

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    job = await JobsCash.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json({ msg: "Cash Job Was Successfully Edited", job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
});

// @route   Get api/jobs/unpaid
//@ desc   Get jobs unpaid
//@access   Private

router.get("/unpaid", auth, async (req, res) => {
  try {
    let job = await Jobs.find({ unpaid: true, user: req.user.id });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   PUT api/jobs/unpaid:id
//@ desc   Edit job Paid/Unpaid
//@access   Private

router.put("/unpaid/:id", auth, async (req, res) => {
  try {
    let job = await Jobs.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job Not Found" });

    //Make sure user owns job

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }
    job = await Jobs.findByIdAndUpdate(req.params.id, { unpaid: false });

    res.json({ msg: "Job Was Successfully Updated ", job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   Get api/jobs/twoweeks
//@ desc   Get jobs twoweeks
//@access   Private

router.get("/twoweeks", auth, async (req, res) => {
  const today = moment().date();
  const curr = moment();

  let days = [];
  const from_date = curr.startOf("month") - 1;
  const end_date = curr.endOf("month").date();
  if (today <= 15) {
    for (i = 1; i <= 15; i++) {
      days.push(moment(from_date).add(i, "days").format("dddd, MMMM DD YYYY"));
    }
  } else {
    for (i = 15; i <= end_date; i++) {
      days.push(moment(from_date).add(i, "days").format("dddd, MMMM DD YYYY"));
    }
  }

  try {
    let jobs = await Jobs.find({ date: { $in: days }, user: req.user.id });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }
});

// @route   Get api/jobs/calendar/statement
//@ desc   Get statement for calendar
//@access   Private

router.post("/calendar/statement/", auth, async (req, res) => {
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

  const amountMap = (arr, key) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const amountArr = arr.map((item) => {
      return item[key];
    });
    const result = amountArr.reduce(reducer, 0);
    return result;
  };

  try {
    getDays(from, to);
    let unpaid = await Jobs.find({ unpaid: true, user: req.user.id });
    let period = await Jobs.find({ date: { $in: days }, user: req.user.id });
    let cash = await JobsCash.find({ date: { $in: days }, user: req.user.id });
    let material = await Material.find({
      date: { $in: days },
      type: { $in: "Material" },
      user: req.user.id,
    });
    let gas = await Material.find({
      date: { $in: days },
      type: { $in: "Gas" },
      user: req.user.id,
    });

    const unpaidAmount = amountMap(unpaid, "amount");
    const periodAmount = amountMap(period, "amount");
    const cashAmount = amountMap(cash, "amount");
    const materialAmount = amountMap(material, "amount");
    const materialJobs = amountMap(period, "material");
    const materialCashJobs = amountMap(cash, "material");
    const gasAmount = amountMap(gas, "amount");

    const materialTotal = Number(
      materialAmount + materialJobs + materialCashJobs
    );

    const earned = periodAmount / 2 - materialAmount;

    const statement = new Object({
      unpaidSum: Number(unpaidAmount) / 2,
      periodSum: Number(periodAmount) / 2,
      cash: cashAmount,
      taxes: Number(periodAmount) * 0.13,
      material: materialTotal,
      earned: Number(earned),
      totalMaterial: Number(gasAmount + materialTotal),
      gas: Number(gasAmount),
    });

    res.json(statement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server Error" });
  }

  // @route   POST api/jobs/sendfile
  //@ desc    Send file
  //@access   Private
  router.post("/sendfile", auth, async (req, res) => {
    try {
      let unpaid = await Jobs.find({ unpaid: true, user: req.user.id });
      const file = req.files.file;
      let jobFiltred = [];
      const extension = path.extname(file.name);
      //Update Jobs
      const updateJobs = async (invoiceNumbers) => {
        await Jobs.updateMany(
          { invoice: { $in: invoiceNumbers } },
          { $set: { unpaid: false } },
          { new: true }
        );
        const updatedResult = await Jobs.find({
          invoice: { $in: invoiceNumbers },
        });

        return updatedResult;
      };
      if (extension != ".pdf" || file === null) {
        res.status(400).json({ error: "Please upload pdf file." });
      } else {
        pdf(file).then((data) => {
          const promise = new Promise((resolve) => {
            unpaid.map((job) => {
              if (data.text.includes(job.invoice.toString()) === true) {
                jobFiltred.push(job.invoice);
              }
              resolve(jobFiltred);
            });
          });
          promise
            .then((invoiceNumbers) => {
              updateJobs(invoiceNumbers).then((jobs) => {
                res.json({ msg: "Jobs was successfully updated", jobs });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: "Server error" });
    }
  });
});
module.exports = router;
