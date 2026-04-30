(function initCounter() {
  const INITIAL_VALUE = 0;
  const INTERVAL_MS = 1400;

  let count = INITIAL_VALUE;
  let isPaused = false;
  let interval = null;

  const counterEl = document.getElementById("counter");
  const pauseBtn = document.getElementById("pauseBtn");
  const pauseIcon = document.getElementById("pauseIcon");
  const playIcon = document.getElementById("playIcon");

  // Animate the counter element and update its displayed value
  function updateDisplay(value) {
    counterEl.classList.remove("animating");
    void counterEl.offsetWidth; // force reflow to restart CSS animation
    counterEl.textContent = value;
    counterEl.classList.add("animating");
  }

  // Switch pause button icon between pause ∥ and play ▶
  function updateIcon() {
    if (isPaused) {
      pauseIcon.style.display = "none";
      playIcon.style.display = "block";
    } else {
      pauseIcon.style.display = "block";
      playIcon.style.display = "none";
    }
  }

  // Increment counter by 1 on each tick
  function tick() {
    updateDisplay(++count);
  }

  // Start the auto-increment interval
  function start() {
    interval = setInterval(tick, INTERVAL_MS);
  }

  // Toggle between paused and running states
  window.togglePause = function () {
    isPaused = !isPaused;

    if (isPaused) {
      clearInterval(interval);
      pauseBtn.classList.add("paused");
    } else {
      start();
      pauseBtn.classList.remove("paused");
    }

    updateIcon();
  };

  // Reset counter to initial value and restart the interval
  window.resetCounter = function () {
    clearInterval(interval);
    count = INITIAL_VALUE;
    isPaused = false;
    pauseBtn.classList.remove("paused");
    updateDisplay(count);
    updateIcon();
    start();
  };

  // Kick off on page load
  start();
})();
