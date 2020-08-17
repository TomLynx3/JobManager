import React, { useContext, useState } from "react";
import JobContext from "../../context/jobs/jobContext";
import moment from "moment";
const FilterWeek = ({ props }) => {
  const jobContext = useContext(JobContext);
  const { filterWeek, clearFilter, filtred } = jobContext;
  let days = [];
  let curr = moment();
  let from_date = curr.startOf("week");

  for (let i = 1; i <= 7; i++) {
    days.push(
      moment(from_date + 1)
        .add(i, "days")
        .format("dddd, MMMM DD YYYY")
    );
  }

  const [text, setText] = useState({});

  //function which define date
  const something = text => {
    props(text);
  };

  const { date } = text;

  const onChange = e => setText({ ...text, [e.target.name]: e.target.value });
  const onSubmit = e => {
    something(text);

    e.preventDefault();

    if (filtred === null) {
      filterWeek(text);
    }
    if (filtred) {
      filterWeek(text);
    }
  };
  const clearAll = () => {
    something(days);
    setText({
      date: curr.format("YYYY-MM-DD")
    });
    clearFilter();
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="date" name="date" onChange={onChange} value={date}></input>
      <input
        type="submit"
        value="Search"
        className="btn btn-primary btn-block"
      />
      {filtred && (
        <div>
          <button className="btn btn-primary btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default FilterWeek;
