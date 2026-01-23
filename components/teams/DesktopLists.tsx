"use client";

import ExpandableItem from "./ExpandableItem";
import { ImageData } from "@/components/ui/img-sphere";

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

interface Props {
  teamData: TeamData;
  expandedItems: Set<string>;
  setExpandedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  coreRoles: string[];
  clubs: string[];
  getRandomImage: (id: string) => ImageData;
  setSelectedConvenor: (img: ImageData | null) => void;
  setSelectedSphereImage: (img: ImageData | null) => void;
  setHoveredConvenor: (id: string | null) => void;
  setPopupPosition: (pos: { x: number; y: number } | null) => void;
}

// 🔥 MAP: UI Sidebar Name -> JSON Label Name
const LABEL_MAP: Record<string, string> = {
  // Core Mismatches
  "Operations & Resources": "Operations and Resource Management",
  "Tech Team": "Tech Team and GD",
  "Publicity & Social Media": "Publicity", // Maps to 'P' key
  "Transport & Acc": "Transportation and Accommodation",
  "Certificate & Prizes": "Certificate and Prize Distribution",

  // Club Mismatches (Removing ' Club' suffix)
  "Music Club": "Music",
  "Dance Club": "Dance",
  "Astrophilia Club": "Astrophilia",
  "Sports Club": "Sports", // Ensure JSON has this Label
  "Quiz Club": "Quiz",
  "Creative Arts Club": "Creative arts", // JSON uses lowercase 'arts'
  "Gaming Club": "Gaming",
  "Self Defence Club": "Self defence", // JSON uses lowercase 'defence'
  "Fashion Club": "Fashion",
  "Movie & Dramatics Club": "Movies and Dramatics",
  "Rubiks Cube Club": "Rubiks Cube",
  "Social Club": "Social",
  "Literary Club": "Literary",
  "Rotaract Club": "Rotaract",
};

export default function DesktopLists({
  teamData,
  setHoveredConvenor,
  setPopupPosition,
  ...props
}: Props) {
  const getMembersForLabel = (uiLabel: string) => {
    if (!teamData) return [];

    // 1. Resolve the correct label using the map, or fallback to the original
    const targetLabel = LABEL_MAP[uiLabel] || uiLabel;

    // 2. Normalize for comparison (lowercase, trim)
    const normalize = (str: string) => str.toLowerCase().trim();
    const searchTarget = normalize(targetLabel);

    // 3. Find the matching team in JSON
    const foundEntry = Object.entries(teamData).find(
      ([_, team]) => normalize(team.label) === searchTarget,
    );

    if (!foundEntry) {
      // Optional: Log mismatches to help debug
      // console.warn(`Mismatch: UI "${uiLabel}" -> Mapped "${targetLabel}" not found in JSON.`);
      return [];
    }

    const [key, team] = foundEntry;

    return team.members.map((member) => ({
      ...member,
      teamKey: key,
    }));
  };

  return (
    <aside
      className="
        hidden md:block
        absolute right-10 top-24
        w-[320px]
        max-h-[calc(100vh-6rem)]
        overflow-y-auto
        pr-2
      ">
      {/* CORE TEAM */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Core Team Convenors</h2>
        <div className="space-y-1">
          {props.coreRoles.map((role) => (
            <ExpandableItem
              key={role}
              item={role}
              category="core"
              members={getMembersForLabel(role)}
              {...props}
              onHover={(id, rect) => {
                setHoveredConvenor(id);
                setPopupPosition({
                  x: rect.left - 140,
                  y: rect.top + rect.height / 2,
                });
              }}
              onLeave={() => {
                setHoveredConvenor(null);
                setPopupPosition(null);
              }}
            />
          ))}
        </div>
      </section>

      {/* CLUB CONVENORS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Club Convenors</h2>
        <div className="space-y-1">
          {props.clubs.map((club) => (
            <ExpandableItem
              key={club}
              item={club}
              category="club"
              members={getMembersForLabel(club)}
              {...props}
              onHover={(id, rect) => {
                setHoveredConvenor(id);
                setPopupPosition({
                  x: rect.left - 140,
                  y: rect.top + rect.height / 2,
                });
              }}
              onLeave={() => {
                setHoveredConvenor(null);
                setPopupPosition(null);
              }}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}
