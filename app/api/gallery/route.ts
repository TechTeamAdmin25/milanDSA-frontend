import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const IMAGE_REGEX = /\.(png|jpe?g|webp|avif)$/i;

function getImagesRecursively(dir: string, publicPath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let images: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const nextPublicPath = `${publicPath}/${entry.name}`;

    if (entry.isDirectory()) {
      images = images.concat(
        getImagesRecursively(absolutePath, nextPublicPath),
      );
    } else if (IMAGE_REGEX.test(entry.name)) {
      images.push(nextPublicPath);
    }
  }

  return images;
}

export async function GET() {
  const galleryRoot = path.join(process.cwd(), "public/GalleryPage");

  const images = getImagesRecursively(galleryRoot, "/GalleryPage");

  return NextResponse.json(images);
}
