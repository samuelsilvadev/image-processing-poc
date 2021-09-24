async function enableGetUserMedia() {
  const player = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  player.srcObject = stream;
}

(async () => {
  // --- Starting to get device metadata ---- //
  // NOTE: This validation is for SAFARI
  if (
    DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    const permission = await DeviceOrientationEvent.requestPermission();

    if (permission === "granted") {
      function handleOrientation(event) {
        const absolute = event.absolute;
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        const orientationDataElement =
          document.getElementById("orientation-data");
        orientationDataElement.innerHTML = `Absolute: ${absolute}, Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`;
      }

      window.addEventListener("deviceorientation", handleOrientation);
    }
  }
})();
