//#region MulBerry32 Generator & Setup
var random;
console.log(`%c[SETUP]`, `color:orange;`, `Loading...`);
(() => {
  let seedRaw = getUrlParameter("seed");
  let seed = parseInt(seedRaw);
  if (seedRaw === "random") {
    seed = Math.floor(Math.random() * 10 ^ 1000)
  }
  random = mulberry32(seed);

  if (getUrlParameter("autospin")) {
    if (getUrlParameter("autospin").toUpperCase() === "TRUE") {
      setInterval(() => {
        try {
          roll();
        } catch (e) { }
      }, 1000);
    }
  }

  let warning = document.createElement("div");
  warning.setAttribute("class", "warning");
  if (isNaN(seed)) {
    if (window.demo === true) window.location = "?seed=random&autospin=true";
    warning.innerHTML =
      `Missing uri argument or invalid type: seed<br>` +
      `Failed to parse "${seedRaw}" into Int32!<br>` +
      `paseInt32 returned unexpected value: ${seed}<br>` +
      `Use ?seed=random if you don't want to provide a valid seed.`;
    document.body.appendChild(warning);
  }
  if ((seed > Number.MAX_SAFE_INTEGER) || (seed < Number.MIN_SAFE_INTEGER)) {
    warning.innerHTML =
      `Uri argument is not a valid Int32 number: seed<br>` +
      `Failed to parse "${seedRaw}" into Int32!<br>` +
      `paseInt32 returned unexpected value: ${seed}<br>` +
      `The provided seed must be a number between ${Number.MIN_SAFE_INTEGER}<br>` +
      `and ${Number.MIN_SAFE_INTEGER}!`;
    document.body.appendChild(warning);
  }
})();
//#endregion

//#region Variables
console.log(`%c[SETUP]`, `color:orange;`, `Preparing Variables...`);
var slots = document.querySelectorAll("div.slot");
var stressTest = false;
var items = [
  { icon: 'bar', amount: 1 },
  { icon: 'bell', amount: 3 },
  { icon: 'cherry', amount: 5 },
  { icon: 'diamond', amount: 3 },
  { icon: 'heart', amount: 3 },
  { icon: 'hoof', amount: 3 },
  { icon: 'lemon', amount: 5 },
  { icon: 'melon', amount: 5 },
  { icon: 'seven', amount: 2 },
];
var slotItems = (() => {
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  items.forEach(item => {
    let amount = parseInt(getUrlParameter(item.icon));
    if (!isNaN(amount)) item.amount = amount;
  });

  let out = [];
  items.forEach(item => {
    for (let i = 0; i < item.amount; i++) {
      out.push(item.icon);
    }
  });
  return shuffle(out);
})();
//#endregion

//#region Functions
console.log(`%c[SETUP]`, `color:yellow;`, `Preparing Functions...`);
function mulberry32(a) {
  return function () {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
};

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function roll() {
  console.log(`%c[SLOTS]`, `color:red;`, `Rolling...`);
  let rollData = [['', '', ''], ['', '', ''], ['', '', '']];
  slots.forEach(slot => {
    let item = slotItems[Math.floor(random() * slotItems.length)]
    slot.setAttribute("style", `background-image: url("./img/${item}.png`);
    let x = parseInt(slot.getAttribute("aria-row")) - 1;
    let y = parseInt(slot.getAttribute("aria-column")) - 1;
    rollData[x][y] = item;
  });
  slots = document.querySelectorAll("div.slot");

  let middle = false;
  let top = false;
  let bottom = false;
  let leftRight = false;
  let rightLeft = false;
  let leftRightTop = false;
  let leftRightBottom = false;

  if ((rollData[0][0] === rollData[0][1]) && (rollData[0][1] === rollData[0][2])) top = true;
  if ((rollData[1][0] === rollData[1][1]) && (rollData[1][1] === rollData[1][2])) middle = true;
  if ((rollData[2][0] === rollData[2][1]) && (rollData[2][1] === rollData[2][2])) bottom = true;

  if ((rollData[0][0] === rollData[1][1]) && (rollData[1][1] === rollData[2][2])) leftRight = true;
  if ((rollData[2][0] === rollData[1][1]) && (rollData[1][1] === rollData[0][2])) rightLeft = true;

  if ((rollData[0][0] === rollData[1][1]) && (rollData[1][1] === rollData[0][2])) leftRightTop = true;
  if ((rollData[2][0] === rollData[1][1]) && (rollData[1][1] === rollData[2][2])) leftRightBottom = true;

  drawLines(middle, top, bottom, leftRight, rightLeft, leftRightTop, leftRightBottom);
  return rollData;
};

function drawLines(middle = true, top = true, bottom = true, leftRight = true, rightLeft = true, leftRightTop = true, leftRightBottom = true) {
  let mask = document.querySelector("canvas.mask");
  let ctx = mask.getContext("2d");
  let width = mask.width;
  let height = mask.height;
  let lineWidth = 4;
  let lineColor = "red";

  ctx.clearRect(0, 0, width, height);

  if (middle) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (top) {
    ctx.beginPath();
    ctx.moveTo(0, ((height / 3) / 2));
    ctx.lineTo(width, ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (bottom) {
    ctx.beginPath();
    ctx.moveTo(0, height - ((height / 3) / 2));
    ctx.lineTo(width, height - ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (leftRight) {
    ctx.beginPath();
    ctx.moveTo(0, ((height / 3) / 2));
    ctx.lineTo(((width / 3) / 2), ((height / 3) / 2));
    ctx.lineTo(width - ((width / 3) / 2), height - ((height / 3) / 2));
    ctx.lineTo(width, height - ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (rightLeft) {
    ctx.beginPath();
    ctx.moveTo(0, height - ((height / 3) / 2));
    ctx.lineTo(((width / 3) / 2), height - ((height / 3) / 2));
    ctx.lineTo(width - ((width / 3) / 2), ((height / 3) / 2));
    ctx.lineTo(width, ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (leftRightTop) {
    ctx.beginPath();
    ctx.moveTo(0, ((height / 3) / 2));
    ctx.lineTo(((width / 3) / 2), ((height / 3) / 2));
    ctx.lineTo(width - (width / 2), height - (height / 2));
    ctx.lineTo(width - ((width / 3) / 2), ((height / 3) / 2));
    ctx.lineTo(width, ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };

  if (leftRightBottom) {
    ctx.beginPath();
    ctx.moveTo(0, height - ((height / 3) / 2));
    ctx.lineTo(((width / 3) / 2), height - ((height / 3) / 2));
    ctx.lineTo((width / 2), (height / 2));
    ctx.lineTo(width - ((width / 3) / 2), height - ((height / 3) / 2));
    ctx.lineTo(width, height - ((height / 3) / 2));
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  };
};
//#endregion

//#region Chances
console.log(`%c[SLOTS]`, `color:red;`, `Calculating chances...`);
(() => {
  let all = 0;
  items.forEach(item => all += item.amount);
  let out = "";
  items.forEach(item => out = `${item.icon}: ${item.amount} / ${all}\n${out}`);
  console.log(out);
})();
//#endregion

//#region Stresstest
(() => {
  let trys = 0;
  if (getUrlParameter("stresstest")) {
    if (getUrlParameter("stresstest").toUpperCase() === "TRUE") {
      stressTest = true;
      let completed = false;
      let currentSeed = Number.MIN_SAFE_INTEGER;
      function loop() {
        setTimeout(() => {
          random = mulberry32(currentSeed);
          trys++;
          let data = roll();
          let entrys = [];
          data.forEach(rollData => {
            rollData.forEach(rollItem => {
              let entry = entrys.find(e => e.name === rollItem);
              if (entry === undefined) entrys.push({name: rollItem, count: 1});
              else entry.count = entry.count + 1; 
            });
          });
          entrys.forEach(entry => {
            //console.log(`${entry.count} / 9 => ${entry.name}`);
            if (entry.count === 9) {
              console.log(`%c[STRESSTEST]`, `color:magenta;`, `Completed after ${trys} trys.`);
              completed = true;
            }
          });
          currentSeed++;
          if(!completed) loop();
        }, 5);
      }
      loop();
    }
  }
})();
//#endregion

//#region Mask
console.log(`%c[SETUP]`, `color:yellow;`, `Reconfigure Mask...`);
(() => {
  let mask = document.querySelector("canvas.mask");
  let slots = document.querySelector("div.slots");
  let border = 0; // Brechnet die Border mit. 0 um die Border zu ignorieren.
  mask.setAttribute("style", `width: ${slots.clientWidth + border}px; heiht: ${slots.clientHeight + border}px;`);
  mask.setAttribute("width", slots.clientWidth + border);
  mask.setAttribute("height", slots.clientHeight + border);
})();
//#endregion

console.log(`%c[SETUP]`, `color:yellow;`, `Completed.`);
if (!stressTest) roll();
