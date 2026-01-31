document.addEventListener("DOMContentLoaded", () => {
  // Ask background for stored CWV data
  chrome.runtime.sendMessage({ type: "GET_CWV" }, (data) => {
    // Safety check
    if (!data) {
      setLoading();
      return;
    }

    // LCP
    document.getElementById("lcp").innerText =
      data.LCP !== null && data.LCP !== undefined
        ? data.LCP + " s"
        : "Loading…";

    // CLS
    document.getElementById("cls").innerText =
      data.CLS !== null && data.CLS !== undefined
        ? data.CLS
        : "Loading…";

    // INP
    document.getElementById("inp").innerText =
      data.INP !== null && data.INP !== undefined
        ? data.INP + " ms"
        : "Loading…";
  });
});

// Fallback
function setLoading() {
  document.getElementById("lcp").innerText = "Loading…";
  document.getElementById("cls").innerText = "Loading…";
  document.getElementById("inp").innerText = "Loading…";
}
