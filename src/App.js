import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Draggable from "react-draggable";
import * as htmlToImage from "html-to-image"; // ✅ Düzenlendi
import { ChromePicker } from "react-color";
import QRCode from "qrcode"; // ✅ QRCode kütüphanesi yüklendiyse çalışır
import QrScanner from "qr-scanner";
import "./App.css";


function App() {
  const [text, setText] = useState("https://www.linkedin.com/in/aysesensoy");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(256);
  const [scanResult, setScanResult] = useState("");
  const qrRef = useRef();
  const videoRef = useRef();


  const downloadQR_PNG = () => {
    htmlToImage.toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const downloadQR_SVG = () => {
    QRCode.toString(text, {
      type: "svg",
      color: {
        dark: fgColor,
        light: bgColor,
      },
    }).then((svg) => {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      link.click();
    });
  };

  const startScan = async () => {
    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        setScanResult(result.data);
        scanner.stop();
      },
      {
        returnDetailedScanResult: true,
      }
    );

    await scanner.start();
  };

  return (
    <div className="App container">
      <h2 className="mb-4 text-center">🎯 QR Kod Oluşturucu</h2>

      <div className="mb-3">
        <label>Metin veya URL : </label>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Boyut:  {size} px </label>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="form-range"
        />
      </div>
<br></br>
      <div className="text-center">
        <div className="col-12 mb-4">
          <label>Ön Plan Rengi: </label>
          <ChromePicker color={fgColor} onChangeComplete={(c) => setFgColor(c.hex)}/>
        </div>
        <br></br>
        <div className="col-12 mb-4">
          <label>Arka Plan Rengi: </label>
          <ChromePicker color={bgColor} onChangeComplete={(c) => setBgColor(c.hex)} />
        </div>
      </div>
<br></br>
 

      <div className="text-center mb-4">
        <div ref={qrRef} style={{ position: "relative", display: "inline-block" }}>
          <QRCodeCanvas
            value={text}
            size={size}
            fgColor={fgColor}
            bgColor={bgColor}
            includeMargin={true}
            level="H"
          />
          {image && (
            <Draggable bounds="parent">
              <img
                src={image}
                alt="overlay"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: size * 0.23,
                  height: size * 0.23,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "10px",
                }}
              />
            </Draggable>
          )}
        </div>
      </div>
<br></br>
      <div className="text-center mb-3">
        <button className="btn btn-success me-2" onClick={downloadQR_PNG}>
          ⬇️ PNG Olarak İndir
        </button>
        <button className="btn btn-outline-secondary" onClick={downloadQR_SVG}>
          📦 SVG Olarak İndir
        </button>
      </div>
     
      <div className="text-center">
        <video ref={videoRef} style={{ width: "100%", maxWidth: 400 }}></video>
        {scanResult && (
          <p className="mt-3">
            <strong>Tarama Sonucu:</strong> {scanResult}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
