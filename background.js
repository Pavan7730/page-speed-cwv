let cwv = {};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "CWV_METRIC") {
    cwv[msg.name] = msg.value;
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_CWV") {
    sendResponse(cwvData);
  }
});
