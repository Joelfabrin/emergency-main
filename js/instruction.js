console.log("instruction.js loaded");

document
  .querySelector(".info-graphic button:nth-of-type(1)")
  .addEventListener("click", function () {
    console.log("BMO button clicked");
    document.querySelector(".info-text h2").textContent = "HVAD ER EN BMO?";
  });
document
  .querySelector(".info-graphic button:nth-of-type(2)")
  .addEventListener("click", function () {
    console.log("KRISE button clicked");
    document.querySelector(".info-text h2").textContent =
      "HVORFOR ER DER KRISE?";
  });
document
  .querySelector(".info-graphic button:nth-of-type(3)")
  .addEventListener("click", function () {
    console.log("VEJLEDNING button clicked");
    document.querySelector(".info-text h2").textContent = "HVAD SKAL JEG GØRE?";
  });
