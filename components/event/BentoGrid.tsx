import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

/* ----------------------------------
   Bento Grid Wrapper
----------------------------------- */

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 auto-rows-[18rem] gap-6",
        className,
      )}>
      {children}
    </div>
  );
}

/* ----------------------------------
   Bento Card
----------------------------------- */

interface BentoCardProps {
  name: string;
  description: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
  className?: string;
  background?: ReactNode;
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  Icon,
  className,
  background,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition hover:shadow-xl",
        className,
      )}>
      {/* Background Decoration */}
      {background}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <Icon className="h-8 w-8 text-neutral-900 mb-4" />
          <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
          <p className="mt-2 text-sm text-neutral-600">{description}</p>
        </div>

        <a
          href={href}
          className="mt-6 inline-flex items-center text-sm font-medium text-purple-600 group-hover:underline">
          {cta} →
        </a>
      </div>
    </div>
  );
}
