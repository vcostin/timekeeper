import React, { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList.jsx";

const ScheduleListContainer = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch("/api/schedules")
      .then((response) => response.json())
      .then((data) => {
        setSchedules(data.schedules);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="SheduleListContainer">
      <h1>Schedule List</h1>
      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default ScheduleListContainer;
