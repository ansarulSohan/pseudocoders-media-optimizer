import Card from "../components/Card";

export default function Tools() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-12 text-center text-black dark:text-zinc-50">
        Tools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Video Compressor"
          description="Compress your videos to WebM format for smaller file sizes and better web compatibility."
          image="https://placehold.co/64x64/png"
          href="/video-to-webm"
        />
      </div>
    </div>
  );
}
