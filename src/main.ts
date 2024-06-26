import "./style.css";
const p = document.querySelector("#text");

const requestWakeLock = async () => {
  if (navigator.wakeLock === undefined) {
    p.innerText = "Your navigator doesn't support wakelock api (try chrome)";
    return;
  }
  try {
    const wakeLock = await navigator.wakeLock.request("screen");

    wakeLock.addEventListener("release", () => {
      p.innerText = "Wake Lock was released";
      requestWakeLock();
    });
    p.innerText = "Wake Lock is active";
  } catch (err) {
    p.innerText = `error: ${err.name}, ${err.message}`;
    await new Promise((r) => setTimeout(r, 500));
    requestWakeLock();
  }
};

requestWakeLock();
