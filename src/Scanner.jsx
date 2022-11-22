// import React, { Component } from 'react'
// import Quagga from 'quagga'

// class Scanner extends Component {
//   componentDidMount() {
//     Quagga.init(
//       {
//         inputStream: {
//           type: 'LiveStream',
//           constraints: {
//             width: 640,
//             height: 320,
//             facingMode: 'environment',
//           },
//          area: { // defines rectangle of the detection/localization area
//              top: "10%",    // top offset
//              right: "10%",  // right offset
//             left: "20%",   // left offset
//              bottom: "10%"  // bottom offset
//            },
//         },
//         locator: {
//             halfSample: true,
//             patchSize: "large", // x-small, small, medium, large, x-large
//             debug: {
//                 showCanvas: true,
//                 showPatches: false,
//                 showFoundPatches: false,
//                 showSkeleton: false,
//                 showLabels: false,
//                 showPatchLabels: false,
//                 showRemainingPatchLabels: false,
//                 boxFromPatches: {
//                     showTransformed: true,
//                     showTransformedBox: true,
//                     showBB: true
//               }
//             }
//         },
//         numOfWorkers: 4,
//         decoder: {
//             readers: ['code_128_reader'],
//             debug: {
//                 drawBoundingBox: true,
//                 showFrequency: true,
//                 drawScanline: true,
//                 showPattern: true
//             },
//         },
//         locate: true,
//       },
//       function(err) {
//         if (err) {
//           return console.log(err)
//         }
//         Quagga.start()
//       },
//     )
//     Quagga.onDetected(this._onDetected)
//   }

//   componentWillUnmount() {
//     Quagga.offDetected(this._onDetected);
//     Quagga.stop();
//   }

//   _onDetected = result => {
//     this.props.onDetected(result);
//     Quagga.stop();
//   }

//   render() {
//     return <div id="interactive" className="viewport"/>
//     }
// }

// export default Scanner


import React, { useEffect } from "react";
import Quagga from "quagga";
import styled from "styled-components";

const ScanArea = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  transform: scale(0.7, 0.7);
  .viewport {
    position: absolute;
    top: -200px;
    left: -530px;
    overflow: hidden;
  }
  .scanBorder {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 100px;
    top: 60px;
    left: -50px;
    font-size: 40px;
    border: solid 2px #fff;
    color: #fff;
    z-index: 666;
  }
`;

const Scanner = (props) => {
  const _onDetected = (result) => {
    let code = result;
    Quagga.stop();
    return props.handleScan(code);
  };

  // ↓検出中にボックスを描画する時にオンにする
  const _onProcessed = (result) => {
    // let drawingCtx = Quagga.canvas.ctx.overlay,
    //   drawingCanvas = Quagga.canvas.dom.overlay;
    // if (result) {
    //   if (result.boxes) {
    //     drawingCtx.clearRect(
    //       0,
    //       0,
    //       parseInt(drawingCanvas.getAttribute('width'), 10),
    //       parseInt(drawingCanvas.getAttribute('height'), 10)
    //     );
    //     result.boxes
    //       .filter(function (box) {
    //         return box !== result.box;
    //       })
    //       .forEach(function (box) {
    //         Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
    //           color: 'green',
    //           lineWidth: 2,
    //         });
    //       });
    //   }
    //   if (result.box) {
    //     Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
    //       color: '#00F',
    //       lineWidth: 2,
    //     });
    //   }
    //   if (result.box) {
    //     Quagga.ImageDebug.drawPath(
    //       result.line,
    //       { x: 'x', y: 'y' },
    //       drawingCtx,
    //       { color: 'red', lineWidth: 3 }
    //     );
    //   }
    // }
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            // ↓検出の精度に影響するので見た目はcssで調整
            width: { min: 800, max: 1280 },
            height: { min: 600, max: 720 },
            aspectRatio: { min: 4 / 3, max: 16 / 9 }
          },
          area: {
            // defines rectangle of the detection/localization area
            top: "0%", // top offset
            right: "0%", // right offset
            left: "0%", // left offset
            bottom: "0%" // bottom offset
          }
        },
        frequency: "full",
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            // 'code_39_reader',
            //'ean_reader',
            // 'ean_8_reader',
            "code_128_reader"
            //'code_39_vin_reader'
            //'codabar_reader',
            // 'upc_reader',
            //'upc_e_reader',
            //'i2of5_reader'
          ]
        },
        locate: true
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed(_onProcessed);
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <>
      <div id="interactive" className="viewport" />
      {/* <div className="scanBorder">BARCODE</div> */}
    </>
  );
};

export { Scanner };
