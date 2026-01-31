// content.js
(function () {
  // Avoid running multiple times
  if (window.__CWV_LOADED__) return;
  window.__CWV_LOADED__ = true;

  function sendMetric(metric) {
    chrome.runtime.sendMessage({
      type: "CWV_METRIC",
      name: metric.name,
      value: Number(metric.value.toFixed(3))
    });
  }

  // Load web-vitals safely
  const script = document.createElement("script");
  script.src = "https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js";
  script.onload = () => {
    if (!window.webVitals) return;

    const { getLCP, getCLS, getINP } = window.webVitals;

    getLCP(sendMetric);
    getCLS(sendMetric);
    getINP(sendMetric);
  };

  document.documentElement.appendChild(script);
})();
