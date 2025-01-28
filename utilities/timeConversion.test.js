import { assertEquals, assertThrows } from "@std/assert";
import { convertTimesToISO } from "./timeConversion.js";

Deno.test("convertTimesToISO - valid input", () => {
  const input = "Friday, Oct 18 @ 9am - 11am ET";
  const { startTimeISO, endTimeISO } = convertTimesToISO(input);

  const year = new Date().getFullYear(); // Use the current year
  assertEquals(
    startTimeISO,
    new Date(`${year} Oct 18 09:00:00 -0400`).toISOString(),
  );
  assertEquals(
    endTimeISO,
    new Date(`${year} Oct 18 11:00:00 -0400`).toISOString(),
  );
});

Deno.test("convertTimesToISO - invalid input", () => {
  const input = "Friday, Oct 18 @ 25am - 11am ET";
  assertThrows(() => convertTimesToISO(input), Error, "Invalid time format");
});
