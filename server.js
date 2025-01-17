import express from "express";

import Schedule from "./backend/shedule.model.js";

const app = express();

app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/schedules", (req, res) => {
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

app.listen(3000, () => {
  Schedule.sync({ force: true });
  console.log("Server listening on port 3000!");
});
