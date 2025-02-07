if (typeof window !== "undefined" && !window.setTimeout) {
  window.setTimeout = function (callback, delay, ...args) {
    const startTime = Date.now(); // Record the start time

    const timer = {
      id: Symbol("timeoutId"), // Unique identifier for the timeout
      active: true,
    };

    function execute() {
      if (!timer.active) return; // If canceled, do nothing

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= delay) {
        callback.apply(this, args); // Execute the callback with arguments
      } else {
        // Recursively check until the delay has passed
        setTimeout(execute, delay - elapsedTime);
      }
    }

    execute(); // Start the execution loop

    return timer.id; // Return the unique identifier
  };

  window.clearTimeout = function (timeoutId) {
    // Find the timer by its ID and mark it as inactive
    const timer = window._timers?.find((t) => t.id === timeoutId);
    if (timer) timer.active = false;
  };
}

if (typeof window !== "undefined" && !window.setInterval) {
  window.setInterval = function (callback, interval, ...args) {
    let active = true; // Tracks whether the interval is active

    function execute() {
      if (!active) return; // If canceled, stop execution

      callback.apply(this, args); // Execute the callback with arguments
      setTimeout(execute, interval); // Schedule the next execution
    }

    execute(); // Start the first execution

    return {
      id: Symbol("intervalId"), // Unique identifier for the interval
      cancel: () => (active = false), // Method to cancel the interval
    };
  };

  window.clearInterval = function (intervalId) {
    // Find the interval by its ID and cancel it
    const interval = window._intervals?.find((i) => i.id === intervalId);
    if (interval) interval.cancel();
  };
}
