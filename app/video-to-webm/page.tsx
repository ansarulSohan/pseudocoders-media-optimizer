"use client";

import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

type Quality = "low" | "medium" | "high";

export default function Compress() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isFFmpegReady, setIsFFmpegReady] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [compressedVideoUrl, setCompressedVideoUrl] = useState<string | null>(
    null
  );
  const [quality, setQuality] = useState<Quality>("medium");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize FFmpeg on mount
  useEffect(() => {
    const initFFmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress }) => {
          const percent = Math.round(progress * 100);
          setProgress(percent);
        });

        ffmpeg.on("log", ({ message, type }) => {
          console.log(`FFmpeg [${type}]:`, message);
        });

        await ffmpeg.load();
        ffmpegRef.current = ffmpeg;
        setIsFFmpegReady(true);
        console.log("FFmpeg loaded");
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        setStatusMessage("Failed to load FFmpeg. Please refresh the page.");
      }
    };

    initFFmpeg();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 300 * 1024 * 1024) {
      alert("File is too large. Please select a file smaller than 300MB.");
      e.target.value = "";
      return;
    }

    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setOriginalSize(file.size);
      setCompressedVideoUrl(null);
      setCompressedSize(null);
      setProgress(0);
      setStatusMessage("");

      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    } else {
      alert("Please select a valid video file");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleCompress = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      alert("FFmpeg is not ready yet. Please wait a moment and try again.");
      return;
    }
    if (!videoFile) return;

    setIsCompressing(true);
    setProgress(0);
    setStatusMessage("Initializing compression...");

    try {
      const ext = videoFile.name.split(".").pop() || "mp4";
      const inputFile = `input.${ext}`;
      const outputFile = `input-compressed.webm`;

      const qualityMap: Record<Quality, string[]> = {
        low: ["-crf", "40", "-b:v", "500k"],
        medium: ["-crf", "28", "-b:v", "1M"],
        high: ["-crf", "23", "-b:v", "2M"],
      };

      setStatusMessage("Loading video file into FFmpeg...");

      await ffmpeg.writeFile(inputFile, await fetchFile(videoFile));

      setStatusMessage(`Compressing video: (${quality} quality)...`);

      await ffmpeg.exec([
        "-i",
        inputFile,
        "-fflags",
        "+genpts",
        "-preset",
        "ultrafast",
        "-c:v",
        "libvpx",
        ...qualityMap[quality],
        "-c:a",
        "libvorbis",
        "-threads",
        "0",
        outputFile,
      ]);

      setStatusMessage("Reading compressed video...");

      const data = (await ffmpeg.readFile(outputFile)) as Uint8Array;
      console.log("Compressed file size:", formatFileSize(data.length));

      setStatusMessage("Creating download link...");

      const uint8Array =
        data instanceof Uint8Array ? new Uint8Array(data) : new Uint8Array(0);
      const blob = new Blob([uint8Array], { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // Clean up old compressed URL if any
      if (compressedVideoUrl) {
        URL.revokeObjectURL(compressedVideoUrl);
      }

      setCompressedVideoUrl(url);
      setCompressedSize(blob.size);

      setStatusMessage("Cleaning up temporary files...");
      await ffmpeg.deleteFile(inputFile);
      await ffmpeg.deleteFile(outputFile);

      setStatusMessage("Compression completed!");
    } catch (error: any) {
      console.error("Compression error:", error);

      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message || error.toString();
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object") {
        const errObj = error as any;
        errorMessage =
          errObj.message ||
          errObj.error ||
          errObj.toString?.() ||
          String(error);
      }

      setStatusMessage(`Error: ${errorMessage}`);
      alert(
        `Compression failed: ${errorMessage}\n\nCheck the browser console (F12) for more details.`
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedVideoUrl && videoFile) {
      const a = document.createElement("a");
      a.href = compressedVideoUrl;
      a.download = videoFile.name.replace(/\.[^/.]+$/, "") + ".webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-8">
          <a href="/tools" className="text-sm font-medium text-slate-500 transition hover:text-slate-900">← All tools</a>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Convert video to WebM</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Choose a video, set your preferred quality, and download a web-ready file. Processing stays in your browser.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-3 py-2 text-xs font-medium text-lime-800">
            <span className={`h-2 w-2 rounded-full ${isFFmpegReady ? "bg-lime-500" : "bg-amber-500 animate-pulse"}`} />
            {isFFmpegReady ? "Ready to convert" : "Preparing converter…"}
          </p>
          {!isFFmpegReady && statusMessage && (
            <p role="alert" className="mt-3 text-sm text-rose-700">{statusMessage}</p>
          )}
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-lime-300">1</span>
                <div><h2 className="font-semibold text-slate-950">Choose a video</h2><p className="mt-0.5 text-xs text-slate-500">Up to 300 MB</p></div>
              </div>
              <input ref={fileInputRef} id="video-upload" type="file" accept="video/*" onChange={handleFileSelect} disabled={isCompressing || !isFFmpegReady} className="sr-only" />
              <label htmlFor="video-upload" className={`mt-6 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 text-center transition ${videoFile ? "border-lime-300 bg-lime-50/50" : "border-slate-300 bg-[#fafbf8] hover:border-slate-400 hover:bg-slate-50"} ${!isFFmpegReady || isCompressing ? "cursor-not-allowed opacity-60" : ""}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-slate-800 shadow-sm">↑</span>
                <span className="mt-4 text-sm font-semibold text-slate-900">{videoFile ? videoFile.name : "Choose a video file"}</span>
                <span className="mt-1 text-xs text-slate-500">{videoFile && originalSize ? `${formatFileSize(originalSize)} · Click to choose another` : "MP4, MOV, WebM and other video formats"}</span>
                {!videoFile && <span className="mt-4 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">Browse files</span>}
              </label>

              {videoFile && (
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-lime-300">2</span>
                    <div><h2 className="font-semibold text-slate-950">Choose quality</h2><p className="mt-0.5 text-xs text-slate-500">A higher quality can create a larger file.</p></div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {(["low", "medium", "high"] as Quality[]).map((q) => (
                      <button key={q} type="button" onClick={() => setQuality(q)} disabled={isCompressing} aria-pressed={quality === q} className={`rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition ${quality === q ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"} disabled:cursor-not-allowed disabled:opacity-50`}>
                        {q}<span className={`mt-1 block text-[10px] font-normal ${quality === q ? "text-slate-300" : "text-slate-400"}`}>{q === "low" ? "Smaller file" : q === "medium" ? "Balanced" : "More detail"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {videoFile && !compressedVideoUrl && (
                <div className="mt-6">
                  <button type="button" onClick={handleCompress} disabled={isCompressing || !isFFmpegReady} className="w-full rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
                    {isCompressing ? `Converting… ${progress}%` : "Convert to WebM"}
                  </button>
                  {(isCompressing || statusMessage) && <div className="mt-4" aria-live="polite">
                    {statusMessage && <p className="text-center text-xs text-slate-500">{statusMessage}</p>}
                    {isCompressing && <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-lime-500 transition-all" style={{ width: `${progress}%` }} /></div>}
                  </div>}
                </div>
              )}

              {compressedVideoUrl && (
                <div className="mt-7 border-t border-slate-100 pt-6" aria-live="polite">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div><h2 className="font-semibold text-slate-950">Your WebM is ready</h2><p className="mt-1 text-xs text-slate-500">{compressedSize ? formatFileSize(compressedSize) : ""}</p></div>
                    {compressedSize && originalSize && <span className="rounded-full bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800">{Math.round((1 - compressedSize / originalSize) * 100)}% smaller</span>}
                  </div>
                  <video src={compressedVideoUrl} controls className="mt-4 aspect-video w-full rounded-2xl bg-slate-950" />
                  <button type="button" onClick={handleDownload} className="mt-4 w-full rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800">Download WebM</button>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            {videoPreview ? (
              <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-semibold text-slate-950">Preview original</h2>
                <video ref={videoRef} src={videoPreview} controls className="mt-4 aspect-video w-full rounded-2xl bg-slate-950" />
              </section>
            ) : (
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 p-8">
                <div className="text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-lime-200">▶</span><p className="mt-4 text-sm font-medium text-white">Your preview appears here</p></div>
              </div>
            )}
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lg">⌂</span><h2 className="text-sm font-semibold text-slate-950">Private by design</h2></div>
              <p className="mt-3 text-xs leading-5 text-slate-500">Your video is handled in this browser session. It is not uploaded to a server. Keep this tab open until your conversion finishes.</p>
            </section>
            <p className="px-2 text-xs leading-5 text-slate-400">Large videos can take a while to process and may use significant memory. A desktop browser is recommended for files near the 300 MB limit.</p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
