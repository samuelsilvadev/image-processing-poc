async function enableGetUserMedia() {
  const video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: window.innerWidth
    }
  });
  video.srcObject = stream;
}

async function enableDeviceOrientation() {
  // --- Starting to get device metadata ---- //
  if (
    DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    const permission = await DeviceOrientationEvent.requestPermission();

    if (permission === "granted") {
      function handleOrientation(event) {
        const absolute = event.absolute;

        // Z axis
        const alpha = event.alpha;

        // X axis
        // relative to the plane of the screen
        // positive towards the right
        // negative towards the left
        const beta = event.beta;

        // Y axis
        const gamma = event.gamma;

        const orientationDataElement = document.getElementById(
          "orientation-data"
        );
        const orientationElement = document.getElementById("orientation");
        orientationDataElement.innerHTML = `Absolute: ${absolute}, Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`;
        orientationElement.innerHTML = `${
          window.screen && window.screen.orientation
            ? window.screen.orientation.type
            : window.orientation
        }`;
      }

      window.addEventListener("deviceorientation", handleOrientation);
    }
  }
}

function drawCanvas({ canvas, width, height, img }) {
  canvas.width = width;
  canvas.height = height;

  const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width - img.width * ratio) / 2;
  const y = (canvas.height - img.height * ratio) / 2;

  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  canvas
    .getContext("2d")
    .drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    );
}

function takePicture() {}

document
  .getElementById("user-media-button")
  .addEventListener("click", enableGetUserMedia);

document
  .getElementById("device-orientation-button")
  .addEventListener("click", enableDeviceOrientation);

document
  .getElementById("take-picture-button")
  .addEventListener("click", takePicture);
