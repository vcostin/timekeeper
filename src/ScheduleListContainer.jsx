import { useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm.jsx";
import ScheduleList from "./ScheduleList.jsx";

const ScheduleContainer = () => {
  const [schedules, setSchedules] = useState([]);
  const [scheduleToEdit, setScheduleToEdit] = useState(null);

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
    const schedule = schedules.find((s) => s.id === id);
    setScheduleToEdit(schedule);
  };

  return (
    <div>
      <ScheduleForm
        onScheduleCreated={fetchSchedules}
        scheduleToEdit={scheduleToEdit}
      />
      <ScheduleList
        schedules={schedules}
        onDeleteSchedule={handleDeleteSchedule}
        onEditSchedule={handleEditSchedule}
      />
    </div>
  );
};

export default ScheduleContainer;
