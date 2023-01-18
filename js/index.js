let mouseX = 0;
let mouseY = 0;
let camPosX = 0;
let camPosY = 0;
let camContainer = document.getElementById("camera");
let camLensRing = document.getElementById("lens-ring2");
let camLensBod = document.getElementById("lens-bod1");
let camDepth = document.getElementById("cam-bod-depth");
let aperture = document.getElementById("test");
let camCenterPos = [0, 0];

onmousemove = function (e) {
  let distanceLimit = 3;
  let lensLength = 0;

  mouseX = e.clientX;
  mouseY = e.clientY;

  camCenterPos = [
    camContainer.offsetLeft + camContainer.offsetWidth / 2,
    camContainer.offsetTop + camContainer.offsetHeight / 2,
  ];

  camPosX = mouseX - camCenterPos[0];
  camPosY = (mouseY - camCenterPos[1]) * -1;

  let lens2Pos = [
    ((camPosX / distanceLimit + camContainer.offsetWidth / 2) /
      camContainer.offsetWidth) *
      80 -
      5,
    ((-camPosY / distanceLimit + camContainer.offsetHeight / 2) /
      camContainer.offsetHeight) *
      80 -
      5,
  ];
  let depth2Pos = [
    100 -
      ((camPosX / (distanceLimit * 5) + camContainer.offsetWidth / 2) /
        camContainer.offsetWidth) *
        100 -
      30,

    100 -
      ((-camPosY / (distanceLimit * 4) + camContainer.offsetHeight / 2) /
        camContainer.offsetHeight) *
        100 -
      22,
  ];

  updateLens(lens2Pos);
  console.log(camPosX, camPosY, lens2Pos);
  // console.log(depth2Pos);
  updateDepth(depth2Pos);

  let newLensPos = [
    camLensRing.offsetLeft + camLensRing.offsetWidth / 2,
    camLensRing.offsetTop + camLensRing.offsetHeight - 16,
  ];

  updateGuide(newLensPos);

  let angleDeg =
    (Math.atan2(
      newLensPos[1] - camCenterPos[1],
      newLensPos[0] - camCenterPos[0]
    ) *
      180) /
    Math.PI;

  lensLength =
    getDistance(camCenterPos, newLensPos) / (camContainer.offsetWidth / 2);
  // console.log(lensLength, camContainer.offsetWidth / 2);
  // console.log(lensLength);
  // rotateLens(angleDeg - 90, lensLength / 8 + 2);
  rotateLens(angleDeg - 90, lensLength);
  //skewLens();
};

function updateLens(pos) {
  camLensRing.style.left = pos[0] + "%";
  camLensRing.style.top = pos[1] + "%";
  aperture.style.left = pos[0] + "%";
  aperture.style.top = pos[1] + "%";
}
function updateDepth(pos) {
  camDepth.style.left = pos[0] + "%";
  camDepth.style.top = pos[1] + "%";
}
function rotateLens(ang, h) {
  camLensBod.style.transform = `rotate(${ang}deg)`;
  camLensBod.style.height = h * 50 + "%";
}
function updateGuide(pos) {
  document.getElementById("newGuide").style.left = pos[0] + "px";
  document.getElementById("newGuide").style.top = pos[1] + "px";
}

function getDistance(pos1, pos2) {
  return Math.sqrt(
    Math.pow(Math.abs(pos2[0] - pos1[0]), 2) +
      Math.pow(Math.abs(pos2[1] - pos1[1]), 2)
  );
}

function skewLens() {
  let degx = 10;
  let degy = 0;
  aperture.style.transform = `skew(${degx}deg, ${degy}deg)`;
  // aperture.style.perspective = `${100}px`;
}
