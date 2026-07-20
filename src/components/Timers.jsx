import React, { useEffect, useRef, useState } from "react";
import { T, MONO, DISPLAY, SOLAR, LUNAR, card } from "../theme";
import BreathRing from "./BreathRing";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 528; // gentle bell-ish tone
    o.type = "sine";
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 1.7);
  } catch { /* no audio */ }
  if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
}

export function RestTimer({ accent = SOLAR }) {
  const [dur, setDur] = useState(60);
  const [left, setLeft] = useState(60);
  const [run, setRun] = useState(false);
  const iv = useRef();

  useEffect(() => {
    if (!run) return;
    iv.current = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) { clearInterval(iv.current); setRun(false); chime(); return 0; }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(iv.current);
  }, [run]);

  const pick = (d) => { setDur(d); setLeft(d); setRun(false); };

  return (
    <div style={{ ...card(), padding: 16 }}>
      <div style={{ ...MONO, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: T.faint }}>Rest timer</div>
      <div style={{ ...MONO, fontSize: 44, fontWeight: 600, textAlign: "center", color: left === 0 ? accent : T.ink, margin: "8px 0" }}>
        {fmt(left)}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[60, 90, 120].map((d) => (
          <button key={d} onClick={() => pick(d)} style={{
            ...MONO, fontSize: 12, padding: "8px 14px", borderRadius: 10, cursor: "pointer",
            background: dur === d ? `${accent}22` : "transparent",
            border: `1px solid ${dur === d ? accent : T.line}`,
            color: dur === d ? accent : T.muted,
          }}>{d}s</button>
        ))}
        <button onClick={() => (run ? setRun(false) : (left === 0 && setLeft(dur), setRun(true)))} style={{
          fontSize: 13, padding: "8px 16px", borderRadius: 10, cursor: "pointer",
          background: run ? "transparent" : accent, border: `1px solid ${accent}`,
          color: run ? accent : T.bg, fontWeight: 600,
        }}>{run ? "Pause" : "Start"}</button>
      </div>
    </div>
  );
}

export function MeditationTimer() {
  const [mins, setMins] = useState(10);
  const [left, setLeft] = useState(null); // null = idle
  const iv = useRef();

  useEffect(() => {
    if (left === null) return;
    if (left === 0) { chime(); return; }
    iv.current = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(iv.current);
  }, [left]);

  const running = left !== null && left > 0;

  return (
    <div style={{ ...card(), padding: 20, textAlign: "center" }}>
      <div style={{ ...DISPLAY, fontSize: 13, color: LUNAR }}>Beej Mantra · Dhyana</div>
      <div style={{ fontSize: 12, color: T.faint, marginTop: 2, marginBottom: 16 }}>
        4s in · 4s hold · 6s out — let the ring breathe you
      </div>
      <BreathRing running={running} />
      <div style={{ ...MONO, fontSize: 20, color: running ? T.ink : T.faint, margin: "12px 0" }}>
        {left === null ? `${mins}:00` : fmt(left)}
      </div>
      {left === 0 && <div style={{ ...MONO, fontSize: 12, color: LUNAR, marginBottom: 10 }}>session complete</div>}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[5, 10, 15, 20].map((m) => (
          <button key={m} onClick={() => { setMins(m); setLeft(null); }} style={{
            ...MONO, fontSize: 12, padding: "8px 12px", borderRadius: 10, cursor: "pointer",
            background: mins === m ? `${LUNAR}22` : "transparent",
            border: `1px solid ${mins === m ? LUNAR : T.line}`,
            color: mins === m ? LUNAR : T.muted,
          }}>{m}m</button>
        ))}
      </div>
      <button onClick={() => setLeft(running ? null : mins * 60)} style={{
        marginTop: 12, width: "100%", padding: "12px 0", borderRadius: 12, cursor: "pointer",
        background: running ? "transparent" : LUNAR, border: `1px solid ${LUNAR}`,
        color: running ? LUNAR : T.bg, fontSize: 14, fontWeight: 600,
      }}>{running ? "End early" : "Begin"}</button>
    </div>
  );
}
