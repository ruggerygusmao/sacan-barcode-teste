import React, { useCallback, useState } from "react";
import {
  BoletoBarcodeReader,
  BoletoBarcodeReaderProvider,
  isSmartDevice
} from "react-boleto-reader";
import "react-boleto-reader/dist/index.css";
import "./styles.css";
import Quagga from 'quagga'; // ES6

export default function Example() {
  const [boleto, setBoleto] = useState(null);
  const [reading, setReading] = useState(false);

  const onDetected = useCallback(
    (detectedBoleto) => {
      setBoleto(null);
      setReading(false);

      if (boleto) {
        return;
      }

      console.log(
        "\n\nTODOS OS DADOS DO BOLETO NO CONSOLE: \n",
        detectedBoleto,
        "\n\n"
      );

      setBoleto(detectedBoleto);
    },
    [boleto]
  );

  const onCancel = useCallback(() => {
    setBoleto(null);
    setReading(false);
  }, []);

  const restart = useCallback(() => {
    setTimeout(() => {
      setBoleto(null);
      setReading(true);
    }, 250);
  }, []);

  return (
    <main style={{ textAlign: "center" }}>
      {!reading && <h1>React Boleto Barcode Reader example</h1>}
      <section>
        {false ? (
          <>Your device are not capable to use the barcode reader.</>
        ) : (
          <>
            {!reading && !boleto && (
              <button type="button" id="read_start" onClick={restart}>
                Start Reading
              </button>
            )}

            {reading && (
              <BoletoBarcodeReaderProvider>
                <BoletoBarcodeReader
                  id="bora-ler-um-boleto-maroto"
                  height={`${window.innerHeight}px`}
                  onDetected={onDetected}
                  onCancel={onCancel}
                />
              </BoletoBarcodeReaderProvider>
            )}

            {boleto && (
              <article id="result">
                <pre
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(boleto || {})
                      .replace(/{/g, "{<br />  ")
                      .replace(/":/g, '": ')
                      .replace(/,"/g, ',<br />  "')
                      .replace(/}/g, "<br />}")
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "20px",
                    background: "#f8f8f8",
                    overflow: "auto",
                    textAlign: "left"
                  }}
                />
                <footer id="result_footer">
                  <button type="button" id="read_again" onClick={restart}>
                    Read Again
                  </button>
                </footer>
              </article>
            )}
          </>
        )}
      </section>
    </main>
  );
}
