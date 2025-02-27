import "./ScheduleList.css";
import { formatToLocalTime } from "../utilities/localization.js";

const ScheduleList = ({ schedules, onDeleteSchedule, onEditSchedule }) => {
  return (
    <ul className="ScheduleList">
      <li className="header">Name</li>
      <li className="header">Open Time</li>
      <li className="header">Close Time</li>
      <li className="header">Comment</li>
      <li className="header">URL</li>
      <li className="header">Actions</li>
      {schedules.map((schedule) => (
        <li key={schedule.id} className="item">
          <span>{schedule.name}</span>
          <span>{formatToLocalTime(schedule.openTime)}</span>
          <span>{formatToLocalTime(schedule.closeTime)}</span>
          <span>{schedule.comment}</span>
          <span>
            <a href={schedule.url} target="_blank" rel="noopener noreferrer">
              {schedule.url}
            </a>
          </span>
          <span className="actions">
            <button onClick={() => onEditSchedule(schedule.id)}>Edit</button>
            <button onClick={() => onDeleteSchedule(schedule.id)}>
              Delete
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;
