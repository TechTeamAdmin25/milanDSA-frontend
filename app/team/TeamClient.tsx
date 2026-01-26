"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

import { ImageData } from "@/components/ui/img-sphere";
import "./styles.css";

import MobileLists from "@/components/teams/MobileLists";
import DesktopLists from "@/components/teams/DesktopLists";
import HoverPreview from "@/components/teams/HoverPreview";
import ConvenorModal from "@/components/teams/ConvenorModal";

const SphereImageGrid = dynamic(() => import("@/components/ui/img-sphere"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

// --- CONSTANTS ---
const CORE_TEAM_ROLES = [
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

const CLUB_CONVENORS = [
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

// --- TYPES ---
type ApiMember = {
  code: string;
  name: string;
  position: string;
  image: string;
};

type TeamBlock = {
  label: string;
  members: ApiMember[];
};

type TeamData = Record<string, TeamBlock>;

export default function TeamClient() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data & UI States
  const [teamData, setTeamData] = useState<TeamData>({});
  const [sphereImages, setSphereImages] = useState<ImageData[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hoveredConvenor, setHoveredConvenor] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedConvenor, setSelectedConvenor] = useState<ImageData | null>(
    null,
  );
  const [selectedSphereImage, setSelectedSphereImage] =
    useState<ImageData | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data: TeamData) => {
        setTeamData(data);
        const allMembers: ImageData[] = [];
        Object.values(data).forEach((team) => {
          team.members.forEach((member) => {
            allMembers.push({
              id: member.code,
              src: member.image,
              alt: member.name,
              title: member.name,
              description: member.position,
            });
          });
        });
        if (allMembers.length > 0) setSphereImages(allMembers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch teams:", err);
        setLoading(false);
      });
  }, []);

  // --- RESIZE HANDLER ---
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);
      const size = mobile ? Math.min(w, h) * 0.85 : Math.min(w, h) * 0.9;
      setDimensions({ width: size, height: size });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sphereRadius = dimensions.width * (isMobile ? 0.4 : 0.45);
  const baseImageScale = isMobile ? 0.6 : 0.2;

  // --- HELPERS ---
  const getMemberImage = (id: string): ImageData => {
    const found = sphereImages.find((img) => img.id === id);
    if (found) return found;

    // 🔥 FIX 1: Provide a valid fallback image so HoverPreview doesn't crash
    return {
      id: "placeholder",
      src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop", // Generic fallback
      alt: "Loading...",
      title: "Loading...",
      description: "",
    };
  };

  const handleMemberSelect = (img: ImageData | null) => {
    if (img) {
      setHoveredConvenor(null);
      setPopupPosition(null);
      setSelectedConvenor(img);
      setSelectedSphereImage(img);
    } else {
      setSelectedConvenor(null);
    }
  };

  // --- LOADING SCREEN ---
  if (loading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F7]">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-16 h-16 bg-neutral-900 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center justify-center animate-bounce">
            <Loader2 className="text-white w-8 h-8 animate-spin" />
          </div>
        </div>
        <p className="mt-8 text-neutral-500 font-medium animate-pulse">
          Loading Team...
        </p>
      </main>
    );
  }

  // --- MAIN UI ---
  return (
    <main className="w-full h-screen relative bg-[#F5F5F7] text-neutral-900 overflow-hidden selection:bg-purple-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent blur-[100px]" />
      </div>

      {/* Heading */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-neutral-900 animate-in fade-in slide-in-from-top-4 duration-1000">
          Our
        </h1>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-neutral-900 animate-in fade-in slide-in-from-top-8 duration-1000 delay-100">
          Team<span className="text-purple-600">.</span>
        </h1>
      </div>

      {/* 📱 MOBILE LISTS */}
      {isMobile && (
        <MobileLists
          isMobile
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          coreRoles={CORE_TEAM_ROLES}
          clubs={CLUB_CONVENORS}
          getRandomImage={getMemberImage}
          setSelectedConvenor={handleMemberSelect}
          setSelectedSphereImage={setSelectedSphereImage}
          teamData={teamData}
        />
      )}

      {/* 🔒 SPHERE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="pointer-events-auto">
          <SphereImageGrid
            images={sphereImages}
            containerSize={dimensions.width}
            sphereRadius={sphereRadius}
            baseImageScale={baseImageScale}
            autoRotate
            autoRotateSpeed={0.2}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            perspective={1000}
            selectedImage={selectedSphereImage}
            onImageSelect={(img) => {
              // Clicking the sphere logic
              setSelectedSphereImage(img);

              // 🔥 FIX 2: Pass the image to the modal handler instead of null
              if (img) {
                handleMemberSelect(img);
              } else {
                handleMemberSelect(null);
              }
            }}
          />
        </div>
      </div>

      {/* 🖥 DESKTOP LISTS */}
      {!isMobile && (
        <DesktopLists
          teamData={teamData}
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          coreRoles={CORE_TEAM_ROLES}
          clubs={CLUB_CONVENORS}
          getRandomImage={getMemberImage}
          setSelectedConvenor={handleMemberSelect}
          setSelectedSphereImage={setSelectedSphereImage}
          setHoveredConvenor={setHoveredConvenor}
          setPopupPosition={setPopupPosition}
        />
      )}

      {/* 🔥 HOVER PREVIEW */}
      {/* Logic: Show only if NO modal is open AND we are hovering over someone */}
      {!selectedConvenor && hoveredConvenor && popupPosition && (
        <HoverPreview
          hoveredConvenor={hoveredConvenor}
          popupPosition={popupPosition}
          getRandomImage={getMemberImage}
        />
      )}

      {/* MODAL */}
      {selectedConvenor && (
        <ConvenorModal
          convenor={selectedConvenor}
          onClose={() => setSelectedConvenor(null)}
        />
      )}
    </main>
  );
}
