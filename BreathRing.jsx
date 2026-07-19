import React, { useEffect, useRef, useState } from "react";
import { T, MONO, LUNAR } from "../theme";

// 4s in · 4s hold · 6s out — a 14s cycle rendered as a growing/held/shrinking ring.
const CYCLE = [
  { label: "inhale", secs: 4 },
  { label: "hold", secs: 4 },
  { label: "exhale", secs: 6 },
];
const TOTAL = 14;

export default function BreathRing({ running, size = 200, accent = LUNAR }) {
  const [t, setT] = useState(0);
  const raf = useRef();
  const t0 = useRef();

  useEffect(() => {
    if (!running) { cancelAnimationFrame(raf.current); setT(0); return; }
    t0.current = performance.now();
    const tick = (now) => {
      setT(((now - t0.current) / 1000) % TOTAL);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  let phase = CYCLE[0], into = t;
  if (t >= 4 && t < 8) { phase = CYCLE[1]; into = t - 4; }
  else if (t >= 8) { phase = CYCLE[2]; into = t - 8; }

  // scale: grows on inhale, holds, shrinks on exhale
  const scale =
    phase.label === "inhale" ? 0.55 + 0.45 * (into / 4)
    : phase.label === "hold" ? 1
    : 1 - 0.45 * (into / 6);

  const r = (size / 2) - 10;
  return (
    <div style={{ display: "grid", placeItems: "center", position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.line} strokeWidth="1.5" />
        <circle
          cx={size / 2} cy={size / 2} r={r * scale}
          fill={`${accent}14`} stroke={accent} strokeWidth="2"
          style={{ transition: running ? "none" : "r .4s" }}
        />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ ...MONO, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: running ? accent : T.faint }}>
          {running ? phase.label : "ready"}
        </div>
        {running && (
          <div style={{ ...MONO, fontSize: 22, color: T.ink, marginTop: 4 }}>
            {Math.ceil(phase.secs - into)}
          </div>
        )}
      </div>
    </div>
  );
}
