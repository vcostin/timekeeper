import { useEffect, useState } from "react";
import ScheduleForm from "./ScheduleForm.jsx";
import ScheduleList from "./ScheduleList.jsx";
import InlineTimeInput from "./InlineTimeInput.jsx";
import { formatDateForInput } from "../utilities/timeConversion.js";

const ScheduleContainer = () => {
  const [schedules, setSchedules] = useState([]);
  const [scheduleToEdit, setScheduleToEdit] = useState(null);
  const [inlineOpenTime, setInlineOpenTime] = useState("");
  const [inlineCloseTime, setInlineCloseTime] = useState("");

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
      <InlineTimeInput
        onInlineTimeInput={(t) => {
          if (!t) {
            return;
          }
          setInlineOpenTime(formatDateForInput(t.openTime));
          setInlineCloseTime(formatDateForInput(t.closeTime));
        }}
      />
      <ScheduleForm
        inlineOpenTime={inlineOpenTime}
        inlineCloseTime={inlineCloseTime}
        onScheduleCreated={fetchSchedules}
        scheduleToEdit={scheduleToEdit}
      />
      {schedules.length === 0 ? <p>No schedules found</p> : (
        <ScheduleList
          schedules={schedules}
          onDeleteSchedule={handleDeleteSchedule}
          onEditSchedule={handleEditSchedule}
        />
      )}
    </div>
  );
};

export default ScheduleContainer;
