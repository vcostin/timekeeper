import express from "express";

import Schedule from "./shedule.model.js";
import {
  clearAll,
  clearTimers,
  setTimer,
  updateTimer,
} from "../utilities/timers.js";
import {
  setScheduleClose,
  scheduleConvert,
  setScheduleOpen,
} from "./scheduleTool.js";
import { internallAppError, internallAppLog } from "../utilities/message.js";

const app = express();

app.use(express.json());

app.get("/api/message", (_req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/schedules", (_req, res) => {
  Schedule.findAll()
    .then((schedules) => {
      res.json({ schedules });
    })
    .catch((error) => {
      internallAppError(error);
      res.status(500).json({ message: "Error retrieving schedules" });
    });
});

app.post("/api/schedules", async (req, res) => {
  const { name, openTime, closeTime, comment, url } = req.body;
  const newSchedule = {
    name,
    openTime,
    closeTime,
    comment,
    url,
  };

  const schedule = await Schedule.create(newSchedule);
  if (schedule) {
    internallAppLog("Schedule created:", schedule);
    const sheduleData = scheduleConvert(schedule);
    setTimer(
      sheduleData.id,
      sheduleData.openTime,
      "openTime",
      setScheduleOpen(sheduleData),
    );
    setTimer(
      sheduleData.id,
      sheduleData.closeTime,
      "closeTime",
      setScheduleClose(sheduleData),
    );
    res.json(schedule);
  } else {
    res.status(500).send({ error: "Error creating schedule" });
  }
});

app.patch("/api/schedules/:id", async (req, res) => {
  const { id } = req.params;
  const schedule = await Schedule.findByPk(id);
  if (schedule) {
    await schedule.update(req.body);
    const sheduleData = scheduleConvert(schedule);
    updateTimer(
      sheduleData.id,
      sheduleData.openTime,
      "openTime",
      setScheduleOpen(sheduleData),
    );
    updateTimer(
      sheduleData.id,
      sheduleData.closeTime,
      "closeTime",
      setScheduleClose(sheduleData),
    );
    res.json(schedule);
  } else {
    res.status(404).send({ error: "Schedule not found" });
  }
});

app.delete("/api/schedules/:id", async (req, res) => {
  const { id } = req.params;
  const schedule = await Schedule.findByPk(id);
  if (schedule) {
    await schedule.destroy();
    clearTimers(id);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Schedule not found" });
  }
});

app.listen(3000, async () => {
  await Schedule.sync({ alter: true });
  internallAppLog("Server listening on port 3000!");

  // Fetch schedules from the database
  const schedules = await Schedule.findAll();
  const scheduleData = schedules.map(scheduleConvert);
  console.log(scheduleData);

  // Set timers for each schedule
  scheduleData.forEach((schedule) => {
    setTimer(
      schedule.id,
      schedule.openTime,
      "openTime",
      setScheduleOpen(schedule),
    );
    setTimer(
      schedule.id,
      schedule.closeTime,
      "closeTime",
      setScheduleClose(schedule),
    );
  });
});

// Handle Ctrl + C (SIGINT) to clear intervals
Deno.addSignalListener("SIGINT", () => {
  clearAll();
  internallAppLog("Intervals cleared. Exiting...");
  Deno.exit();
});
