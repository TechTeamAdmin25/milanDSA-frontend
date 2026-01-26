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
  // CORE
  "Operations & Resources": "Operations and Resource Management",
  "Publicity & Social Media": "Publicity",
  "Public Relations": "Public Relations",
  Media: "Media",
  EMCEE: "EMCEE",
  Hospitality: "Hospitality",
  Sponsorship: "Sponsorship",
  Content: "Content",
  "Transport & Acc": "Transportation and Accommodation",
  "Tech Team and GD": "Tech and Graphic Design",
  "Certificate & Prizes": "Certificate and Prize Distribution",
  Treasurer: "Treasurer",
  Discipline: "Discipline",

  // CLUBS
  "Music Club": "Music",
  "Dance Club": "Dance",
  "Astrophillia Club": "Astrophillia",
  "Quiz Club": "Quiz",
  "Creative Arts Club": "Creative Arts",
  "Gaming Club": "Gaming",
  "Self Defence Club": "Self Defence",
  "Fashion Club": "Fashion",
  "Movie & Dramatics Club": "Movies and Dramatics",
  "Literary Club": "Literary",
  "Rotaract Club": "Rotaract",
  "Social Club": "Social",
  "Women Empowerment Club": "Women Empowerment",
  "Festival Club": "Festival",
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
