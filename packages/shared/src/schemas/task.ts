import { z } from "zod";
import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TASK_TITLE_MAX_LENGTH,
} from "../constants/task.js";

export const taskStatusSchema = z.enum(TASK_STATUSES);
export const taskPrioritySchema = z.enum(TASK_PRIORITIES);

const isoDateTime = z.iso.datetime({ offset: true });

/** Field rules shared by create and update. No defaults live here. */
const editableFields = {
  title: z.string().trim().min(1).max(TASK_TITLE_MAX_LENGTH),
  description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
  priority: taskPrioritySchema,
  dueAt: isoDateTime.optional(),
};

/**
 * What a client may send to create a task.
 * There is deliberately NO userId: ownership comes from the authenticated
 * session on the server, never from the request body.
 */
export const createTaskSchema = z.strictObject({
  ...editableFields,
  priority: taskPrioritySchema.default("medium"),
});

/** Partial update: only fields the client actually sends are present. */
export const updateTaskSchema = z
  .strictObject({
    ...editableFields,
    status: taskStatusSchema,
  })
  .partial();

/** What the API returns. Timestamps are ISO-8601 strings (stored as UTC). */
export const taskSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueAt: isoDateTime.nullable(),
  completedAt: isoDateTime.nullable(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime,
});

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskPriority = z.infer<typeof taskPrioritySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type Task = z.infer<typeof taskSchema>;
