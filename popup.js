document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ type: "GET_CWV" }, (data) => {
    if (!data) return;

    render("lcp", data.LCP, 2.5, "s");
    render("cls", data.CLS, 0.1, "");
    render("inp", data.INP, 200, "ms");
  });
});

function render(id, value, goodLimit, unit) {
  const circle = document.getElementById(`${id}-circle`);
  const text = document.getElementById(`${id}-text`);
  const svg = circle.parentElement;

  if (value === null || value === undefined) return;

  text.innerText = value + unit;

  let percent = Math.min((goodLimit / value) * 100, 100);

  if (value <= goodLimit) {
    svg.className = "circle good";
  } else if (value <= goodLimit * 1.5) {
    svg.className = "circle ok";
  } else {
    svg.className = "circle bad";
  }

  circle.setAttribute("stroke-dasharray", `${percent}, 100`);
}
