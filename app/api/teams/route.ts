import { NextResponse } from "next/server";

// 1. DIRECT IMPORTS
import clubTeamData from "../../team/club-team.json";
import coreTeamData from "../../team/core-team.json";

// --- TYPES ---
type RawMember = {
  code: string;
  name: string;
  position: string;
};

type RawTeamBlock = {
  label: string;
  members: RawMember[];
};

type Member = RawMember & {
  image: string;
};

type TeamBlock = {
  label: string;
  members: Member[];
};

type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
const RAW_DATA: Record<string, RawTeamBlock> = {
  ...clubTeamData,
  ...coreTeamData,
} as unknown as Record<string, RawTeamBlock>;

const KEY_TO_FOLDER: Record<string, string> = {
  // --- CLUBS ---
  MAD: "MOVIES AND DRAMATICS",
  SO: "SOCIAL",
  CA: "CREATIVE ARTS",
  G: "GAMING",
  LIT: "LITERARY",
  FA: "FASHION",
  FS: "FESTIVAL",
  AS: "ASTROPHILLIA",
  DA: "DANCE",
  MU: "MUSIC",
  WE: "WOMEN EMPOWERMENT",
  Q: "QUIZ",
  RO: "ROTRACT",
  SD: "SELF DEFENCE",

  // --- CORE ---
  ORM: "OPERATIONS & RESOURCE MANAGEMENT",
  P: "PUBLICITY",
  PR: "PUBLIC RELATIONS",
  M: "MEDIA",
  E: "EMCEE",
  H: "HOSPITALITY",
  S: "SPONSORSHIP",
  C: "CONTENT",
  TA: "TRANSPORT AND ACCODAMATION",
  TG: "TECH AND GRAPHICS",
  CP: "CERTIFICATES AND PRIZE DISTRIBUTION",
  TR: "TREASURER",
  DS: "DISCIPLINE",
};

export async function GET() {
  const mergedResult: TeamJSON = {};

  try {
    for (const [teamKey, teamData] of Object.entries(RAW_DATA)) {
      // 1. Resolve Folder Name
      let folderName = KEY_TO_FOLDER[teamKey];
      if (!folderName) folderName = teamKey;

      const encodedFolder = encodeURIComponent(folderName);

      // 2. Process Members
      // Note: We cannot use fs.access here in Vercel production.
      // We generate the path assuming the file exists.
      // If the file is missing, the Frontend <SphereNode> must handle the 404
      // by returning null (hiding the node).
      const validMembers: Member[] = teamData.members.map((member) => {
        // 🔥 CHANGED to .JPG (Uppercase) based on your request
        const imageFilename = `${member.code}.JPG`;

        return {
          ...member,
          image: `/Teams/${encodedFolder}/${imageFilename}`,
        };
      });

      if (validMembers.length > 0) {
        mergedResult[teamKey] = {
          label: teamData.label,
          members: validMembers,
        };
      }
    }

    return NextResponse.json(mergedResult);
  } catch (error) {
    console.error(`❌ Error processing team data:`, error);
    return NextResponse.json(
      { error: "Failed to load team data" },
      { status: 500 },
    );
  }
}
