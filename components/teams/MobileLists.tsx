"use client";

import ExpandableItem from "./ExpandableItem";
import { ImageData } from "@/components/ui/img-sphere";

interface Props {
  isMobile: boolean;
  expandedItems: Set<string>;
  setExpandedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  coreRoles: string[];
  clubs: string[];
  getRandomImage: (id: string) => ImageData;
  setSelectedConvenor: (img: ImageData | null) => void;
  setSelectedSphereImage: (img: ImageData | null) => void;
}

export default function MobileLists(props: Props) {
  if (!props.isMobile) return null;

  return (
    <div className="absolute right-4 top-32 w-1/2 md:hidden space-y-6">
      {/* CORE TEAM */}
      <div>
        <h3 className="font-semibold mb-2">Core Team</h3>
        {props.coreRoles.slice(0, 5).map((role) => (
          <ExpandableItem
            key={role}
            item={role}
            category="core"
            {...props}
            disableHover
          />
        ))}
      </div>

      {/* CLUBS */}
      <div>
        <h3 className="font-semibold mb-2">Clubs</h3>
        {props.clubs.map((club) => (
          <ExpandableItem
            key={club}
            item={club}
            category="club"
            {...props}
            disableHover
          />
        ))}
      </div>
    </div>
  );
}
