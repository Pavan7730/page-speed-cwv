// content.js
importScripts();

(function () {
  function send(metric) {
    chrome.runtime.sendMessage({
      type: "CWV",
      name: metric.name,
      value: metric.value.toFixed(2)
    });
  }

  import('https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js')
    .then(({ getLCP, getCLS, getINP }) => {
      getLCP(send);
      getCLS(send);
      getINP(send);
    });
})();
