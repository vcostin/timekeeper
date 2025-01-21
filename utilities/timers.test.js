import { clearTimers, setTimer, timers } from "./timers.js";
import { assertSpyCalls, spy } from "@std/testing/mock";
import { FakeTime } from "@std/testing/time";

Deno.test("should set a timer for a specific schedule", () => {
  const time = new FakeTime();
  const scheduleId = "schedule1";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const callback = () => {};

  setTimer(scheduleId, targetDate, callback);

  if (!timers.has(scheduleId)) {
    throw new Error("Timer was not set");
  }
  if (timers.get(scheduleId).length !== 1) {
    throw new Error("Timer count is incorrect");
  }

  time.restore();
});

Deno.test("should not set a timer for a past date", () => {
  const time = new FakeTime();
  const scheduleId = "schedule2";
  const targetDate = new Date(Date.now() - 1000); // 1 second in the past
  const callback = () => {};

  setTimer(scheduleId, targetDate, callback);

  if (timers.has(scheduleId)) {
    throw new Error("Timer should not be set for a past date");
  }

  time.restore();
});

Deno.test("should clear all timers for a specific schedule", () => {
  const time = new FakeTime();
  const scheduleId = "schedule3";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const callback = () => {};

  setTimer(scheduleId, targetDate, callback);
  clearTimers(scheduleId);

  if (timers.has(scheduleId)) {
    throw new Error("Timers were not cleared");
  }

  time.restore();
});

Deno.test("should execute the function at the specific time", () => {
  const time = new FakeTime();
  const scheduleId = "schedule4";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const executeSpy = spy(() => {});

  setTimer(scheduleId, targetDate, executeSpy);

  time.tick(1000);

  assertSpyCalls(executeSpy, 1);

  time.restore();
});
