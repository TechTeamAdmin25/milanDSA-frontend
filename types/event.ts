export interface MilanEvent {
  id: number;
  event: string;
  event_name: string;
  event_description: string;
  for_srm_student: "YES" | "NO";
}

export type EventCategoryKey =
  | "movies_and_dramatics"
  | "creative_arts"
  | "music"
  | "dance"
  | "fashion"
  | "astrophilia"
  | "literary"
  | "self_defense"
  | "quiz"
  | "gaming";

export type EventsData = Record<EventCategoryKey, MilanEvent[]>;
