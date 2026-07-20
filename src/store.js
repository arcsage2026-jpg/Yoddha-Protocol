// ── Local-first store ───────────────────────────────────────────
// Everything lives on-device. No login, no server, no lockout.
// Shape: { startDate, logs: {"w{week}:{dayId}:{blockId}": [{reps, note, at}]},
//          done: {"w{week}:{dayId}": true}, notes: [] }

const KEY = "yoddha.v1";

const empty = { startDate: null, logs: {}, done: {} };

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : { ...empty };
  } catch {
    return { ...empty };
  }
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* full/blocked */ }
}

export function exportJSON(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "yoddha-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

// current program week (1-12, clamped) + day id from a start date
export function whereAmI(startDate) {
  if (!startDate) return { week: 1, dayIndex: new Date().getDay() };
  const start = new Date(startDate + "T00:00:00");
  const now = new Date();
  const diffDays = Math.floor((now - start) / 86400000);
  const week = Math.min(12, Math.max(1, Math.floor(diffDays / 7) + 1));
  return { week, dayIndex: now.getDay() };
}

export const logKey = (week, dayId, blockId) => `w${week}:${dayId}:${blockId}`;
export const dayKey = (week, dayId) => `w${week}:${dayId}`;
