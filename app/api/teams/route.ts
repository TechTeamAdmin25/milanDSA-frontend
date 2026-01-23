import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// --- TYPES ---
type Member = {
  code: string;
  name: string;
  position: string;
  image?: string;
};

type TeamBlock = {
  label: string;
  members: Member[];
};

type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
// We will check multiple possible locations for the files
const FILE_NAMES = ["club-team.json", "core-team.json"];

// 🔥 CRITICAL: Exact Mapping from JSON Key -> Folder Name
const KEY_TO_FOLDER: Record<string, string> = {
  // --- CLUBS ---
  MAD: "MOVIES AND DRAMATICS",
  SO: "SOCIAL",
  CA: "CREATIVE ARTS",
  G: "GAMING",
  LIT: "LITERARY",
  FA: "FASHION",
  FS: "FESTIVAL",
  AS: "ASTROPHILLIA", // User specific spelling
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
  TA: "TRANSPORT AND ACCODAMATION", // User specific spelling
  TG: "TECH AND GRAPHICS",
  CP: "CERTIFICATES AND PRIZE DISTRIBUTION",
  TR: "TREASURER",
  DS: "DISCIPLINE",
};

export async function GET() {
  const mergedResult: TeamJSON = {};
  const cwd = process.cwd();

  for (const fileName of FILE_NAMES) {
    try {
      // Try to find the file in common locations
      // 1. app/team/filename
      // 2. src/app/team/filename
      const possiblePaths = [
        path.join(cwd, "app", "team", fileName),
        path.join(cwd, "src", "app", "team", fileName),
      ];

      let fileContent = "";
      let foundPath = "";

      for (const p of possiblePaths) {
        try {
          await fs.access(p);
          fileContent = await fs.readFile(p, "utf-8");
          foundPath = p;
          break; // Found it!
        } catch {
          // Continue to next path
        }
      }

      if (!foundPath) {
        console.warn(
          `⚠️ Warning: Could not find ${fileName} in expected paths.`,
        );
        continue;
      }

      const data: TeamJSON = JSON.parse(fileContent);

      for (const [teamKey, teamData] of Object.entries(data)) {
        // 1. LOOKUP FOLDER NAME
        let folderName = KEY_TO_FOLDER[teamKey];

        if (!folderName) {
          folderName = teamKey; // Fallback
        }

        // 2. URL ENCODING
        const encodedFolder = encodeURIComponent(folderName);

        mergedResult[teamKey] = {
          label: teamData.label,
          members: teamData.members.map((member) => ({
            ...member,
            // 3. GENERATE FINAL PATH
            image: `/Teams/${encodedFolder}/${member.code}.jpg`,
          })),
        };
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error);
    }
  }

  return NextResponse.json(mergedResult);
}
