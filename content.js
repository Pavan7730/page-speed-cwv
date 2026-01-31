let metrics = {
  lcp: null,
  cls: 0,
  inp: null
};

// LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const last = entries[entries.length - 1];
  metrics.lcp = Math.round(last.startTime);
}).observe({ type: "largest-contentful-paint", buffered: true });

// CLS
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      metrics.cls += entry.value;
    }
  }
}).observe({ type: "layout-shift", buffered: true });

// INP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const last = entries[entries.length - 1];
  metrics.inp = Math.round(last.duration);
}).observe({ type: "event", buffered: true, durationThreshold: 40 });

// Send data to popup
chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.type === "GET_CWV") {
    sendResponse(metrics);
  }
});
