import express from "express";

import Schedule from "./shedule.model.js";
import { clearAll } from "../utilities/timers.js";

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
      console.log(error);
      res.status(500).json({ message: "Error retrieving schedules" });
    });
});

app.post("/api/schedules", (req, res) => {
  console.log(req.body);

  const { name, openTime, closeTime, comment, url } = req.body;
  const newSchedule = {
    name,
    openTime,
    closeTime,
    comment,
    url,
  };

  Schedule.create(newSchedule)
    .then((schedule) => {
      console.log("Schedule created:", schedule);
      res.json(schedule);
    })
    .catch((error) => {
      console.error("Error creating schedule:", error);
    });
});

app.patch("/api/schedules/:id", async (req, res) => {
  const { id } = req.params;
  const schedule = await Schedule.findByPk(id);
  if (schedule) {
    await schedule.update(req.body);
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
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Schedule not found" });
  }
});

app.listen(3000, () => {
  Schedule.sync({ alter: true });
  console.log("Server listening on port 3000!");
});

// Handle Ctrl + C (SIGINT) to clear intervals
Deno.addSignalListener("SIGINT", () => {
  clearAll();
  console.log("Intervals cleared. Exiting...");
  Deno.exit();
});
