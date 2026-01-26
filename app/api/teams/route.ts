import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// --- TYPES ---
type Member = {
  code: string;
  name: string;
  position: string;
  image: string; // Image is now required, because we filter out those without it
};

type TeamBlock = {
  label: string;
  members: Member[];
};

type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
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
  const cwd = process.cwd();

  // Define public directory path
  const publicDir = path.join(cwd, "public");

  for (const fileName of FILE_NAMES) {
    try {
      // 1. Locate JSON File
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
          break;
        } catch {
          continue;
        }
      }

      if (!foundPath) {
        console.warn(`⚠️ Warning: Could not find ${fileName}`);
        continue;
      }

      const data: TeamJSON = JSON.parse(fileContent);

      for (const [teamKey, teamData] of Object.entries(data)) {
        // 2. Resolve Folder Name
        let folderName = KEY_TO_FOLDER[teamKey];
        if (!folderName) folderName = teamKey;

        // 3. Process Members & FILTER OUT missing images
        // We map to (Member | null), then filter out the nulls
        const validMembersPromise = teamData.members.map(async (member) => {
          const imageFilename = `${member.code}.jpg`;

          // Construct absolute path to check existence
          const fsPath = path.join(
            publicDir,
            "Teams",
            folderName,
            imageFilename,
          );

          try {
            // Check if file exists
            await fs.access(fsPath);

            // If we are here, the file exists!
            const encodedFolder = encodeURIComponent(folderName);
            return {
              ...member,
              image: `/Teams/${encodedFolder}/${imageFilename}`,
            };
          } catch (err) {
            // File does not exist.
            // Return null so we can filter this person out later.
            return null;
          }
        });

        // Wait for all checks to finish
        const results = await Promise.all(validMembersPromise);

        // Filter: Keep only the entries that are NOT null
        const validMembers = results.filter((m): m is Member => m !== null);

        // Only add this team if it has at least one valid member (optional)
        if (validMembers.length > 0) {
          mergedResult[teamKey] = {
            label: teamData.label,
            members: validMembers,
          };
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error);
    }
  }

  return NextResponse.json(mergedResult);
}
