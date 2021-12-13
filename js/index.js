//#region const and let
let btn_dark_or_light = document.querySelector("#switch-container");
let keyboardTouch = document.querySelectorAll("button");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const buttonSwicth = document.querySelector("#switch-toggle");
const lockKey = document.querySelector("#capsLock");
const lockLed = document.querySelector("#lock-led");
let ledActiveOrNot = false;
//#endregion

// change theme of the keyboard and overwrinting the system mode
btn_dark_or_light.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    keyboardTouch.forEach((elem) => elem.classList.toggle("background-light"));
  } else {
    document.body.classList.toggle("dark-theme");
    keyboardTouch.forEach((elem) => elem.classList.toggle("background-dark"));
  }
  buttonSwicth.classList.toggle("translate");
  lockLed.classList.toggle("light");
});

// change the color of the led for lock the capsLock button
lockKey.addEventListener("click", (e) => {
  if (ledActiveOrNot === false) {
    lockLed.style.backgroundColor = "red";
    lockLed.style.borderColor = "red";
    ledActiveOrNot = !ledActiveOrNot;
  } else if (ledActiveOrNot === true) {
    lockLed.style.backgroundColor = "";
    lockLed.style.borderColor = "";
    ledActiveOrNot = !ledActiveOrNot;
  }
});

// simulate touch on keyboard
function simulateKeystrokes() {
  keyboardTouch.forEach((elem) =>
    elem.addEventListener("mousedown", () => {
      elem.style.transform = "scale(0.8)";
    })
  );
  keyboardTouch.forEach((elem) =>
    elem.addEventListener("mouseup", () => {
      elem.style.transform = "scale(1)";
    })
  );
}

simulateKeystrokes();
