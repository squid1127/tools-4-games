import { z } from "zod";
import { createPersistentStore } from "./persistent.svelte";

export const AppStateSchema = z.object({
  pineappleCount: z.number().int().min(0).default(0),
  currentPage: z.string().default('home')
});

export type AppState = z.infer<typeof AppStateSchema>;

export const appStore = createPersistentStore({
  key: "tools-4-games:app-state",
  schema: AppStateSchema,
  defaultValue: AppStateSchema.parse({}),
  version: 1,
  migrations: [

  ],
});