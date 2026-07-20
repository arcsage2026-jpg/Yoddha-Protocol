import React, { useState } from "react";
import { T, MONO, DISPLAY, card } from "../theme";
import { RestTimer } from "./Timers";

function Video({ id, title }) {
  const [show, setShow] = useState(false);
  if (!id) return null;
  return show ? (
    <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden" }}>
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${id}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <button onClick={() => setShow(true)} style={{
      width: "100%", padding: "12px 0", borderRadius: 12, cursor: "pointer",
      background: "transparent", border: `1px dashed ${T.line}`, color: T.muted, fontSize: 13,
    }}>▶ Watch form</button>
  );
}

export default function ExerciseSheet({ block, accent, phase, onLog, logs, onClose }) {
  const [reps, setReps] = useState(1);
  const [note, setNote] = useState("");

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "#000a", zIndex: 50, display: "flex", alignItems: "flex-end" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxHeight: "88vh", overflowY: "auto",
          background: T.bg, borderTop: `1px solid ${T.line}`,
          borderRadius: "20px 20px 0 0", padding: "20px 18px 28px",
          animation: "sheetUp .22s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 4 }}>
          <div>
            <div style={{ ...DISPLAY, fontSize: 18, color: T.ink }}>{block.name}</div>
            <div style={{ fontSize: 12, color: T.faint }}>{block.sub}</div>
          </div>
          <button onClick={onClose} style={{
            background: T.card, border: `1px solid ${T.line}`, color: T.muted,
            borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 15,
          }}>✕</button>
        </div>

        <div style={{ ...MONO, fontSize: 14, color: accent, margin: "10px 0 14px" }}>
          This phase · {block.vol[phase]}
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <Video id={block.videoId} title={block.name} />

          {block.cues?.length > 0 && (
            <div style={{ display: "grid", gap: 6 }}>
              {block.cues.map((c, i) => (
                <div key={i} style={{
                  fontSize: 13, color: T.muted, lineHeight: 1.5,
                  borderLeft: `2px solid ${accent}`, paddingLeft: 10,
                }}>{c}</div>
              ))}
            </div>
          )}

          <div style={{ ...card(true), padding: 14 }}>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: T.faint, marginBottom: 10 }}>
              Log a set
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 14, color: T.muted }}>Reps / rounds</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setReps(Math.max(1, reps - 1))} style={btnStep}>−</button>
                <span style={{ ...MONO, fontSize: 18, color: T.ink, minWidth: 26, textAlign: "center" }}>{reps}</span>
                <button onClick={() => setReps(reps + 1)} style={btnStep}>+</button>
              </div>
            </div>
            <input
              value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)"
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 13,
                background: T.bg, border: `1px solid ${T.line}`, color: T.ink, outline: "none",
              }}
            />
            <button
              onClick={() => { onLog(reps, note); setNote(""); }}
              style={{
                marginTop: 10, width: "100%", padding: "12px 0", borderRadius: 12, cursor: "pointer",
                background: accent, border: "none", color: T.bg, fontSize: 14, fontWeight: 700,
              }}
            >Log set</button>
            {logs.length > 0 && (
              <div style={{ marginTop: 10, display: "grid", gap: 4 }}>
                {logs.map((l, i) => (
                  <div key={i} style={{ ...MONO, fontSize: 11.5, color: T.faint }}>
                    set {i + 1} · {l.reps} {l.note ? `· ${l.note}` : ""}
                  </div>
                ))}
              </div>
            )}
          </div>

          <RestTimer accent={accent} />
        </div>
      </div>
    </div>
  );
}

const btnStep = {
  width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18,
  background: "transparent", border: `1px solid ${T.line}`, color: T.ink,
};
