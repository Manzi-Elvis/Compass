import { z } from "zod";
import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TASK_TITLE_MAX_LENGTH,
} from "../constants/task.js";

export const taskStatusSchema = z.enum(TASK_STATUSES);
export const taskPrioritySchema = z.enum(TASK_PRIORITIES);

/**
 * What a client may send to create a task.
 * There is deliberately NO userId: ownership comes from the authenticated
 * session on the server, never from the request body.
 */
export const createTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(TASK_TITLE_MAX_LENGTH),
    description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
    priority: taskPrioritySchema.default("medium"),
    dueAt: z.string().datetime({ offset: true }).optional(),
  })
  .strict();

/** Every field optional, plus status changes. */
export const updateTaskSchema = createTaskSchema
  .partial()
  .extend({ status: taskStatusSchema.optional() });

/** What the API returns. Timestamps are ISO-8601 strings (stored as UTC). */
export const taskSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueAt: z.string().datetime({ offset: true }).nullable(),
  completedAt: z.string().datetime({ offset: true }).nullable(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskPriority = z.infer<typeof taskPrioritySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type Task = z.infer<typeof taskSchema>;
