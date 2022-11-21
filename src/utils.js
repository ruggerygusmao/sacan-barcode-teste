export function getCamerasFromMediaDevices() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          // hacky approach to close any active stream if they are
          // active.
          const closeActiveStreams = (stream) => {
            const tracks = stream.getVideoTracks();
            for (const track of tracks) {
              track.enabled = false;
              track.stop();
              stream.removeTrack(track);
            }
          };
  
          navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              const results = [];
              for (const device of devices) {
                if (device.kind === "videoinput") {
                  results.push({
                    id: device.deviceId,
                    label: device.label
                  });
                }
              }
              closeActiveStreams(stream);
              resolve(results);
            })
            .catch((err) => {
              reject(`${err.name} : ${err.message}`);
            });
        })
        .catch((err) => {
          reject(`${err.name} : ${err.message}`);
        });
    });
  }
  