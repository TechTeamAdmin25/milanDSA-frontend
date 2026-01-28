import fs from "fs";
import path from "path";

const IMAGE_REGEX = /\.(png|jpe?g|webp|avif)$/i;

function getImagesRecursively(dir: string, publicPath = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const abs = path.join(dir, entry.name);
    const pub = `${publicPath}/${entry.name}`;

    if (entry.isDirectory()) {
      return getImagesRecursively(abs, pub);
    }

    return IMAGE_REGEX.test(entry.name) ? [pub] : [];
  });
}

// 🔥 This runs at BUILD TIME
const galleryRoot = path.join(process.cwd(), "public/GalleryPage");

export const galleryImages: string[] = fs.existsSync(galleryRoot)
  ? getImagesRecursively(galleryRoot, "/GalleryPage")
  : [];
