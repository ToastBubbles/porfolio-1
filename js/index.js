let mouseX = 0;
let mouseY = 0;
let camPosX = 0;
let camPosY = 0;
let camContainer = document.getElementById("camera");
let camLensRing = document.getElementById("lens-ring2");
let camLensBod = document.getElementById("lens-bod1");
let aperture = document.getElementById("test");
let camCenterPos = [0, 0];

onmousemove = function (e) {
  let distanceLimit = 4;
  let lensLength = 0;
  let xPos = "";
  let yPos = "";
  mouseX = e.clientX;
  mouseY = e.clientY;
  // console.log(this.window.scrollY);
  camCenterPos = [
    camContainer.offsetLeft + camContainer.offsetWidth / 2,
    camContainer.offsetTop + camContainer.offsetHeight / 2,
  ];
  // console.log(camCenterPos);

  // if (mouseX <= camCenterPos[0]) {
  //   xPos = "left";
  // } else {
  //   xPos = "right";
  // }
  // if (mouseY >= camCenterPos[1]) {
  //   yPos = "below";
  // } else {
  //   yPos = "above";
  // }
  //console.log(xPos, yPos);
  camPosX = mouseX - camCenterPos[0];
  camPosY = (mouseY - camCenterPos[1]) * -1;
  //console.log(mouseX, mouseY);
  // /console.log(camPosX, camPosY);
  // updateLens([(camPosX / camContainer.offsetWidth) * 2, 0]);
  let lens2Pos = [
    ((camPosX / distanceLimit + camContainer.offsetWidth / 2) /
      camContainer.offsetWidth) *
      80,
    ((-camPosY / distanceLimit + camContainer.offsetHeight / 2) /
      camContainer.offsetHeight) *
      80,
  ];

  updateLens(lens2Pos);

  let newLensPos = [
    camLensRing.offsetLeft + camLensRing.offsetWidth / 2,
    camLensRing.offsetTop + camLensRing.offsetHeight + 16,
  ];
  // console.log((camPosX / camContainer.offsetWidth) * 2);
  //console.log(lens2Pos);
  updateGuide(newLensPos);
  // console.log(camCenterPos, newLensPos);
  let angleDeg =
    (Math.atan2(
      newLensPos[1] - camCenterPos[1],
      newLensPos[0] - camCenterPos[0]
    ) *
      180) /
    Math.PI;

  lensLength = getDistance(camCenterPos, newLensPos);
  // console.log(lensLength);
  rotateLens(angleDeg - 90, lensLength / 8 + 2);
};

function updateLens(pos) {
  camLensRing.style.left = pos[0] + "%";
  camLensRing.style.top = pos[1] + "%";
  aperture.style.left = pos[0] + "%";
  aperture.style.top = pos[1] + "%";
}
function rotateLens(ang, h) {
  camLensBod.style.transform = `rotate(${ang}deg)`;
  camLensBod.style.height = h + "%";
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
