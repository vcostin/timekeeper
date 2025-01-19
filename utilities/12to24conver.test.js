import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { convertTo24HourFormat } from "./12to24convert.js";

Deno.test("convertTo24HourFormat - valid inputs", () => {
  assertEquals(convertTo24HourFormat("9am"), "09:00:00");
  assertEquals(convertTo24HourFormat("12pm"), "12:00:00");
  assertEquals(convertTo24HourFormat("12am"), "00:00:00");
  assertEquals(convertTo24HourFormat("3:15pm"), "15:15:00");
  assertEquals(convertTo24HourFormat("11:59:59pm"), "23:59:59");
  assertEquals(convertTo24HourFormat("1:05am"), "01:05:00");
  assertEquals(convertTo24HourFormat("10:30:45am"), "10:30:45");
});

Deno.test("convertTo24HourFormat - invalid inputs", () => {
  assertThrows(
    () => convertTo24HourFormat("25am"),
    Error,
    "Invalid time format",
  );
  assertThrows(
    () => convertTo24HourFormat("13pm"),
    Error,
    "Invalid time format",
  );
  assertThrows(
    () => convertTo24HourFormat("12:60pm"),
    Error,
    "Invalid time format",
  );
  assertThrows(
    () => convertTo24HourFormat("12:00:60pm"),
    Error,
    "Invalid time format",
  );
  assertThrows(
    () => convertTo24HourFormat("noon"),
    Error,
    "Invalid time format",
  );
  assertThrows(
    () => convertTo24HourFormat("midnight"),
    Error,
    "Invalid time format",
  );
});
