import { NextResponse } from "next/server";
import { galleryImages } from "@/lib/gallery";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(galleryImages);
}
