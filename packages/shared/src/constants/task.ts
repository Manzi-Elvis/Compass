export const TASK_STATUSES = [
  "not_started",
  "in_progress",
  "completed",
  "archived",
] as const;

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const TASK_TITLE_MAX_LENGTH = 200;
export const TASK_DESCRIPTION_MAX_LENGTH = 5000;
