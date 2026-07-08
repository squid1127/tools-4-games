import { z } from "zod";

/**
 * Creates a persistent Svelte 5 rune-based store backed by localStorage.
 * The value is validated against a Zod schema on read and write.
 *
 * @param key - The localStorage key
 * @param schema - A Zod schema to validate the stored value
 * @param defaultValue - The default value if nothing is stored or validation fails
 */
export function createPersistentStore<T extends z.ZodTypeAny>(
  key: string,
  schema: T,
  defaultValue: z.infer<T>,
) {
  function load(): z.infer<T> {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      const parsed = JSON.parse(raw);
      const result = schema.safeParse(parsed);
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
          `[persistent-store] Cannot save invalid value for key "${key}":`,
          result.error.issues,
        );
        return;
      }
      localStorage.setItem(key, JSON.stringify(result.data));
    } catch (e) {
      console.warn(`[persistent-store] Failed to save key "${key}":`, e);
    }
  }

  let _value = $state<z.infer<T>>(load());

  return {
    get value() {
      return _value;
    },
    set value(next: z.infer<T>) {
      _value = next;
      save(next);
    },
    /** Reset the store to its default value and clear localStorage. */
    reset() {
      _value = defaultValue;
      localStorage.removeItem(key);
    },
  };
}
