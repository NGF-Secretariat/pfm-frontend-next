"use client";

import { useState } from "react";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }} className="text-gradient">Upload Data</h1>
        <p style={{ color: "var(--text-secondary)" }}>Securely import your datasets into the platform</p>
      </div>

      <div className="card">
        <form 
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <div 
            className={`upload-dropzone ${dragActive ? "active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <div className="upload-icon">
              ↑
            </div>
            
            {selectedFile ? (
              <div style={{ color: "var(--text-primary)", fontWeight: "500", fontSize: "18px" }}>
                {selectedFile.name}
              </div>
            ) : (
              <>
                <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>
                  Drag & Drop your file here
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
                  Supported formats: CSV, Excel, JSON (Max 50MB)
                </div>
                <button type="button" className="btn-primary" onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('file-upload').click();
                }}>
                  Browse Files
                </button>
              </>
            )}
            
            <input 
              id="file-upload" 
              type="file" 
              style={{ display: "none" }} 
              onChange={handleChange} 
            />
          </div>

          {selectedFile && (
            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => {
                  alert(`Uploading ${selectedFile.name}...`);
                  setSelectedFile(null);
                }}
              >
                Start Upload
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="card" style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>Upload Guidelines</h3>
        <ul style={{ color: "var(--text-secondary)", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
          <li>Ensure data is properly formatted according to the template schema.</li>
          <li>For large datasets, we recommend using compressed CSV format.</li>
          <li>All uploaded data is automatically encrypted at rest.</li>
        </ul>
      </div>
    </div>
  );
}
