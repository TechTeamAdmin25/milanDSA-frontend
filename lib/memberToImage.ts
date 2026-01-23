import { ImageData } from "@/components/ui/img-sphere";
import { Member } from "../types/member";

const cache = new Map<string, ImageData>();

export function memberToImage(member?: Member): ImageData | null {
  if (!member?.code) return null;

  if (cache.has(member.code)) {
    return cache.get(member.code)!;
  }

  const src =
    member.imagePath ??
    (member.teamKey
      ? `/Teams/${member.teamKey}/${member.code}.jpg`
      : `/Teams/${member.code}.jpg`);

  const img: ImageData = {
    id: member.code,
    src,
    alt: member.name ?? "Team member",
    title: member.name ?? "",
    description: member.position ?? "",
  };

  cache.set(member.code, img);
  return img;
}
