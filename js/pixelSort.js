// //open /Applications/Google\ Chrome.app --args --allow-file-access-from-files
// // const imgData = ctx.getImageData(0, 0, can.width, can.height);
// // const data = imgData.data;
// // img.src = "./img/bokeh.jpeg";

// //context.putImageData(imgData, 0, 0);
// let can = document.getElementById("pixelSort");
// let context = can.getContext("2d");
// // function initialize(ctxType) {
// //   let ctx = can.getContext(ctxType);
// //   return ctx;
// // }
// function loadImage(source, ctx) {
//   let img = new Image();
//   img.src = source;
//   //   img.crossOrigin = "Anonymous";
//   //   img.src = source;

//   img.onload = () => {
//     ctx.drawImage(img, 0, 0);
//     //let imgData = context.drawImage(img, 0, 0, img.width, img.height);
//     // let imgData = context.getImageData(0, 0, img.width, img.height);
//     const imgData = ctx.getImageData(0, 0, can.width, can.height);
//     readImg(imgData, img);
//   };

//   return img;
// }

// function readImg(imgData, img) {
//   // console.log(imgData.data.length);
//   //imgData.data.length
//   for (let i = 0; i < imgData.data.length; i += 4) {
//     sortPixels(img);
//     const red = imgData.data[i];
//     const green = imgData.data[i + 1];
//     const blue = imgData.data[i + 2];
//     //const alpha = data[i + 3];
//     // console.log(red, green, blue);
//   }
// }

// // let context = initialize("2d");
// let imageObj = loadImage("./img/test1.png", context);

// // img.onload = function () {
// //   //   can.width = img.width;
// //   //   can.height = img.height;
// //   ctx.drawImage(img, 0, 0, img.width, img.height);
// // };
// // img.src = urlimg;
// // $("#image1").attr("src", img.src);

// // function preload() {
// //   img = ;
// // }

// // function setup() {
// //   createCanvas(400, 400);

// //   // Resize the image so it fits on the screen.
// //   // We make it 100x100 so we can see individual pixels.
// //   img.resize(100, 100);

// //   noSmooth();
// // }
// // function loadPixels() {}
// // function draw() {
// //   //   img.loadPixels();

// //   // Loop 100 times to speed up the animation.
// //   for (let i = 0; i < data.length; i += 4) {
// //     // sortPixels();
// //     const red = data[i];
// //     const green = data[i + 1];
// //     const blue = data[i + 2];
// //     //const alpha = data[i + 3];
// //     console.log(red, green, blue);
// //   }

// //   //   img.updatePixels();

// //   //   image(img, 0, 0, width, height);
// // }
// function randomInRange(max) {
//   return Math.round(Math.random() * max);
// }
// function sortPixels(img) {
//   const imageData = context.getImageData(0, 0, can.width, can.height);
//   // Get a random pixel.

//   const x = randomInRange(img.width);
//   const y = randomInRange(img.height - 1);

//   // Get the color of the pixel.
//   ////const colorOne = img.imgData.get(x, y);
//   const colorOne = context.getImageData(x, y, 1, 1).data;
//   const colorTwo = context.getImageData(x, y + 1, 1, 1).data;
//   // console.log(colorOne, colorTwo);

//   // Get the color of the pixel below the first one.
//   ////const colorTwo = img.imgData.get(x, y + 1);

//   // Get the total R+G+B of both colors.
//   ////const totalOne = red(colorOne) + green(colorOne) + blue(colorTwo);
//   ////const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);
//   const totalOne = colorOne[0] + colorOne[1] + colorOne[2];
//   const totalTwo = colorTwo[0] + colorTwo[1] + colorTwo[2];

//   // If the first total is less than the second total, swap the pixels.
//   // This causes darker colors to fall to the bottom,
//   // and light pixels to rise to the top.
//   if (totalOne < totalTwo) {
//     console.log("swapping");
//     context.getImageData(x, y, 1, 1).data[0] = colorTwo[0];
//     context.getImageData(x, y, 1, 1).data[1] = colorTwo[1];
//     context.getImageData(x, y, 1, 1).data[2] = colorTwo[2];
//     // img.set(x, y, colorTwo);
//     // img.set(x, y + 1, colorOne);
//     // swapColors(colorOne, colorTwo);
//   }
//   context.putImageData(imageData, 0, 0);
// }

// function swapColors(c1, c2) {}
// // preload();
// // setup();
// // draw();
let frames = ["./img/thanos_idle.png", "./img/thanos.gif"];
let frameNumber = 0;
var refreshIntervalId = setInterval(function () {
  image = document.getElementById("thanos");
  image.src = frames[frameNumber];
}, 1);

let config = {
  strength: 0.75,
  threshold: 0.45,
  scale: 1,
  verical: true,
};

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.setImmediate = (() => {
  return (
    window.setImmediate ||
    function (callback) {
      return window.setTimeout(callback, 0);
    }
  );
})();

(() => {
  "use strict";

  // var src = "./img/bokeh.jpeg",
  var src = "./img/stark.jpeg",
    width, // Canvas width
    rowWidth, // Length of a row of pixels in the bitmap data
    height, // Canvas height
    canvas, // jQuery canvas object
    container, // jQuery parent of canvas object
    img, // HTML img with our source
    ctx, // 2d canvas context
    running = false, // Is the requestAnimationFrame running for draws?
    gui, // Controls
    thresholdInt, // Threshold value converted to a scale of max 3 * 255
    a, // Strength, used for alpha blending
    vertical, // Orientation of comparisons
    maxColumn, // If horizontal, all but the rightmost column
    maxRow, // If vertical, all but the bottom row
    bitmap, // ImageData object
    bitmapData; // R's, G's, B's and A's for every X and Y

  // Change the color of a pixel in a bitmap with alpha blending
  function setPixel(index, r, g, b) {
    var orgR = bitmapData[index],
      orgG = bitmapData[index + 1],
      orgB = bitmapData[index + 2];

    // Linear interpolation with a
    bitmapData[index] = orgR + a * (r - orgR);
    bitmapData[index + 1] = orgG + a * (g - orgG);
    bitmapData[index + 2] = orgB + a * (b - orgB);
  }

  // Compare the difference between two indexes in the bitmap
  function compare(sourceIndex, targetIndex) {
    var oldTotal =
        bitmapData[targetIndex] +
        bitmapData[targetIndex + 1] +
        bitmapData[targetIndex + 2],
      newTotal =
        bitmapData[sourceIndex] +
        bitmapData[sourceIndex + 1] +
        bitmapData[sourceIndex + 2];

    // Which way are we comparing?
    if (thresholdInt > 0) {
      return oldTotal - newTotal > thresholdInt;
    } else {
      return oldTotal - newTotal < thresholdInt;
    }
  }

  // Compare and recolor two bitmap indices
  function processIndexPair(sourceIndex, targetIndex) {
    if (!compare(sourceIndex, targetIndex)) {
      return;
    }

    // Save values before overwriting
    var oldR = bitmapData[targetIndex],
      oldG = bitmapData[targetIndex + 1],
      oldB = bitmapData[targetIndex + 2];

    // Swap them pixels
    setPixel(
      targetIndex,
      bitmapData[sourceIndex],
      bitmapData[sourceIndex + 1],
      bitmapData[sourceIndex + 2]
    );
    setPixel(sourceIndex, oldR, oldG, oldB);
  }

  // Do a single iteration
  function iterate() {
    // Loop through all the pixels
    for (var rowIndex = 0; rowIndex < maxRow; rowIndex += rowWidth) {
      var maxY = rowIndex + maxColumn;
      for (var columnIndex = rowIndex; columnIndex < maxY; columnIndex += 4) {
        if (vertical) {
          // Compare [x, y] with [x, y + 1]
          processIndexPair(columnIndex, columnIndex + rowWidth);
        } else {
          // Compare [x, y] with [x + 1, y]
          processIndexPair(columnIndex, columnIndex + 4);
        }
      }
    }

    // Repeat immediately
    window.setImmediate(iterate);
  }

  // Copy the latest bitmap to the canvas every frame
  function draw() {
    window.requestAnimFrame(draw);
    ctx.putImageData(bitmap, 0, 0);
  }

  // Start drawing, start moving
  function start() {
    if (running) {
      return;
    }
    running = true;
    draw();
    iterate();
  }

  // When image data is loaded
  function imageReady() {
    // How big is the image?
    width = img.width * config.scale;
    height = img.height * config.scale;

    // Fill the container
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    canvas.style.width = width;
    canvas.style.height = height;
    // .css("width", width)
    // .css("height", height)
    // .attr("width", width)
    // .attr("height", height);

    // Define compared pixels
    rowWidth = width * 4;
    if (vertical) {
      // All but the bottom row
      maxColumn = rowWidth;
      maxRow = (height - 1) * rowWidth;
    } else {
      // All but the right column (= 4 values)
      maxColumn = rowWidth - 4;
      maxRow = height * rowWidth;
    }

    // Get the bitmap to paint on
    ctx.drawImage(img, 0, 0, width, height);
    bitmap = ctx.getImageData(0, 0, width, height);
    bitmapData = bitmap.data;

    // Start walking
    // setTimeout(() => {

    // }, 2000);
  }

  // Stretch the canvas to fit the container and restart the magic
  function reload() {
    // Load config values
    a = config.strength;
    vertical = config.vertical;

    // Scale over maximum value
    thresholdInt = Math.floor(Math.pow(config.threshold, 7) * 3 * 255);

    // Place the image
    img = new Image();
    img.onload = imageReady;
    img.src = src;
  }

  // Adds controls
  // function addDatGui() {
  //   gui = new dat.GUI();
  //   gui.close();

  //   gui.add(config, "scale", 1, 4).step(1).onFinishChange(reload);
  //   gui.add(config, "strength", 0, 1).onFinishChange(reload);
  //   gui.add(config, "threshold", -1, 1).onFinishChange(reload);
  //   gui.add(config, "vertical").onFinishChange(reload);

  //   $("#controls").on("click", function () {
  //     gui.open();
  //     return false;
  //   });
  // }

  // Dropping occured
  function fileDropped(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files; // FileList object
    if (!(files && files.length)) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      src = e.target.result;
      reload();
    };
    reader.readAsDataURL(files[0]);
  }

  // Prepare to allow droppings
  function initFileDrop(dropZone) {
    // dropZone
    //   .bind("dragover", false)
    //   .bind("dragenter", false)
    //   .bind("drop", fileDropped);
    dropZone.addEventListener("drop", (e) => {
      fileDropped(e);
    });
  }

  // Open canvas as img
  function clicked() {
    open().document.write('<img src="' + $canvas[0].toDataURL() + '"/>');
  }

  function init() {
    // Create the canvas
    canvas = document.createElement("canvas"); //$("<canvas />");
    canvas.click(clicked);
    container = document.getElementById("container1");
    // container.append(canvas);
    container.insertBefore(canvas, document.getElementById("thanos"));
    ctx = canvas.getContext("2d");

    // Allow dropping files
    initFileDrop(document.documentElement);

    // Controls
    // addDatGui();

    // On resize: reload(). Now: reload()
    // window.resize(reload).resize();
    window.onload = (e) => {
      reload(e);
    };
    window.addEventListener("resize", (e) => {
      reload(e);
    });
  }
  document.getElementById("thanos").addEventListener("click", (e) => {
    frameNumber = 1;
    clearInterval(refreshIntervalId);
    image = document.getElementById("thanos");
    image.src = frames[frameNumber];
    if (frameNumber) {
      setTimeout(() => {
        start();
        setTimeout(() => {
          frameNumber = 0;
          image.src = frames[frameNumber];
        }, 1200);
      }, 200);
    }

    console.log(frameNumber);
  });

  // Leggo!
  init();
})();
