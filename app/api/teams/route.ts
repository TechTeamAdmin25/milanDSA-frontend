import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// --- TYPES ---
type Member = {
  code: string;
  name: string;
  position: string;
};

type TeamBlock = {
  label: string;
  members: Member[];
};

type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
const TEAM_JSON_PATHS = ["app/team/club-team.json", "app/team/core-team.json"];

// 🔥 CRITICAL: Exact Mapping from JSON Key -> Folder Name
// verified against your screenshot "Screenshot 2026-01-23 084309.png"
const KEY_TO_FOLDER: Record<string, string> = {
  // --- CLUBS ---
  MAD: "MOVIES AND DRAMATICS",
  SO: "SOCIAL",
  CA: "CREATIVE ARTS",
  G: "GAMING",
  LIT: "LITERARY",
  FA: "FASHION",
  FS: "FESTIVAL",
  AS: "ASTROPHILLIA", // Matches folder spelling
  DA: "DANCE",
  MU: "MUSIC",
  WE: "WOMEN EMPOWERMENT",
  Q: "QUIZ",
  RO: "ROTRACT", // Matches folder spelling
  SD: "SELF DEFENCE",

  // --- CORE ---
  ORM: "OPERATIONS & RESOURCE MANAGEMENT", // Special char & handled below
  P: "PUBLICITY",
  PR: "PUBLIC RELATIONS",
  M: "MEDIA",
  E: "EMCEE",
  H: "HOSPITALITY",
  S: "SPONSORSHIP",
  C: "CONTENT",
  TA: "TRANSPORT AND ACCODAMATION", // Matches folder spelling
  TG: "TECH AND GRAPHICS", // Fixed from "TECH TEAM AND GD"
  CP: "CERTIFICATES AND PRIZE DISTRIBUTION",
  TR: "TREASURER",
};

export async function GET() {
  const mergedResult: TeamJSON = {};

  for (const jsonPath of TEAM_JSON_PATHS) {
    try {
      const absolutePath = path.join(process.cwd(), jsonPath);
      // Check if file exists before reading
      try {
        await fs.access(absolutePath);
      } catch {
        console.warn(`⚠️ Warning: JSON file not found at ${absolutePath}`);
        continue;
      }

      const raw = await fs.readFile(absolutePath, "utf-8");
      const data: TeamJSON = JSON.parse(raw);

      for (const [teamKey, teamData] of Object.entries(data)) {
        // 1. LOOKUP FOLDER NAME
        // If key is "H", this returns "HOSPITALITY"
        let folderName = KEY_TO_FOLDER[teamKey];

        // Debugging: If mapping is missing, log it!
        if (!folderName) {
          console.warn(
            `⚠️ Missing Folder Mapping for key: "${teamKey}". Using key as folder name.`,
          );
          folderName = teamKey;
        }

        // 2. URL ENCODING
        // Handles spaces and '&' symbols automatically
        // "OPERATIONS & RESOURCE MANAGEMENT" -> "OPERATIONS%20%26%20RESOURCE%20MANAGEMENT"
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
      console.error(`❌ Error processing ${jsonPath}:`, error);
    }
  }

  return NextResponse.json(mergedResult);
}
