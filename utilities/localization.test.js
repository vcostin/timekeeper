import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { formatToLocalTime, CHISINAU_OPTIONS } from "./localization.js";

Deno.test("formatToLocalTime - valid ISO string", () => {
  const isoString = "2025-10-18T09:00:00.000Z";
  const expectedLocalTime = new Date(isoString).toLocaleString("en-GB", CHISINAU_OPTIONS);
  const localTime = formatToLocalTime(isoString, CHISINAU_OPTIONS);

  assertEquals(localTime, expectedLocalTime);
});

Deno.test("formatToLocalTime - valid ISO string with default options", () => {
  const isoString = "2025-10-18T11:00:00.000Z";
  const expectedLocalTime = new Date(isoString).toLocaleString("en-GB", CHISINAU_OPTIONS);
  const localTime = formatToLocalTime(isoString);

  assertEquals(localTime, expectedLocalTime);
});
