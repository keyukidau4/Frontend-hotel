import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Dropzone from "react-dropzone";
import axios from "../../../utils/axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfViewer = () => {
  const [file, setFile] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
  };

  const handlePageClick = (e) => {
    if (file) {
      const nativeEventOf = e.nativeEvent;
      const { layerX, layerY } = nativeEventOf;
      const x = layerX;
      const y = layerY - 10;
      console.log(`x: ${x} y: ${y}`);
      const newAnnotation = {
        x: x,
        y: y,
        text: "add new text success",
      };

      setAnnotations([...annotations, newAnnotation]);
    }
  };

  //send to server
  const sendPdfToServer = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("annotations", JSON.stringify(annotations));

      const response = await axios.post("/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending PDF to server:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btnprimary" onClick={sendPdfToServer}>
          send
        </button>
      </div>
      <Dropzone onDrop={onDrop} accept=".pdf" multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop a PDF file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
      {file && (
        <div style={{ height: "500px", width: "100%" }}>
          <Document file={file}>
            <Page
              className="m-5"
              pageNumber={1}
              onClick={handlePageClick}
              style={{ cursor: "pointer" }}
            >
              {annotations.map((annotation, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: annotation.y,
                    left: annotation.x,
                    color: "red",
                    pointerEvents: "none", // prevent annotations from blocking clicks on the page
                  }}
                >
                  {annotation.text}
                </div>
              ))}
            </Page>
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
