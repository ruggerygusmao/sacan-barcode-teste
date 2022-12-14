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


// import React, { Component } from 'react'
// import Scanner from './Scanner'
// import {TextareaAutosize, Paper} from '@material-ui/core'
// import { BoxScan } from './Styles'

// class App extends Component {
  
//   state = {
//     results: [],
//     show: false,
//   }
  
//   _scan = () => {
//     this.setState({ scanning: !this.state.scanning })
//   }
//   _active = () => {
//     console.log(this.state.show)
//     this.setState({ show: !this.state.show })
//   }

//   _onDetected = result => {
//     this.setState({ results: [] })
//     this.setState({ results: this.state.results.concat([result]) })
//     this.setState({ show: !this.state.show })
//     this._scan();
//   }

//   render() {
//     return (
//       <div>
//         <span>Barcode Scanner</span>
//         <button onClick={this._active}>Ler código</button>
       

//        {this.state.show ?
//           <BoxScan>
//             <Scanner onDetected={this._onDetected} />
//           </BoxScan>
//         :null }
       

//         <TextareaAutosize
//             style={{fontSize:32, width:320, height:100, marginTop:30}}
//             rowsMax={4}
//             defaultValue={'No data scanned'}
//             value={this.state.results[0] ? this.state.results[this.state.results.length - 1].codeResult.code : 'No data scanned'}
//         />

//       </div>
//     )
//   }
// }

// export default App;

import React, { useState } from 'react';
import { Scanner } from './Scanner';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const App = () => {
  const [scanCode, setScanCode] = useState('');
  const [modal, setModal] = useState(false);

  const _toggle = () => {
    setModal(!modal);
  };

  const _onDetected = (result) => {
    setModal(false);
    setScanCode(result ? result.codeResult.code : '');
  };

  return (
    <div>
      <button onClick={_toggle}>
        Scan Barcode
      </button>

      <div>
        <input id="scanner_result" type="text" value={scanCode} />
      </div>

     <Dialog
        open={modal}
        onClose={_toggle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      > 
        <DialogContent>
          <Scanner handleScan={_onDetected} />
        </DialogContent>
        </Dialog>
      </div>
   
  );
};
export default App ;
