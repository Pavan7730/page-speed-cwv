let cwvData = {
  LCP: null,
  CLS: null,
  INP: null
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Receive CWV metrics from content.js
  if (msg.type === "CWV_METRIC") {
    cwvData[msg.name] = msg.value;
  }

  // Popup asking for data
  if (msg.type === "GET_CWV") {
    sendResponse(cwvData);
  }
});
