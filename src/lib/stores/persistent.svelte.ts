import { z } from "zod";

export interface Migration {
  version: number;
  migrate: (data: unknown) => unknown;
}

export interface PersistentStoreOptions<T extends z.ZodObject<z.ZodRawShape>> {
  key: string;
  schema: T;
  defaultValue: z.infer<T>;
  version?: number;
  migrations?: Migration[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createPersistentStore<T extends z.ZodObject<z.ZodRawShape>>({
  key,
  schema,
  defaultValue,
  version = 0,
  migrations = [],
}: PersistentStoreOptions<T>) {
  function load(): z.infer<T> {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;

      const parsedEnvelope: unknown = JSON.parse(raw);
      const envelope = isRecord(parsedEnvelope) ? parsedEnvelope : {};
      let data: unknown = envelope.data ?? envelope;
      let currentVersion =
        typeof envelope.version === "number" ? envelope.version : 0;

      // 1. Run migrations if the stored version is older than current version
      if (currentVersion < version) {
        const sortedMigrations = [...migrations].sort(
          (a, b) => a.version - b.version,
        );
        for (const migration of sortedMigrations) {
          if (
            migration.version > currentVersion &&
            migration.version <= version
          ) {
            data = migration.migrate(data);
            currentVersion = migration.version;
          }
        }
      }

      // 2. Deep-merge defaults with loaded data to handle newly added fields gracefully
      const merged = {
        ...defaultValue,
        ...(isRecord(data) ? data : {}),
      };
      const result = schema.safeParse(merged);

      if (result.success) return result.data;

      console.warn(
        `[persistent-store] Validation failed for key "${key}":`,
        result.error.issues,
      );
      return defaultValue;
    } catch (e) {
      console.warn(`[persistent-store] Failed to load key "${key}":`, e);
      return defaultValue;
    }
  }

  function save(value: z.infer<T>) {
    try {
      const result = schema.safeParse(value);
      if (!result.success) {
        console.error(
          `[persistent-store] Invalid state for key "${key}":`,
          result.error.issues,
        );
        return;
      }
      const envelope = {
        version,
        data: result.data,
      };
      localStorage.setItem(key, JSON.stringify(envelope));
    } catch (e) {
      console.warn(`[persistent-store] Failed to save key "${key}":`, e);
    }
  }

  // Svelte 5 Deep Reactive State
  const state = $state<z.infer<T>>(load());

  // 3. Auto-track any deep mutation and write on Svelte's reactive microtask batching queue
  $effect.root(() => {
    $effect(() => {
      save(state);
    });
  });

  return {
    get value() {
      return state;
    },
    set value(next: z.infer<T>) {
      // Allow overriding the entire state object if needed
      Object.assign(state, next);
    },
    reset() {
      Object.assign(state, defaultValue);
    },
  };
}
