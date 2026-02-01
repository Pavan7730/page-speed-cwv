(() => {
  if (window.__CWV_NATIVE__) return;
  window.__CWV_NATIVE__ = true;

  // -------- LCP --------
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      chrome.runtime.sendMessage({
        type: "CWV_METRIC",
        name: "LCP",
        value: +(lastEntry.startTime / 1000).toFixed(2)
      });
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch (e) {}

  // -------- CLS --------
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      chrome.runtime.sendMessage({
        type: "CWV_METRIC",
        name: "CLS",
        value: +clsValue.toFixed(3)
      });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch (e) {}

  // -------- INP (approx) --------
  try {
    const inpObserver = new PerformanceObserver((entryList) => {
      const entry = entryList.getEntries()[0];
      chrome.runtime.sendMessage({
        type: "CWV_METRIC",
        name: "INP",
        value: Math.round(entry.duration)
      });
    });
    inpObserver.observe({ type: "event", buffered: true, durationThreshold: 40 });
  } catch (e) {}
})();
