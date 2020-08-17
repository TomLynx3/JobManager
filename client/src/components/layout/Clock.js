import React, { useEffect, useState } from "react";
import moment from "moment";

const Clock = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("LTS"));
    }, 1000);
  }, []);
  return (
    <div>
      <h2>{time}</h2>
    </div>
  );
};

export default Clock;
