"use client";

import SphereImageGrid, { ImageData } from "@/components/ui/img-sphere";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  RefreshCw,
  Loader2,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================
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

// ==========================================
// CONFIG: Sidebar Categories
// ==========================================
const CORE_TEAM_ROLES = [
  "Cultural Secretary",
  "Joint Secretary",
  "Operations & Resources",
  "Tech Team",
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
  "Astrophilia Club",
  "Sports Club",
  "Quiz Club",
  "Creative Arts Club",
  "Gaming Club",
  "Self Defence Club",
  "Fashion Club",
  "Movie & Dramatics Club",
  "Rubiks Cube Club",
  "Social Club",
  "Literary Club",
  "Rotaract Club",
  "Women Empowerment Club",
  "Festival Club",
];

// Map UI labels to API keys if they differ
const LABEL_MAP: Record<string, string> = {
  "Operations & Resources": "Operations and Resource Management",
  "Tech Team": "Tech and Graphic Design",
  "Publicity & Social Media": "Publicity",
  "Transport & Acc": "Transportation and Accommodation",
  "Certificate & Prizes": "Certificate and Prize Distribution",
  "Movie & Dramatics Club": "Movies and Dramatics",
  "Social Club": "Social",
  "Astrophilia Club": "Astrophillia", // Note spelling in API
};

export function TeamSphere() {
  // --- STATE ---
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // Data
  const [teamData, setTeamData] = useState<TeamData>({});
  const [sphereImages, setSphereImages] = useState<ImageData[]>([]);

  // UI Interaction
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hoveredConvenor, setHoveredConvenor] = useState<string | null>(null);
  const [selectedConvenor, setSelectedConvenor] = useState<ImageData | null>(
    null,
  );
  const [selectedSphereImage, setSelectedSphereImage] =
    useState<ImageData | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Mobile View State
  const [corePage, setCorePage] = useState(0);
  const [clubPage, setClubPage] = useState(0);
  const [mobileView, setMobileView] = useState<"club" | "core">("core");
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState({
    core: false,
    club: false,
  });
  const itemsPerPage = 5;

  const convenorRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>(
    {},
  );

  // --- 1. FETCH DATA ON MOUNT ---
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
              src: member.image, // Real API Path
              alt: member.name,
              title: member.name,
              description: member.position,
            });
          });
        });

        if (allMembers.length > 0) {
          setSphereImages(allMembers);
        }

        // Simulating a small delay so you can see the lightbulb effect
        // Remove setTimeout in production if you want instant load
        setTimeout(() => setLoading(false), 800);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch teams:", err);
        setLoading(false);
      });
  }, []);

  // --- 2. RESIZE HANDLER ---
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;
      setIsMobile(mobile);
      const size = mobile
        ? Math.min(width, height) * 0.85
        : Math.min(width, height) * 0.9;
      setDimensions({ width: size, height: size });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Helpers
  const sphereRadius = dimensions.width * (isMobile ? 0.4 : 0.45);
  const baseImageScale = isMobile ? 0.6 : 0.2;

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) => {
      if (prev.has(itemId)) return new Set();
      return new Set([itemId]);
    });
  };

  // Helper to find members for a sidebar category
  const getMembersForRole = (role: string): ApiMember[] => {
    if (!teamData) return [];

    // 1. Check direct match
    // 2. Check mapped match
    // 3. Normalized match
    const mappedLabel = LABEL_MAP[role] || role;
    const normalize = (s: string) => s.toLowerCase().trim();

    const entry = Object.entries(teamData).find(
      ([_, block]) => normalize(block.label) === normalize(mappedLabel),
    );

    return entry ? entry[1].members : [];
  };

  // Helper to find image data for a member code
  const getMemberImage = (code: string): ImageData => {
    return (
      sphereImages.find((img) => img.id === code) || {
        id: "fallback",
        src: "",
        alt: "Member",
        title: "Member",
        description: "",
      }
    );
  };

  // --- RENDERERS ---

  const renderExpandableItem = (
    item: string,
    category: "core" | "club",
    disableHover: boolean = false,
  ) => {
    const itemId = `${category}-${item}`;
    const isExpanded = expandedItems.has(itemId);
    const members = getMembersForRole(item);

    // If no members found for this role, don't render empty list (optional)
    if (members.length === 0) return null;

    return (
      <div
        key={itemId}
        className="mb-2">
        <button
          onClick={() => toggleItem(itemId)}
          className="flex items-center gap-2 w-full text-left hover:text-gray-900 transition-colors group">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}>
            <ChevronRight
              size={16}
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
            />
          </div>
          <span className="text-gray-700 text-base">{item}</span>
        </button>

        <div
          className={`overflow-visible transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ overflow: isExpanded ? "visible" : "hidden" }}>
          <div className="pl-6 pt-2 space-y-2">
            {members.map((member) => {
              const convenorImage = getMemberImage(member.code);

              const handleMouseEnter = (
                e: React.MouseEvent<HTMLDivElement>,
              ) => {
                if (disableHover) return;
                const rect = e.currentTarget.getBoundingClientRect();
                setPopupPosition({
                  x: rect.left - 120,
                  y: rect.top + rect.height / 2,
                });
                setHoveredConvenor(member.code);
              };

              return (
                <div
                  key={member.code}
                  className="relative flex items-center min-h-[1.5rem]"
                  onMouseEnter={disableHover ? undefined : handleMouseEnter}
                  onMouseLeave={() => {
                    setHoveredConvenor(null);
                    setPopupPosition(null);
                  }}>
                  <div
                    className="text-gray-600 text-base cursor-pointer hover:text-gray-900 transition-colors flex items-center"
                    onClick={() => {
                      // 🔥 FIX: Clear hover immediately
                      setHoveredConvenor(null);
                      setPopupPosition(null);

                      if (selectedConvenor?.id === convenorImage.id) {
                        setSelectedConvenor(null);
                      } else {
                        setSelectedConvenor(convenorImage);
                        setSelectedSphereImage(null); // Deselect sphere node
                      }
                    }}>
                    <span className="mr-2">⤷</span>
                    <span className="truncate max-w-[180px]">
                      {member.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderConvenorModal = () => {
    if (!selectedConvenor) return null;

    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
        <div
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-gray-200"
          style={{ animation: "scaleIn 0.3s ease-out" }}>
          <div className="relative aspect-square">
            <Image
              src={selectedConvenor.src}
              alt={selectedConvenor.alt}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedConvenor(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full text-white flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer">
              <X size={16} />
            </button>
          </div>

          {(selectedConvenor.title || selectedConvenor.description) && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                {selectedConvenor.title}
              </h3>
              <p className="text-gray-600">{selectedConvenor.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- LOADING STATE: "LIGHTBULB" EFFECT ---
  if (loading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative flex items-center justify-center">
          {/* Outer Glow */}
          <div className="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
          {/* Inner "Bulb" */}
          <div className="relative w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.6)] flex items-center justify-center animate-bounce">
            <Loader2 className="text-white w-8 h-8 animate-spin" />
          </div>
        </div>
        <p className="mt-8 text-gray-500 font-medium animate-pulse">
          Initializing Team Sphere...
        </p>
      </main>
    );
  }

  // --- MAIN RENDER ---
  return (
    <>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .overflow-y-auto::-webkit-scrollbar { display: none; }
        .overflow-y-auto { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="w-full h-screen flex flex-col justify-end items-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden md:min-h-screen md:justify-center md:items-center md:pt-22 animate-in fade-in duration-1000">
        <h1 className="absolute top-18 left-4 text-6xl font-bold text-gray-900 tracking-tight md:top-15 md:left-10 md:text-[10rem] z-50 animate-in fade-in duration-1000">
          Our
        </h1>
        <h1 className="absolute top-30 left-5 text-6xl font-bold text-gray-900 tracking-tight md:top-46 md:left-12 md:text-[10rem] z-50 animate-in fade-in duration-1000">
          Team<span className="text-purple-600">.</span>
        </h1>

        {/* 📱 MOBILE LISTS (Core/Club Toggle) */}
        <div className="flex md:hidden w-full px-4 mt-24 mb-0 justify-end">
          <div className="flex flex-col items-end max-w-[50%]">
            <div className="text-xs font-medium text-gray-400 mb-1 mr-3">
              {mobileView === "core" ? "Open Clubs ⤵" : "Open Core Team ⤵"}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-base font-bold text-gray-900">
                {mobileView === "core" ? "Core Team" : "Club Convenors"}
              </h2>
              <button
                onClick={() => {
                  setIsViewTransitioning(true);
                  setTimeout(() => {
                    setMobileView((prev) =>
                      prev === "core" ? "club" : "core",
                    );
                    setTimeout(() => setIsViewTransitioning(false), 50);
                  }, 200);
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors">
                <RefreshCw
                  size={16}
                  className="text-gray-600 refresh-icon"
                />
              </button>
            </div>

            <div className="space-y-1 relative min-h-[200px] w-full">
              {/* Mobile List Rendering Logic (Simplified for brevity - follows same pattern as Desktop) */}
              {mobileView === "core"
                ? CORE_TEAM_ROLES.slice(
                    corePage * itemsPerPage,
                    (corePage + 1) * itemsPerPage,
                  ).map((role) => renderExpandableItem(role, "core", true))
                : CLUB_CONVENORS.slice(
                    clubPage * itemsPerPage,
                    (clubPage + 1) * itemsPerPage,
                  ).map((club) => renderExpandableItem(club, "club", true))}
            </div>

            {/* Pagination Controls... (Keep existing logic or simplify) */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  mobileView === "core"
                    ? setCorePage(Math.max(0, corePage - 1))
                    : setClubPage(Math.max(0, clubPage - 1))
                }
                disabled={
                  mobileView === "core" ? corePage === 0 : clubPage === 0
                }
                className="text-xs text-gray-500 disabled:opacity-30">
                Prev
              </button>
              <button
                onClick={() => {
                  const list =
                    mobileView === "core" ? CORE_TEAM_ROLES : CLUB_CONVENORS;
                  const curr = mobileView === "core" ? corePage : clubPage;
                  const max = Math.ceil(list.length / itemsPerPage) - 1;
                  if (curr < max) {
                    mobileView === "core"
                      ? setCorePage(curr + 1)
                      : setClubPage(curr + 1);
                  }
                }}
                className="text-xs text-gray-500">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* 🌎 SPHERE */}
        <div className="flex flex-col items-center justify-center gap-8 pb-0 md:pb-0 md:w-full">
          <SphereImageGrid
            images={sphereImages}
            containerSize={dimensions.width}
            sphereRadius={sphereRadius}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseImageScale={baseImageScale}
            perspective={1000}
            autoRotate={true}
            autoRotateSpeed={0.2}
            selectedImage={selectedSphereImage}
            onImageSelect={(image) => {
              setSelectedSphereImage(image);
              if (image) setSelectedConvenor(null);
            }}
          />
        </div>

        {/* 🖥 DESKTOP SIDEBAR */}
        <div
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-row gap-12 max-w-2xl"
          style={{ maxHeight: "calc(100vh - 4rem)" }}>
          <div className="flex flex-col gap-6">
            <div
              className="flex flex-col"
              style={{ maxHeight: "calc(50vh - 2rem)" }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                Core Team
              </h2>
              <div className="space-y-0 overflow-y-auto pr-2">
                {CORE_TEAM_ROLES.map((role) =>
                  renderExpandableItem(role, "core", false),
                )}
              </div>
            </div>

            <div
              className="flex flex-col"
              style={{ maxHeight: "calc(50vh - 2rem)" }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">
                Clubs
              </h2>
              <div className="space-y-0 overflow-y-auto pr-2">
                {CLUB_CONVENORS.map((club) =>
                  renderExpandableItem(club, "club", false),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 👻 HOVER POPUP (With strict check) */}
        {!selectedConvenor && hoveredConvenor && popupPosition && (
          <div
            className="fixed z-50 pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              transform: "translateY(-50%)",
            }}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-24 h-24 border-2 border-gray-200">
              <Image
                src={getMemberImage(hoveredConvenor).src}
                alt={getMemberImage(hoveredConvenor).alt}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* 🔳 MODAL */}
        {renderConvenorModal()}
      </main>
    </>
  );
}
