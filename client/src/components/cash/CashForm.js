import React, { useState, useEffect, useContext } from "react";
import JobContext from "../../context/jobs/jobContext";
import moment from "moment";

const CashForm = () => {
  const jobContext = useContext(JobContext);

  const today = moment().format("YYYY-MM-DD");

  const { addJobCash, current, clearCurrent, updateCashJob } = jobContext;
  useEffect(() => {
    if (current !== null) {
      setJob(current);
    } else {
      setJob({
        date: today,
        address: "",
        material: 0,
        amount: "",
        description: ""
      });
    }
  }, [jobContext, current, today]);

  const [job, setJob] = useState({
    date: today,
    address: "",
    material: "",
    amount: "",
    description: ""
  });
  const { date, address, material, amount, description } = job;

  const onChange = e => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addJobCash(job);
    } else {
      updateCashJob(job);
    }

    setJob({
      date: "",
      address: "",
      material: 0,
      amount: "",
      description: ""
    });
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Job" : "Add Cash Job"}</h2>
      <input
        type="date"
        placeholder="Date"
        name="date"
        value={date}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Address"
        name="address"
        value={address}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Material"
        name="material"
        value={material}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={description}
        onChange={onChange}
      />

      <div>
        <input
          type="submit"
          value={current ? "Edit Job" : "Add Cash Job"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CashForm;
