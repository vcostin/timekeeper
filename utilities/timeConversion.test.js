import { assertEquals, assertThrows } from "@std/assert";
import { convertTimesToISO, formatDateForInput } from "./timeConversion.js";

Deno.test("convertTimesToISO - valid input with ordinal", () => {
  const input = "February 15th from 1pm to 3pm ET";
  const { startTimeISO, endTimeISO } = convertTimesToISO(input);
  const year = new Date().getFullYear();
  assertEquals(
    startTimeISO,
    new Date(`${year} February 15 13:00:00 -0500`).toISOString(),
  );
  assertEquals(
    endTimeISO,
    new Date(`${year} February 15 15:00:00 -0500`).toISOString(),
  );
});

Deno.test("convertTimesToISO - valid input without ordinal", () => {
  const input = "February 15 from 1pm to 3pm ET";
  const { startTimeISO, endTimeISO } = convertTimesToISO(input);
  const year = new Date().getFullYear();
  assertEquals(
    startTimeISO,
    new Date(`${year} February 15 13:00:00 -0500`).toISOString(),
  );
  assertEquals(
    endTimeISO,
    new Date(`${year} February 15 15:00:00 -0500`).toISOString(),
  );
});

Deno.test("convertTimesToISO - invalid hour", () => {
  const input = "February 15th from 25am to 3pm ET";
  assertThrows(() => convertTimesToISO(input), Error, "Invalid time format");
});

Deno.test("convertTimesToISO - invalid format", () => {
  const input = "Invalid input string";
  assertThrows(() => convertTimesToISO(input), Error, "Invalid time format");
});

Deno.test("formatDateForInput - returns empty string for falsy date", () => {
  assertEquals(formatDateForInput(null), "");
  assertEquals(formatDateForInput(undefined), "");
});

Deno.test("formatDateForInput - returns correctly formatted string", () => {
  // Create a date for February 15th, 2025, 13:05 local time.
  // Note: Month is 1 because months are zero-indexed (0=January, 1=February, etc.)
  const testDate = new Date(2025, 1, 15, 13, 5); 
  const formatted = formatDateForInput(testDate);
  // Expected string: "2025-02-15T13:05"
  assertEquals(formatted, "2025-02-15T13:05");
});
