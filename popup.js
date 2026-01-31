chrome.tabs.query({ active: true, currentWindow: true }, () => {
  chrome.tabs.sendMessage(
    chrome.tabs.TAB_ID_NONE,
    { type: "GET_CWV" },
    (res) => {
      if (!res) return;

      document.getElementById("lcp").textContent =
        res.lcp ? res.lcp + " ms" : "Not available";

      document.getElementById("cls").textContent =
        res.cls ? res.cls.toFixed(3) : "0";

      document.getElementById("inp").textContent =
        res.inp ? res.inp + " ms" : "Not available";
    }
  );
});
