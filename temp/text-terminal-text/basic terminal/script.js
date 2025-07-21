
const intervalMap = {
  0.5: "minor second",
  1.0: "major second",
  1.5: "minor third",
  2.0: "major third",
  2.5: "perfect fourth",
  3.0: "tritone",
  3.5: "perfect fifth",
  4.0: "minor sixth",
  4.5: "major sixth",
  5.0: "minor seventh",
  5.5: "major seventh",
  6.0: "perfect octave"
};

const arr = [".", ".", "", ".", "", ".", "", ".", ".", "", ".", "", "."];
let lp = 2, rp = 2;
const output = document.getElementById("output");

// Speak in English
function textToSpeech(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
  output.innerHTML += `> ${text}<br>`;
  output.scrollTop = output.scrollHeight;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getIntervalUp(mylp, myrp) {
  mylp = myrp;
  if (mylp === 12) return [mylp, myrp];

  while (true) {
    myrp = Math.floor(Math.random() * (12 - (mylp + 1) + 1)) + (mylp + 1);
    if (arr[myrp] === ".") break;
  }

  const steps = Math.abs((mylp - myrp) / 2);
  const interval = intervalMap[steps] || "unknown interval";

  textToSpeech(`Ascending ${interval}`);
  return [mylp, myrp];
}

function getIntervalDown(mylp, myrp) {
  if (myrp === 0) return [mylp, myrp];
  mylp = myrp;

  while (true) {
    myrp = Math.floor(Math.random() * myrp);
    if (arr[myrp] === ".") break;
  }

  const steps = Math.abs((mylp - myrp) / 2);
  const interval = intervalMap[steps] || "unknown interval";

  textToSpeech(`Descending ${interval}`);
  return [mylp, myrp];
}

async function runDictation(secondsDelay) {
  const delay = secondsDelay * 1000;

  while (!(arr[lp] === "." && arr[rp] === ".")) {
    lp = Math.floor(Math.random() * 12);
    rp = Math.floor(Math.random() * (12 - (lp + 1) + 1)) + (lp + 1);
  }

  let steps = Math.abs((lp - rp) / 2);
  let interval = intervalMap[steps] || "unknown interval";
  textToSpeech(`Ascending ${interval}`);
  await sleep(delay);

  let pair = [lp, rp];
  for (let i = 0; i < 1000; i++) {
    if (Math.random() < 0.5) {
      pair = getIntervalUp(pair[0], pair[1]);
    } else {
      pair = getIntervalDown(pair[0], pair[1]);
    }
    await sleep(delay);
  }
}

// Prompt the user when the page loads
window.addEventListener("load", () => {
  const seconds = parseInt(prompt("Enter seconds between each dictation:"), 10);
  if (!isNaN(seconds)) {
    runDictation(seconds);
  } else {
    alert("Invalid input. Please refresh and enter a valid number.");
  }
});
