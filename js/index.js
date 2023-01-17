let timer;
let k = 10;
let isStarted = false;

function start() {
  if (!isStarted) {
    timer = setInterval(timef, 1000);
    isStarted = true;
  }
}

function timef() {
  console.log(k);
  k--;

  if (k <= 0) {
    clearInterval(timer);
  }
}
