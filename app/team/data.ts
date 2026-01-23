import { ImageData } from "@/components/ui/img-sphere";

export const BASE_IMAGES: Omit<ImageData, "id">[] = [
  {
    src: "https://images.unsplash.com/photo-1758178309498-036c3d7d73b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 1",
    title: "Mountain Landscape",
    description:
      "A beautiful landscape captured at golden hour with mountains in the background.",
  },
  {
    src: "https://images.unsplash.com/photo-1757647016230-d6b42abc6cc9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072",
    alt: "Image 2",
    title: "Portrait Photography",
    description:
      "Stunning portrait photography showcasing natural lighting and composition.",
  },
  {
    src: "https://images.unsplash.com/photo-1757906447358-f2b2cb23d5d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 3",
    title: "Urban Architecture",
    description:
      "Modern architectural design featuring clean lines and geometric patterns.",
  },
  {
    src: "https://images.unsplash.com/photo-1742201877377-03d18a323c18?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064",
    alt: "Image 4",
    title: "Nature Scene",
    description:
      "Peaceful nature scene with vibrant colors and natural beauty.",
  },
  {
    src: "https://images.unsplash.com/photo-1757081791153-3f48cd8c67ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 5",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "https://images.unsplash.com/photo-1757626961383-be254afee9a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 6",
    title: "Mountain Landscape",
    description:
      "A beautiful landscape captured at golden hour with mountains in the background.",
  },
  {
    src: "https://images.unsplash.com/photo-1756748371390-099e4e6683ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 7",
    title: "Portrait Photography",
    description:
      "Stunning portrait photography showcasing natural lighting and composition.",
  },
  {
    src: "https://images.unsplash.com/photo-1755884405235-5c0213aa3374?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 8",
    title: "Urban Architecture",
    description:
      "Modern architectural design featuring clean lines and geometric patterns.",
  },
  {
    src: "https://images.unsplash.com/photo-1757495404191-e94ed7e70046?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 9",
    title: "Nature Scene",
    description:
      "Peaceful nature scene with vibrant colors and natural beauty.",
  },
  {
    src: "https://images.unsplash.com/photo-1756197256528-f9e6fcb82b04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064",
    alt: "Image 10",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "https://images.unsplash.com/photo-1534083220759-4c3c00112ea0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
    alt: "Image 11",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
  {
    src: "https://images.unsplash.com/photo-1755278338891-e8d8481ff087?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1674",
    alt: "Image 12",
    title: "Abstract Art",
    description:
      "Creative abstract composition with bold colors and unique patterns.",
  },
];

export const IMAGES: ImageData[] = Array.from({ length: 60 }, (_, i) => {
  const base = BASE_IMAGES[i % BASE_IMAGES.length];
  return {
    id: `img-${i + 1}`,
    ...base,
    alt: `${base.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
  };
});

export const CORE_TEAM_ROLES = [
  "Operations & Resources",
  "Tech Team and GD",
  "Hospitality",
  "Public Relations",
  "Publicity & Social Media",
  "Transport & Acc",
  "Content",
  "EMCEE",
  "Media",
  "Certificate & Prizes",
  "Sponsorship",
  "Treasurer",
  "Discipline",
];

export const CLUB_CONVENORS = [
  "Music Club",
  "Dance Club",
  "Astrophillia Club",
  "Quiz Club",
  "Creative Arts Club",
  "Gaming Club",
  "Self Defence Club",
  "Fashion Club",
  "Women Empowerment Club",
  "Movie & Dramatics Club",
  "Social Club",
  "Literary Club",
  "Rotaract Club",
  "Festival Club",
];
