import {
  clearAll,
  clearTimers,
  setTimer,
  timers,
  updateTimer,
} from "./timers.js";
import { assertSpyCalls, spy } from "@std/testing/mock";
import { FakeTime } from "@std/testing/time";

Deno.test("should set a timer for a specific schedule", () => {
  const time = new FakeTime();
  const scheduleId = "schedule1";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const callback = () => {};

  setTimer(scheduleId, targetDate, "openTime", callback);

  if (!timers.has(scheduleId)) {
    throw new Error("Timer was not set");
  }
  if (timers.get(scheduleId).length !== 1) {
    throw new Error("Timer count is incorrect");
  }
  clearAll();
  time.restore();
});

Deno.test("should not set a timer for a past date", () => {
  const time = new FakeTime();
  const scheduleId = "schedule2";
  const targetDate = new Date(Date.now() - 1000); // 1 second in the past
  const callback = () => {};

  setTimer(scheduleId, targetDate, "closeTime", callback);

  if (timers.has(scheduleId)) {
    throw new Error("Timer should not be set for a past date");
  }
  clearAll();
  time.restore();
});

Deno.test("should clear all timers for a specific schedule", () => {
  const time = new FakeTime();
  const scheduleId = "schedule3";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const callback = () => {};

  setTimer(scheduleId, targetDate, "openTime", callback);
  clearTimers(scheduleId);

  if (timers.has(scheduleId)) {
    throw new Error("Timers were not cleared");
  }
  clearAll();
  time.restore();
});

Deno.test("should execute the function at the specific time", () => {
  const time = new FakeTime();
  const scheduleId = "schedule4";
  const targetDate = new Date(Date.now() + 1000); // 1 second in the future
  const executeSpy = spy(() => {});

  setTimer(scheduleId, targetDate, "openTime", executeSpy);

  time.tick(1000);

  assertSpyCalls(executeSpy, 1);

  clearAll();
  time.restore();
});

Deno.test("should update an existing timer for a specific schedule and date purpose", () => {
  const time = new FakeTime();
  const scheduleId = "schedule5";
  const targetDate1 = new Date(Date.now() + 1000); // 1 second in the future
  const targetDate2 = new Date(Date.now() + 2000); // 2 seconds in the future
  const executeSpy1 = spy(() => {});
  const executeSpy2 = spy(() => {});

  setTimer(scheduleId, targetDate1, "openTime", executeSpy1);
  updateTimer(scheduleId, targetDate2, "openTime", executeSpy2);

  time.tick(1000);

  assertSpyCalls(executeSpy1, 0); // The first timer should be cleared

  time.tick(1000); // Ensure it waits for at least 2 seconds

  assertSpyCalls(executeSpy2, 1); // The second timer should be executed

  clearAll();
  time.restore();
});
