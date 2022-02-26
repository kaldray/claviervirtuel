//#region const and let
let btn_dark_or_light = document.querySelector("#switch-container");
let keyboardTouch = document.querySelectorAll("button");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const buttonSwicth = document.querySelector("#switch-toggle");
const lockKey = document.querySelector("#capsLock");
const lockLed = document.querySelector("#lock-led");
const text = document.querySelector("#textarea");
let ledActiveOrNot = false;
const space = document.querySelector("#space");
const shift = document.querySelectorAll("#shift");
const textarea = document.querySelector("textarea");
const tab = document.querySelector("#tab");
const enter = document.querySelector("#enter");
const backSpace = document.querySelector("#delete");
const shiftLeft = document.querySelector("#shiftLeft");
const shiftRight = document.querySelector("#shiftRight");
let capsLockIsActive = false;
let shiftIsActive = false;
//#endregion

btn_dark_or_light.addEventListener("click", colorTheme);

lockKey.addEventListener("click", changeCapsLockColor);

keyboardTouch.forEach((elem) => elem.addEventListener("click", writeOnScreen));

// simulate touch on keyboard
function simulateKeystrokes() {
  keyboardTouch.forEach((elem) =>
    elem.addEventListener("mousedown", (e) => {
      elem.style.transform = "scale(0.8)";
      console.log(elem.innerHTML);
    })
  );

  keyboardTouch.forEach((elem) =>
    elem.addEventListener("mouseup", () => {
      elem.style.transform = "scale(1)";
    })
  );
}

function simulateKeystrokesOnKeyboard() {
  document.addEventListener("keydown", (e) => {
    keyboardTouch.forEach((elem) => {
      if (e.key === elem.innerHTML.toLowerCase()) {
        elem.style.transform = "scale(0.8)";
      }
      console.log(elem.innerHTML.charCodeAt());
      console.log(elem.innerHTML);
    });
  });
  document.addEventListener("keyup", (e) => {
    keyboardTouch.forEach((elem) => {
      if (e.key === elem.innerHTML.toLowerCase()) {
        elem.style.transform = "scale(1)";
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "Space":
        space.style.transform = "scale(0.8)";
        break;
      case "Enter":
        enter.style.transform = "scale(0.8)";
        break;
      // case "CapsLock":
      //   lockKey.style.transform = "scale(0.8)";
      //   break;
      case "Tab":
        tab.style.transform = "scale(0.8)";
        break;
      case "Backspace":
        backSpace.style.transform = "scale(0.8)";
        break;
      case "ShiftLeft":
        shiftLeft.style.transform = "scale(0.8)";
        break;
      case "ShiftRight":
        shiftRight.style.transform = "scale(0.8)";
        break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "Space":
        space.style.transform = "scale(1)";
        break;
      case "Enter":
        enter.style.transform = "scale(1)";
        break;
      // case "CapsLock":
      //   lockKey.style.transform = "scale(1)";
      //   break;
      case "Tab":
        tab.style.transform = "scale(1)";
        break;
      case "Backspace":
        backSpace.style.transform = "scale(1)";
        break;
      case "ShiftLeft":
        shiftLeft.style.transform = "scale(1)";
        break;
      case "ShiftRight":
        shiftRight.style.transform = "scale(1)";
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "CapsLock":
        lockLed.classList.toggle("light");
        break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "CapsLock":
        lockLed.classList.toggle("light");
        break;
    }
  });
}

// function ok() {
//   document.addEventListener("keypress", (e) => {
//     console.log(e.key, e.key.charCodeAt(0));
//     console.log(KeyboardEvent.keyCode);
//   });
// }

// active the caps lock button
function changeCapsLockColor() {
  if (ledActiveOrNot === false) {
    lockLed.style.backgroundColor = "red";
    lockLed.style.borderColor = "red";
    ledActiveOrNot = !ledActiveOrNot;
  } else if (ledActiveOrNot === true) {
    lockLed.style.backgroundColor = null;
    lockLed.style.borderColor = null;
    ledActiveOrNot = !ledActiveOrNot;
  }
}

// change the color theme and match the theme systeme
function colorTheme() {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    keyboardTouch.forEach((elem) => elem.classList.toggle("background-light"));
  } else {
    document.body.classList.toggle("dark-theme");
    keyboardTouch.forEach((elem) => elem.classList.toggle("background-dark"));
  }
  buttonSwicth.classList.toggle("translate");
  lockLed.classList.toggle("light");
  text.classList.toggle("light");
}

function writeOnScreen(e) {
  let id = e.target.getAttribute("id");
  let keyboardTouchLetterOrNumber = e.target.innerHTML.toLowerCase().charAt(0);
  let asciiCode = e.target.innerHTML.toLowerCase().charCodeAt();
  let asciiDifference = 32;
  let asciiToMajLetter;

  switch (id) {
    case "space":
      text.textContent += " ";
      break;
    case "delete":
      text.textContent = text.textContent.slice(0, text.textContent.length - 1);
      break;
    case "capsLock":
      capsLockIsActive = !capsLockIsActive;
      break;
    case "shiftLeft":
      shiftIsActive = !shiftIsActive;
      break;
    case "shiftRight":
      shiftIsActive = !shiftIsActive;
      break;
    case "tab":
      text.textContent += "";
      break;
    case "enter":
      text.textContent += "\n";
      break;
    default:
      if (capsLockIsActive === true || shiftIsActive === true) {
        asciiToMajLetter = asciiCode - asciiDifference;
        text.textContent += String.fromCharCode(asciiToMajLetter);
        shiftIsActive = !shiftIsActive;
      } else {
        text.innerHTML += keyboardTouchLetterOrNumber;
      }
      break;
  }
}

simulateKeystrokes();
simulateKeystrokesOnKeyboard();
