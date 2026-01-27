export const dynamic = "force-dynamic";

import { GalleryClient } from "./GalleryClient";

export default async function GalleryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let images: string[] = [];
  let error = false;

  try {
    const res = await fetch(`${baseUrl}/api/gallery`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    images = await res.json();
  } catch (e) {
    console.error("Failed to fetch gallery images:", e);
    error = true;
  }

  if (error) {
    return (
      <main className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
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

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <GalleryClient initialImages={images} />
    </main>
  );
}
