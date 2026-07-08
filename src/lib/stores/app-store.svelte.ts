import { z } from "zod";
import { createPersistentStore } from "./persistent.svelte";

/** Schema for the application's persisted state */
export const AppStateSchema = z.object({
  pineappleCount: z.number().int().min(0).default(0),
});

export type AppState = z.infer<typeof AppStateSchema>;

/** Persistent store for the application state */
export const appStore = createPersistentStore(
  "tools-4-games:app-state",
  AppStateSchema,
  AppStateSchema.parse({}),
);
