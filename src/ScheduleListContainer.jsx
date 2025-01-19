import React, { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList.jsx";
import ScheduleForm from "./ScheduleForm.jsx";

const ScheduleListContainer = () => {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = () => {
    fetch("/api/schedules")
      .then((response) => response.json())
      .then((data) => setSchedules(data.schedules))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchSchedules();
  }, []);
  return (
    <div className="SheduleListContainer">
      <ScheduleForm onScheduleCreated={fetchSchedules} />
      <h1>Schedule List</h1>
      <ScheduleList schedules={schedules} />
    </div>
  );
};

export default ScheduleListContainer;
