"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { QrReader } from "react-qr-reader";
import Webcam from "react-webcam";
import QrDecoder from "qrcode-decoder";
import ImageCompression from "browser-image-compression";

export default function Page() {
  const [scannedData, setScannedData] = useState(null);
  const [uploadedQRData, setUploadedQRData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [manualID, setManualID] = useState("");
  const webcamRef = useRef(null);
  const router = useRouter();

  // Handle Image Upload and Scan QR
  const handleImageUpload = async (event) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    setUploadedImage(URL.createObjectURL(file)); // Display uploaded image

    // Compress the image to reduce size
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1000 };
    const compressedFile = await ImageCompression(file, options);
    const reader = new FileReader();

    reader.onload = async () => {
      const qrDecoder = new QrDecoder();
      const result = await qrDecoder.decodeFromImage(reader.result);
      setUploadedQRData(result || "QR Code not detected");
    };

    reader.readAsDataURL(compressedFile);
  };

  const handleGoClick = () => {
    if (manualID) {
      router.push(`/user/${manualID}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Live Camera QR Scanner & Image Uploader
      </h1>

      {/* Live Camera Preview */}
      <div className="relative w-full max-w-md">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Display Scanned QR Code Result */}
      {scannedData && (
        <div className="mt-4 p-4 bg-green-200 text-green-900 rounded-lg">
          <p>Scanned QR Code Content:</p>
          <span className="font-bold">{scannedData}</span>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setScannedData(null)}
          >
            Scan Again
          </button>
        </div>
      )}

      {/* QR Code Uploader */}
      <div className="mt-6 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload QR Code Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 border rounded p-2 w-full"
        />

        {/* Display Uploaded Image Preview */}
        {/* {uploadedImage && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Uploaded Image:</p>
            <img
              src={uploadedImage}
              alt="Uploaded QR"
              className="mt-2 rounded-lg shadow-lg max-w-xs"
            />
          </div>
        )} */}

        {/* Display Uploaded QR Code Result */}
        {uploadedQRData && (
          <div className="mt-4 p-4 bg-blue-200 text-blue-900 rounded-lg">
            <p>Extracted QR Code Content:</p>
            <span className="font-semibold">{uploadedQRData}</span>
          </div>
        )}
      </div>

      {/* Manual ID Input Section */}
      <div className="mt-6 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter ID Manually:
        </label>
        <input
          type="text"
          value={manualID}
          onChange={(e) => setManualID(e.target.value)}
          placeholder="Enter ID..."
          className="mt-2 border rounded p-2 w-full"
        />
        <button
          onClick={handleGoClick}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full"
        >
          Go
        </button>
        {manualID && (
          <div className="mt-4 p-4 bg-yellow-200 text-yellow-900 rounded-lg">
            <p>Manual ID Entered:</p>
            <span className="font-semibold">{manualID}</span>
          </div>
        )}
      </div>
    </div>
  );
}