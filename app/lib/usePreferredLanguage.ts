"use client";

import { useSyncExternalStore } from "react";
import {
  getServerLanguageSnapshot,
  getStoredLanguageSnapshot,
  subscribeLanguage,
  type Language,
} from "./language";

/** Preferred language from localStorage, safe for SSR hydration. */
export function usePreferredLanguage(): Language {
  return useSyncExternalStore(
    subscribeLanguage,
    getStoredLanguageSnapshot,
    getServerLanguageSnapshot,
  );
}
