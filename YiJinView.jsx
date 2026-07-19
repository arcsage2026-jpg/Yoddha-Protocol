import React, { useState } from "react";
import { T, MONO, DISPLAY, LUNAR, card } from "../theme";
import { YIJINJING, YIJINJING_SESSION as S } from "../data/yijinjing";

export default function YiJinView({ phase }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ display: "grid", gap: 14, animation: "fadeUp .25s ease" }}>
      <div style={{ ...card(true), border: `1px solid ${LUNAR}55`, padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
          <div style={{ ...MONO, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: LUNAR }}>
            Lunar · Internal
          </div>
          <div style={{ ...MONO, fontSize: 13, fontWeight: 700, color: T.ink }}>
            ~{S.minutes[phase]} min · {S.breaths[phase]} breaths/posture
          </div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginTop: 6 }}>{S.label}</div>
        <div style={{ fontSize: 12, color: T.faint, marginTop: 2 }}>{S.subtitle}</div>
        <div style={{ fontSize: 12.5, color: T.muted, marginTop: 10, lineHeight: 1.5 }}>
          <strong style={{ color: LUNAR }}>This phase — </strong>{S.focus[phase]}{" "}
          Three Plates to a <em>{S.legDepth[phase]}</em>. {S.rounds[phase]}.
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {YIJINJING.map((m) => (
          <div key={m.id} style={{ ...card(), overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === m.id ? null : m.id)}
              style={{
                width: "100%", textAlign: "left", background: "transparent", border: "none",
                cursor: "pointer", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <div style={{ ...MONO, fontSize: 14, fontWeight: 700, color: LUNAR, minWidth: 26 }}>
                {String(m.id).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: T.ink, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: T.faint }}>{m.zh} · {m.target}</div>
              </div>
              <div style={{
                color: T.faint, fontSize: 12,
                transform: open === m.id ? "rotate(90deg)" : "none", transition: "transform .15s",
              }}>›</div>
            </button>

            {open === m.id && (
              <div style={{ padding: "0 14px 14px 52px", display: "grid", gap: 8 }}>
                <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.55 }}>{m.action}</div>
                <div style={{
                  fontSize: 12, color: T.ink, lineHeight: 1.5,
                  borderLeft: `2px solid ${LUNAR}`, paddingLeft: 10,
                }}>{m.cue}</div>
                {m.videoId && (
                  <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 10, overflow: "hidden", marginTop: 4 }}>
                    <iframe
                      title={m.name}
                      src={`https://www.youtube.com/embed/${m.videoId}`}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: T.faint, lineHeight: 1.5 }}>
        Move slowly, breathe through the nose, ease off any posture that pinches. Not medical advice.
      </div>
    </div>
  );
}
