import React, { useState } from "react";

const ScheduleForm = () => {
  const [name, setName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const scheduleData = {
      name,
      openTime,
      closeTime,
      comment,
      url,
    };
    fetch("/api/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <form className="ScheduleForm" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Open Time:
        <input
          type="datetime-local"
          value={openTime}
          onChange={(event) => setOpenTime(event.target.value)}
        />
      </label>
      <br />
      <label>
        Close Time:
        <input
          type="datetime-local"
          value={closeTime}
          onChange={(event) => setCloseTime(event.target.value)}
        />
      </label>
      <br />
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Schedule</button>
    </form>
  );
};

export default ScheduleForm;
