import React, { useState } from 'react'
import "./QrCode.css"

const QRcode = () => {

    const [img ,setImg] = useState("../qrcode.png");
    const [loading,setLoading] = useState(false);
    const [qrData,setQrData] = useState("krish.com");
    const [qrsize,setQrSize] = useState("150")

    function downloadQr() {
        fetch(img).then((Response) => Response.blob()).then((blob) =>{
            const link =document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error Downloading QR code",error);
        });
    }
    async function generateQR() {
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);

        }catch(err){
            console.error("Error generating QR code",err)

        }finally{
            setLoading(false);
        }


    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait....</p>}
        {img && <img src={img} className='Qr-code-image'/>}
        <div>
            <label htmlFor='dataInput' className='input-label'>
            Data for QR code :
            </label>
            <input type="text" value={qrData} onChange={(e) => setQrData(e.target.value)} id="dataInput" placeholder='Enter data for QR-code' />
            <label htmlFor='sizeInput' className='input-label'>
            Image size (eg., 150) :
            </label>
            <input type="text"  value={qrsize} onChange={(e) => setQrSize(e.target.value)}id="sizeInput" placeholder='Enter image size' />
            <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQr}>Download QR Code</button>

        </div>
        <p className='footer'> krish QR-CODE Generator </p>
    </div>
  )
}

export default QRcode