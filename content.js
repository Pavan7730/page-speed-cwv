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
// -------- INP (robust handling) --------
try {
  let inpValue = null;

  const inpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration && entry.duration > 0) {
        inpValue = Math.round(entry.duration);
      }
    }

    if (inpValue !== null) {
      chrome.runtime.sendMessage({
        type: "CWV_METRIC",
        name: "INP",
        value: inpValue
      });
    }
  });

  inpObserver.observe({
    type: "event",
    buffered: true,
    durationThreshold: 16
  });

} catch (e) {}
})();
