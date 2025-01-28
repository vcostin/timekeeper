import { internallAppLog } from "../utilities/message.js";

function openApp(url) {
  const script = `
      tell application "Microsoft Edge"
        open location "${url}"
      end tell
    `;
  return () => {
    const proc = new Deno.Command("osascript", { args: ["-e", script] })
      .outputSync();

    if (proc.error) {
      console.error(`Error opening application: ${proc.error}`);
      return;
    }
    internallAppLog(`Application ${url} opened successfully`);
  };
}

function closeApp(url) {
  const script = `
      tell application "Microsoft Edge"
        close (every tab of window 1 whose URL contains "${url}")
      end tell
    `;
  return () => {
    const proc = new Deno.Command("osascript", { args: ["-e", script] })
      .outputSync();

    if (proc.error) {
      console.error(`Error closing tab: ${proc.error.message}`);
      return;
    }
    internallAppLog(`Tab ${url} closed successfully`);
  };
}

export { closeApp, openApp };
