// import React, { Component } from 'react';
// import Quagga from '@ericblade/quagga2'
// import { AiOutlineBarcode } from "react-icons/ai";

// class Scanner extends Component {

//   componentDidMount = () => {
//     Quagga.init({
//       inputStream: {
//         type: "LiveStream",
//         constraints: {
//           width: 640,
//           height: 480,
//           facing: "environment" // or user
//         }
//       },
//       locator: {
//         patchSize: "medium",
//         halfSample: true
//       },
//       numOfWorkers: 2,
//       decoder: {
//         readers: ["code_128_reader"]
//       },
//       locate: true
//     }, function (err) {
//       if (err) {
//         return console.log(err);
//       }
//       Quagga.start();
//     });
//     Quagga.onDetected(this._onDetected);
//   }



//   componentWillUnmount = () => {
//     Quagga.stop();
//     Quagga.offDetected(this._onDetected);
//   }

//   _onDetected = (result) => {
//     this.props.onDetected(result);
//   }

 

//   render() {
//     return (
//       <div id="interactive" className="viewport" />
//     );
//   }
// }

// class Result extends Component {

//   render() {
//     console.log(this.props.result[0].codeResult.code)

//       const result = this.props.result;
//       const total = this.props.result.length;
   
//       if (!result) {
//         return null;
//     }
//     return (
//       <div>
//         <input type="text" value={result[total - 1].codeResult.code}/> 
//       </div>
//     );
//   }
// }

// class App extends Component {

//   state = {
//     scanning: false,
//     results: []
//   }
//   _scan = () => {
//     this.setState({ scanning: !this.state.scanning });
//   };

//   _onDetected = (result) => {
//     this.setState({ results: this.state.results.concat([result]) });
//     this._scan();
//   };
  

//   render() {
//     console.log(this.state.results)
//     return (
//       <div>
//         Ler código de barras: <AiOutlineBarcode size="2em" onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</AiOutlineBarcode>
//         <div className="results">
//           {/* {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}  */}
//           {this.state.results.length === 0 ? null : <Result result={this.state.results} />}
//         </div>
//         {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}

//         <button onClick={close}>Fechar</button>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useRef } from "react";
import Scanner from "./Scanner";
import Result from "./Result";
import { getCamerasFromMediaDevices } from "./utils";

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const scannerRef = useRef(null);
  const total = results.length;

  console.log(results);
  const getCameras = () => {
    if (navigator.mediaDevices) {
      return getCamerasFromMediaDevices();
    }
  };
  const onStart = () => {
    console.log("###", "start");
    setScanning(true);
  };
  const onStop = () => {
    setScanning(false);
  };
  return (
    <div className="container">
       {scanning ?
        <div className="flyOut">
        
      
              <div id="reader" ref={scannerRef}>
                <canvas className="drawingBuffer" />
                
                <Scanner
                  isScanner={scanning}
                  scannerRef={scannerRef}
                  onDetected={(result) => {setResults([...results, result]); setScanning(false)}}
                />
                

              </div>
              </div>
            : null }
        
       
      <div className="results">
          <ul className="results">
            {results.map(
              (result) =>
                result.codeResult && (
                  <Result key={result.codeResult.code} result={result} />
                )
            )}
          </ul>
        </div>
        <div className="actions">
          <h1>Barcode Quagga2 </h1>
          <button onClick={onStart}>Start Cammera</button>
          <button onClick={onStop}>Stop Cammera</button>
          {results[total -1]}
        </div>
    </div>
  );
};

export default App;
