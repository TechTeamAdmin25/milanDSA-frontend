"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { ImageData } from "@/components/ui/img-sphere";
import { IMAGES, CORE_TEAM_ROLES, CLUB_CONVENORS } from "./data";
import "./styles.css";

// TEAM COMPONENTS
import TeamHeading from "@/components/teams/TeamHeading";
import MobileLists from "@/components/teams/MobileLists";
import DesktopLists from "@/components/teams/DesktopLists";
import HoverPreview from "@/components/teams/HoverPreview";
import ConvenorModal from "@/components/teams/ConvenorModal";

const SphereImageGrid = dynamic(() => import("@/components/ui/img-sphere"), {
  ssr: false,
});

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
// ------------------------

export default function TeamClient() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // 1. Data States
  const [teamData, setTeamData] = useState<TeamData>({});

  // 🔥 DYNAMIC IMAGES: This array holds the Real People from the API
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

  // 2. Fetch API Data & Convert to Images
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data: TeamData) => {
        setTeamData(data);

        // Convert API Data -> Sphere Images List
        const allMembers: ImageData[] = [];

        Object.values(data).forEach((team) => {
          team.members.forEach((member) => {
            allMembers.push({
              id: member.code,
              src: member.image, // ✅ Uses the correct API path (e.g. /Teams/Music/...)
              alt: member.name,
              title: member.name,
              description: member.position,
            });
          });
        });

        if (allMembers.length > 0) {
          setSphereImages(allMembers);
        }
      })
      .catch((err) => console.error("❌ Failed to fetch teams:", err));
  }, []);

  // Handle Resize
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

  // 🔥 UPDATED LOGIC: Get Real Member Image
  // This replaces "getRandomImage". It PRIORITIZES the API data.
  const getMemberImage = (id: string) => {
    // 1. Look for the real person in our fetched list
    const found = sphereImages.find((img) => img.id === id);
    if (found) return found;

    // 2. Loading State Fallback
    // Only use the placeholder mountains if API data hasn't loaded yet.
    // Once data is loaded, this line should rarely be reached for valid members.
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return IMAGES[hash % IMAGES.length];
  };

  return (
    <main className="w-full h-screen relative bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
      <TeamHeading />

      {/* 📱 MOBILE ONLY */}
      {isMobile && (
        <MobileLists
          isMobile
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
          coreRoles={CORE_TEAM_ROLES}
          clubs={CLUB_CONVENORS}
          getRandomImage={getMemberImage} // ✅ Pass the new function
          setSelectedConvenor={setSelectedConvenor}
          setSelectedSphereImage={setSelectedSphereImage}
        />
      )}

      {/* 🔒 SPHERE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <SphereImageGrid
            // ✅ Use Dynamic Images (Real People) if loaded, else Loading Placeholders
            images={sphereImages.length > 0 ? sphereImages : IMAGES}
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
              setSelectedSphereImage(img);
              if (img) setSelectedConvenor(null);
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
          getRandomImage={getMemberImage} // ✅ Pass the new function
          setSelectedConvenor={setSelectedConvenor}
          setSelectedSphereImage={setSelectedSphereImage}
          setHoveredConvenor={setHoveredConvenor}
          setPopupPosition={setPopupPosition}
        />
      )}

      {/* 🔥 HOVER PREVIEW - Using Dynamic Data */}
      {!selectedConvenor && (
        <HoverPreview
          hoveredConvenor={hoveredConvenor}
          popupPosition={popupPosition}
          getRandomImage={getMemberImage} // ✅ Pass the new function
        />
      )}

      {/* MODAL */}
      <ConvenorModal
        convenor={selectedConvenor}
        onClose={() => setSelectedConvenor(null)}
      />
    </main>
  );
}
