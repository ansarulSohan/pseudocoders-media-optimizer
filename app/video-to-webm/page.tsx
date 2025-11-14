"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Header from "../components/Header";
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
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8 sm:px-16 bg-white dark:bg-black mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">
            Video Compressor
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Compress your videos to WebM format for smaller file sizes and
            better web compatibility. All processing happens directly in your
            browser.
          </p>
        </div>

        <div className="space-y-8">
          {/* File Upload Section */}
          <section className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <label
              htmlFor="video-upload"
              className="block text-sm font-medium mb-4 text-black dark:text-zinc-50"
            >
              Select Video File
            </label>
            <div className="flex flex-col gap-4">
              <input
                ref={fileInputRef}
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 border border-zinc-200 dark:border-zinc-800 rounded-md p-2"
                disabled={isCompressing || !isFFmpegReady}
              />
              {!isFFmpegReady && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Loading FFmpeg… please wait a moment before compressing.
                </p>
              )}
              {originalSize && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Original size:{" "}
                  <span className="font-medium">
                    {formatFileSize(originalSize)}
                  </span>
                </p>
              )}
            </div>
          </section>

          {/* Quality Settings */}
          {videoFile && (
            <section className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
              <label className="block text-sm font-medium mb-4 text-black dark:text-zinc-50">
                Compression Quality
              </label>
              <div className="flex gap-4">
                {(["low", "medium", "high"] as Quality[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    disabled={isCompressing}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      quality === q
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    } ${isCompressing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {q.charAt(0).toUpperCase() + q.slice(1)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Lower quality = smaller file size. Higher quality = better
                visuals but larger file size.
              </p>
            </section>
          )}

          {/* Original Video Preview */}
          {videoPreview && (
            <section className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
                Original Video Preview
              </h2>
              <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
                <Suspense
                  fallback={
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                      loading...
                    </div>
                  }
                >
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    controls
                    className="w-full h-full object-cover object-center rounded-lg border border-zinc-200 dark:border-zinc-800"
                  />
                </Suspense>
              </div>
            </section>
          )}

          {/* Compress Button */}
          {videoFile && !compressedVideoUrl && (
            <section className="pb-8">
              <button
                onClick={handleCompress}
                disabled={isCompressing || !isFFmpegReady}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCompressing
                  ? `Compressing... ${progress}%`
                  : "Compress to WebM"}
              </button>
              {(isCompressing || statusMessage) && (
                <div className="mt-4 space-y-2">
                  {statusMessage && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                      {statusMessage}
                    </p>
                  )}
                  {isCompressing && (
                    <>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                        {progress}% complete
                      </p>
                    </>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Compressed Video Result */}
          {compressedVideoUrl && (
            <section className="pb-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Compressed Video
                </h2>
                {compressedSize && originalSize && (
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {Math.round((1 - compressedSize / originalSize) * 100)}%
                      smaller
                    </span>{" "}
                    ({formatFileSize(compressedSize)})
                  </div>
                )}
              </div>
              <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden mb-4">
                <video
                  src={compressedVideoUrl}
                  controls
                  className="w-full h-full"
                />
              </div>
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Download Compressed Video
              </button>
            </section>
          )}

          {/* Instructions */}
          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
              How to Use
            </h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Select a video file from your device</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Choose your preferred compression quality</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Click &quot;Compress to WebM&quot; and wait</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Preview and download your compressed video</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-bold text-crimson-500 dark:text-red-500">
              Note: Video compression happens entirely in your browser. Make
              sure that the file you are uploading is smaller than 300MB.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
