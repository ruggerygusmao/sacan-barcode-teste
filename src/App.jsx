import React, { Component } from 'react';
import Quagga from 'quagga';
import { AiOutlineBarcode } from "react-icons/ai";

class Scanner extends Component {

  componentDidMount = () => {
    Quagga.init({
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: 640,
          height: 480,
          facing: "environment" // or user
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 2,
      decoder: {
        readers: ["code_128_reader"]
      },
      locate: true
    }, function (err) {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount = () => {
    Quagga.offDetected(this._onDetected);
  }
  _onDetected = (result) => {
    this.props.onDetected(result);
  }

  render() {
    return (
      <div id="interactive" className="viewport" />
    );
  }
}

class Result extends Component {

  render() {
    console.log(this.props.result[0].codeResult.code)

      const result = this.props.result;
      const total = this.props.result.length;
   
      if (!result) {
        return null;
    }
    return (
      <div>
        <input type="text" value={result[total - 1].codeResult.code}/> 
      </div>
    );
  }
}

class App extends Component {

  state = {
    scanning: false,
    results: []
  }
  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    this.setState({ results: this.state.results.concat([result]) });
    this._scan();
  };
  

  render() {
    console.log(this.state.results)
    return (
      <div>
        Ler código de barras: <AiOutlineBarcode size="2em" onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</AiOutlineBarcode>
        <div className="results">
          {/* {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}  */}
          {this.state.results.length === 0 ? null : <Result result={this.state.results} />}
        </div>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }
}

export default App;