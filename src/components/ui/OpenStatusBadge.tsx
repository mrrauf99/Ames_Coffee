"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/openStatus";

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

// getOpenStatus() builds a fresh object every call; useSyncExternalStore needs
// a stable reference when nothing changed, or it re-renders forever.
let cachedSnapshot: OpenStatus | null = null;
let cachedKey: string | null = null;

function getSnapshot(): OpenStatus {
  const next = getOpenStatus();
  const key = `${next.isOpen}|${next.label}`;
  if (key !== cachedKey || !cachedSnapshot) {
    cachedKey = key;
    cachedSnapshot = next;
  }
  return cachedSnapshot;
}

// Status depends on the visitor's clock, unknown during SSR; return null there
// and on first client render so hydration matches, then swap in the live value.
function getServerSnapshot(): OpenStatus | null {
  return null;
}

export function OpenStatusBadge({ className = "inline-flex" }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!status) {
    return (
      <span className={`items-center gap-2 text-text-secondary ${className}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-text-secondary/40" />
        Checking hours…
      </span>
    );
  }

  return (
    <span
      className={`items-center gap-2 font-medium ${
        status.isOpen ? "text-sage" : "text-text-secondary"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          status.isOpen ? "status-dot-live bg-sage" : "bg-text-secondary/50"
        }`}
      />
      {status.label}
    </span>
  );
}
