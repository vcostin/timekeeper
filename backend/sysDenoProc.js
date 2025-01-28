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
    console.log(`Application ${url} opened successfully`);
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
    console.log(`Tab ${url} closed successfully`);
  };
}

export { closeApp, openApp };
