import { useEffect, useState } from "react";
import { convertTimesToISO } from "../utilities/timeConversion.js";
import "./InlineTimeInput.css";

const InlineTimeInput = ({ onInlineTimeInput }) => {
  const [inputUnparsedDates, setInputUnparsedDates] = useState("");
  const [message, setMessage] = useState("");
  const [calculatedTimes, setCalculatedTimes] = useState(null);

  useEffect(() => {
    try {
      const { startTimeISO, endTimeISO } = convertTimesToISO(
        inputUnparsedDates,
      );
      setCalculatedTimes({
        openTime: startTimeISO,
        closeTime: endTimeISO,
      });
      setMessage("");
      setInputUnparsedDates("");
    } catch (error) {
      setCalculatedTimes(null);
      setMessage(error.message);
    }
  }, [inputUnparsedDates]);

  useEffect(() => {
    calculatedTimes && onInlineTimeInput(calculatedTimes);
  }, [calculatedTimes]);

  return (
    <div className="inline-time-input">
      <div className="info">
        <h2>Inline Time Input</h2>
        <p>
          This component takes a string input and converts it to ISO format.
        </p>
        <p>e.g format: "February 15th from 1pm to 3pm ET"</p>
      </div>
      <div className="input">
        <label>Enter time string:</label>
        <input
          type="input"
          value={inputUnparsedDates}
          onChange={(e) => setInputUnparsedDates(e.target.value)}
        />
      </div>
      {inputUnparsedDates && message && <div className="message">{message}
      </div>}
    </div>
  );
};

export default InlineTimeInput;
