// ── Akhara at Dawn ──────────────────────────────────────────────
export const T = {
  bg: "#191410",
  card: "#271f18",
  cardHi: "#2f261d",
  line: "#3a2f24",
  ink: "#F3EBDD",
  muted: "#B6A896",
  faint: "#8a7c6a",
  success: "#8FB98A",
};

export const SOLAR = "#E68A34"; // Surya — strength, cardio, endurance
export const LUNAR = "#9DB8B0"; // Chandra — flexibility, recovery, internal

export const DISPLAY = {
  fontFamily: "'Oswald', sans-serif",
  textTransform: "uppercase",
  letterSpacing: 2,
};

export const MONO = { fontFamily: "'IBM Plex Mono', monospace" };

export const DEVA = { fontFamily: "'Tiro Devanagari Sanskrit', serif" };

export const card = (highlight) => ({
  background: highlight ? T.cardHi : T.card,
  border: `1px solid ${T.line}`,
  borderRadius: 14,
});
