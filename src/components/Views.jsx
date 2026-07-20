import React, { useState } from "react";
import { T, MONO, DISPLAY, DEVA, SOLAR, LUNAR, card } from "../theme";
import { DAYS, PHASES, weekToPhase, isDeload } from "../data/program";
import { logKey, dayKey } from "../store";
import ExerciseSheet from "./ExerciseSheet";
import { MeditationTimer } from "./Timers";

const dayAccent = (d) => (d.kind === "lunar" ? LUNAR : d.kind === "rest" ? T.faint : SOLAR);

// ── TODAY ───────────────────────────────────────────────────────
export function TodayView({ state, setState, week, dayIndex, goYijin }) {
  const day = DAYS[dayIndex];
  const phase = weekToPhase(week);
  const accent = dayAccent(day);
  const [openBlock, setOpenBlock] = useState(null);
  const dKey = dayKey(week, day.id);
  const complete = !!state.done[dKey];
  const deload = isDeload(week);

  const logsFor = (b) => state.logs[logKey(week, day.id, b.id)] || [];
  const blockDone = (b) => logsFor(b).length > 0;
  const allDone = day.blocks.length > 0 && day.blocks.every(blockDone);

  const addLog = (b, reps, note) => {
    const k = logKey(week, day.id, b.id);
    setState((s) => ({ ...s, logs: { ...s.logs, [k]: [...(s.logs[k] || []), { reps, note, at: Date.now() }] } }));
  };
  const markComplete = () =>
    setState((s) => ({ ...s, done: { ...s.done, [dKey]: true } }));

  return (
    <div style={{ display: "grid", gap: 14, animation: "fadeUp .25s ease" }}>
      <div style={{ ...card(true), padding: "16px", borderLeft: `3px solid ${accent}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: accent }}>
              Week {week} · {PHASES[phase].name}{deload ? " · Deload −40%" : ""}
            </div>
            <div style={{ ...DISPLAY, fontSize: 20, color: T.ink, marginTop: 4 }}>{day.name}</div>
            <div style={{ fontSize: 11.5, color: T.faint, marginTop: 2 }}>{day.tags.join(" · ")}</div>
          </div>
          <div style={{ ...DEVA, fontSize: 30, color: `${accent}88`, lineHeight: 1 }}>{day.deva}</div>
        </div>
      </div>

      {day.kind === "rest" ? (
        <>
          <div style={{ ...card(), padding: 18, fontSize: 13.5, color: T.muted, lineHeight: 1.6 }}>{day.note}</div>
          <MeditationTimer />
        </>
      ) : (
        <>
          <div style={{ display: "grid", gap: 8 }}>
            {day.blocks.map((b, i) => {
              const done = blockDone(b);
              return (
                <button
                  key={b.id}
                  onClick={() => (b.yijin ? goYijin() : setOpenBlock(b))}
                  style={{
                    ...card(), width: "100%", textAlign: "left", cursor: "pointer",
                    padding: "13px 14px", display: "flex", alignItems: "center", gap: 12,
                    borderColor: done ? `${T.success}66` : T.line,
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                    border: `1.5px solid ${done ? T.success : T.line}`,
                    background: done ? `${T.success}22` : "transparent",
                    display: "grid", placeItems: "center", fontSize: 12, color: T.success,
                  }}>{done ? "✓" : ""}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: T.faint }}>{b.sub}</div>
                  </div>
                  <div style={{ ...MONO, fontSize: 11.5, color: accent, textAlign: "right", maxWidth: 110 }}>
                    {b.vol[phase]}
                  </div>
                </button>
              );
            })}
          </div>

          {allDone && !complete && (
            <button onClick={markComplete} style={{
              padding: "14px 0", borderRadius: 14, cursor: "pointer", fontSize: 15, fontWeight: 700,
              background: accent, border: "none", color: T.bg,
              animation: "glowPulse 1.6s ease infinite",
            }}>Seal today's session</button>
          )}
          {complete && (
            <div style={{
              ...card(), padding: 14, textAlign: "center", borderColor: `${T.success}66`,
              color: T.success, fontSize: 14, fontWeight: 600,
            }}>Session sealed · {day.deva}</div>
          )}

          <MeditationTimer />
        </>
      )}

      {openBlock && (
        <ExerciseSheet
          block={openBlock} accent={accent} phase={phase}
          logs={logsFor(openBlock)}
          onLog={(r, n) => addLog(openBlock, r, n)}
          onClose={() => setOpenBlock(null)}
        />
      )}
    </div>
  );
}

// ── WEEK ────────────────────────────────────────────────────────
export function WeekView({ state, week, dayIndex, onPickDay }) {
  const phase = weekToPhase(week);
  return (
    <div style={{ display: "grid", gap: 8, animation: "fadeUp .25s ease" }}>
      {isDeload(week) && (
        <div style={{ ...card(), padding: "10px 14px", fontSize: 12.5, color: LUNAR, borderColor: `${LUNAR}55` }}>
          Deload week — cut volume ~40%. Recovery is training.
        </div>
      )}
      {[1, 2, 3, 4, 5, 6, 0].map((di) => {
        const d = DAYS[di];
        const accent = dayAccent(d);
        const done = !!state.done[dayKey(week, d.id)];
        const today = di === dayIndex;
        return (
          <button key={d.id} onClick={() => onPickDay(di)} style={{
            ...card(today), width: "100%", textAlign: "left", cursor: "pointer",
            padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
            borderColor: today ? accent : T.line,
          }}>
            <div style={{ ...DEVA, fontSize: 20, color: `${accent}99`, minWidth: 40 }}>{d.deva}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>{d.name}</div>
              <div style={{ fontSize: 11, color: T.faint }}>
                {d.kind === "rest" ? "Rest" : d.blocks.length + " blocks"} · {d.tags.join(" · ")}
              </div>
            </div>
            {done && <span style={{ color: T.success, fontSize: 14 }}>✓</span>}
            {today && <span style={{ ...MONO, fontSize: 9, letterSpacing: 1.5, color: accent }}>TODAY</span>}
          </button>
        );
      })}
    </div>
  );
}

// ── PROGRAM ─────────────────────────────────────────────────────
export function ProgramView({ week }) {
  const phaseNow = weekToPhase(week);
  return (
    <div style={{ display: "grid", gap: 10, animation: "fadeUp .25s ease" }}>
      {PHASES.map((p) => (
        <div key={p.id} style={{
          ...card(p.id === phaseNow), padding: 16,
          borderColor: p.id === phaseNow ? SOLAR : T.line,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ ...DISPLAY, fontSize: 16, color: p.id === phaseNow ? SOLAR : T.ink }}>
              {p.name}
            </div>
            <div style={{ ...MONO, fontSize: 11, color: T.faint }}>weeks {p.weeks}</div>
          </div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 4 }}>{p.sub}</div>
        </div>
      ))}
      <div style={{ ...card(), padding: 16, fontSize: 12.5, color: T.muted, lineHeight: 1.6 }}>
        Six training days orbit one rest day. <span style={{ color: SOLAR }}>Solar days</span> build —
        strength, stamina, endurance. <span style={{ color: LUNAR }}>Lunar days</span> restore —
        Yi Jin Jing, Tai Chi, Chandra Namaskar, breath. Weeks 4 and 8 deload by 40%.
        The arc closes at week 12 with full expression of every line.
      </div>
    </div>
  );
}

// ── PROGRESS ────────────────────────────────────────────────────
export function ProgressView({ state, week }) {
  const totalSessions = 12 * 6;
  const doneCount = Object.keys(state.done).length;
  const phase = weekToPhase(week);

  // streak: consecutive completed sessions counting back from most recent
  const perPhase = [0, 0, 0];
  Object.keys(state.done).forEach((k) => {
    const w = parseInt(k.slice(1), 10);
    if (!isNaN(w)) perPhase[weekToPhase(w)]++;
  });

  const setVolume = Object.values(state.logs).reduce((a, arr) => a + arr.length, 0);

  return (
    <div style={{ display: "grid", gap: 12, animation: "fadeUp .25s ease" }}>
      <div style={{ ...card(true), padding: 18 }}>
        <div style={{ ...MONO, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: T.faint }}>
          The Arc
        </div>
        <div style={{ display: "flex", gap: 3, margin: "12px 0 8px" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{
              flex: 1, height: 6, borderRadius: 3,
              background: i + 1 < week ? SOLAR : i + 1 === week ? `${SOLAR}88` : T.line,
            }} />
          ))}
        </div>
        <div style={{ ...MONO, fontSize: 12, color: T.muted }}>
          Week {week} of 12 · {PHASES[phase].name}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Stat label="Sessions sealed" value={`${doneCount}/${totalSessions}`} />
        <Stat label="Sets logged" value={setVolume} />
        <Stat label="Foundation" value={`${perPhase[0]}/24`} accent={SOLAR} />
        <Stat label="Build" value={`${perPhase[1]}/24`} accent={SOLAR} />
        <Stat label="Advanced" value={`${perPhase[2]}/24`} accent={SOLAR} />
        <Stat label="Phase now" value={PHASES[phase].name} accent={LUNAR} />
      </div>
    </div>
  );
}

function Stat({ label, value, accent = null }) {
  return (
    <div style={{ ...card(), padding: 14 }}>
      <div style={{ ...MONO, fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: T.faint }}>{label}</div>
      <div style={{ ...MONO, fontSize: 20, fontWeight: 600, color: accent || T.ink, marginTop: 6 }}>{value}</div>
    </div>
  );
}
