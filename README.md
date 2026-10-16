# MediaKit

MediaKit is a small set of browser-based media tools. The video converter turns a local video into WebM without uploading the source file.

## Requirements

- Node.js 20 or newer
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available tools

- **Video to WebM** — convert videos in the browser, select a quality preset, preview the result, and download it. Files up to 300 MB are supported.

## Build

```bash
pnpm build
pnpm start
```

Video conversion uses FFmpeg WebAssembly. Processing large files can take time and use substantial browser memory.
