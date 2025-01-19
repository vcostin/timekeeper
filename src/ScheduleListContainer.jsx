import React, { useState, useEffect } from "react";
import ScheduleForm from "./ScheduleForm.jsx";
import ScheduleList from "./ScheduleList.jsx";

const ScheduleContainer = () => {
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

  const handleDeleteSchedule = (id) => {
    fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchSchedules();
        } else {
          console.error("Failed to delete schedule");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEditSchedule = (id) => {
    // Implement edit functionality
    console.log("Edit schedule with ID:", id);
  };

  return (
    <div>
      <ScheduleForm onScheduleCreated={fetchSchedules} />
      <ScheduleList
        schedules={schedules}
        onDeleteSchedule={handleDeleteSchedule}
        onEditSchedule={handleEditSchedule}
      />
    </div>
  );
};

export default ScheduleContainer;
