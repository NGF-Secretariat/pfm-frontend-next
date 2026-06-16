"use client";

import React, { useState, useRef } from "react";

type UploadType = "actual" | "budget" | "landing-page";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<UploadType>("actual");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to trigger custom toasts
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "xlsx" && extension !== "xls") {
      showToast("Invalid format. Please select an Excel file (.xlsx, .xls)", "error");
      return;
    }

    setSelectedFile(file);
    showToast(`Loaded: ${file.name}`, "info");
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showToast("Please select a file to upload first.", "error");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStep("Reading spreadsheet...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const endpointMap: Record<UploadType, string> = {
      actual: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/actual`,
      budget: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/budget`,
      "landing-page": `${process.env.NEXT_PUBLIC_API_BASE_URL}/landing-page/upload`,
    };

    // Simulated progress steps for better user feedback
    const steps = [
      { progress: 30, text: "Verifying workbook schema..." },
      { progress: 60, text: "Processing rows and columns..." },
      { progress: 85, text: "Transmitting safe payload..." },
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setUploadProgress(steps[currentStepIndex].progress);
        setUploadStep(steps[currentStepIndex].text);
        currentStepIndex++;
      }
    }, 600);

    try {
      const response = await fetch(endpointMap[uploadType], {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadProgress(100);
      setUploadStep("Completed!");

      setTimeout(() => {
        showToast("Excel sheet uploaded and parsed successfully!", "success");
        setSelectedFile(null);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      clearInterval(interval);
      console.error(error);
      showToast("Upload failed. Please check the spreadsheet format.", "error");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start font-sans antialiased text-slate-800">

      {/* Dynamic Slide-in Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-center gap-3 transition-all duration-300 transform translate-y-0 animate-fade-in ${t.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : t.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-800"
                : "bg-emerald-50/50 border-emerald-200/60 text-[#012c14]"
              }`}
          >
            {t.type === "success" && (
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {t.type === "error" && (
              <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {t.type === "info" && (
              <svg className="w-5 h-5 text-[#012c14] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className="text-sm font-medium">{t.message}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden mt-6 transition-all duration-200">

        {/* Modern Header Banner featuring Deep Pine Green Gradient */}
        <div className="relative bg-gradient-to-r from-[#012c14] via-[#043d1d] to-[#0c5c2d] px-8 py-10 text-white">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Excel Upload Center</h1>
          <p className="mt-2 text-emerald-100/90 text-sm max-w-md">
            Upload your spreadsheet configurations, budgets, and operational actuals directly into our cloud ledger system.
          </p>
        </div>

        <div className="p-8 space-y-8">

          {/* Section: Upload Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 tracking-wide uppercase">
              Select Data Upload Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Type Card: Actual */}
              <button
                type="button"
                onClick={() => setUploadType("actual")}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${uploadType === "actual"
                  ? "border-[#012c14] bg-[#012c14]/5 shadow-sm"
                  : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                <span className={`p-2 rounded-lg inline-block mb-3 ${uploadType === "actual" ? "bg-[#012c14] text-white" : "bg-slate-100 text-slate-500"}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-900 text-sm">Actuals</span>
                <span className="text-xs text-slate-500 mt-1">Real operational ledger sheets</span>
              </button>

              {/* Type Card: Budget */}
              <button
                type="button"
                onClick={() => setUploadType("budget")}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${uploadType === "budget"
                  ? "border-[#012c14] bg-[#012c14]/5 shadow-sm"
                  : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                <span className={`p-2 rounded-lg inline-block mb-3 ${uploadType === "budget" ? "bg-[#012c14] text-white" : "bg-slate-100 text-slate-500"}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-900 text-sm">Budget</span>
                <span className="text-xs text-slate-500 mt-1">Forecast financial frameworks</span>
              </button>

              {/* Type Card: Landing Page */}
              <button
                type="button"
                onClick={() => setUploadType("landing-page")}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all ${uploadType === "landing-page"
                  ? "border-[#012c14] bg-[#012c14]/5 shadow-sm"
                  : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                <span className={`p-2 rounded-lg inline-block mb-3 ${uploadType === "landing-page" ? "bg-[#012c14] text-white" : "bg-slate-100 text-slate-500"}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-900 text-sm">Landing Page</span>
                <span className="text-xs text-slate-500 mt-1">Landing page configurations</span>
              </button>

            </div>
          </div>

          {/* Section: File Dropzone Form */}
          <form onDragEnter={handleDrag} className="space-y-6">
            <div
              className={`relative rounded-xl border-2 border-dashed p-8 transition-all flex flex-col items-center justify-center cursor-pointer ${dragActive
                ? "border-[#012c14] bg-[#012c14]/5 scale-[0.99]"
                : "border-slate-200 hover:border-[#012c14]/50 hover:bg-slate-50/40"
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                style={{ display: "none" }}
                onChange={handleChange}
              />

              {!selectedFile ? (
                <div className="text-center space-y-3">
                  <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#012c14] font-semibold text-sm hover:underline">Choose a file</span>
                    <span className="text-slate-500 text-sm"> or drag & drop here</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Acceptable formats: Excel Spreadsheets <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">.xlsx</code> or <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">.xls</code>
                  </p>
                </div>
              ) : (
                <div className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 bg-emerald-100 text-[#012c14] rounded-lg">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {formatBytes(selectedFile.size)} • Excel Workbook
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 hover:bg-slate-200/60 rounded-full text-slate-400 hover:text-rose-600 transition-all"
                    title="Remove File"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Live Loading Status Component */}
            {isUploading && (
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/50 space-y-2.5 animate-pulse">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5 text-[#012c14]">
                    <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {uploadStep}
                  </span>
                  <span className="text-[#012c14]">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-2">
                  <div
                    className="bg-[#012c14] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action buttons */}
            {selectedFile && !isUploading && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={removeFile}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#012c14] hover:bg-[#043d1d] active:bg-[#00170a] rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload and Parse
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}