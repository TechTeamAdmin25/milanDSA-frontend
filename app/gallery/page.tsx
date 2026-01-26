import { GalleryClient } from "./GalleryClient";

export default async function GalleryPage() {
  // FIX: Create a robust base URL.
  // If NEXT_PUBLIC_APP_URL isn't set, fallback to localhost:3000 (development).
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let images: string[] = [];
  let error = false;

  try {
    const res = await fetch(`${baseUrl}/api/gallery`, {
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    images = await res.json();
  } catch (e) {
    console.error("Failed to fetch gallery images:", e);
    error = true;
  }

  // 1. Error State (Styled to match your dark theme)
  if (error) {
    return (
      <main className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
        {/* Background Gradients (Kept for consistency) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-400">
            Unable to Load Gallery
          </h2>
          <p className="text-neutral-400">
            We couldn&apos;t retrieve the moments right now.
          </p>
        </div>
      </main>
    );
  }

  // 2. Success State
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Gradients (Must match loading.tsx exactly) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[160px]" />
      </div>

      <GalleryClient initialImages={images} />
    </main>
  );
}
