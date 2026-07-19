import React, { useEffect, useMemo, useState } from "react";
import { T, MONO, DISPLAY, DEVA, SOLAR, LUNAR, card } from "./theme";
import { load, save, whereAmI, exportJSON } from "./store";
import { weekToPhase, DAYS } from "./data/program";
import { TodayView, WeekView, ProgramView, ProgressView } from "./components/Views";
import YiJinView from "./components/YiJinView";

const TABS = [
  { id: "today", label: "Today" },
  { id: "week", label: "Week" },
  { id: "yijin", label: "Yi Jin", lunar: true },
  { id: "program", label: "Program" },
  { id: "progress", label: "Progress" },
];

export default function App() {
  const [state, setState] = useState(load);
  const [tab, setTab] = useState("today");
  const [pickedDay, setPickedDay] = useState(null); // override from Week view

  useEffect(() => save(state), [state]);

  const { week, dayIndex } = useMemo(() => whereAmI(state.startDate), [state.startDate]);
  const activeDay = pickedDay ?? dayIndex;
  const phase = weekToPhase(week);

  // ── first run: set the start date ────────────────────────────
  if (!state.startDate) {
    return <StartScreen onStart={(d) => setState((s) => ({ ...s, startDate: d }))} />;
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "18px 16px 90px" }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ ...DISPLAY, fontSize: 24, fontWeight: 600, color: T.ink }}>Yoddha</span>
            <span style={{ ...DEVA, fontSize: 18, color: SOLAR }}>योद्धा</span>
          </div>
          <div style={{ ...MONO, fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: T.faint }}>
            Protocol · 12-week arc
          </div>
        </div>
        <button
          onClick={() => exportJSON(state)}
          title="Export progress"
          style={{ ...MONO, background: "transparent", border: `1px solid ${T.line}`, color: T.faint,
                   borderRadius: 10, padding: "6px 10px", fontSize: 10, cursor: "pointer", letterSpacing: 1 }}
        >⇩ DATA</button>
      </div>

      {/* 12-week arc bar */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i + 1 < week ? SOLAR : i + 1 === week ? `${SOLAR}88` : T.line,
          }} />
        ))}
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          const accent = t.lunar ? LUNAR : SOLAR;
          return (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "today") setPickedDay(null); }} style={{
              ...MONO, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
              padding: "9px 14px", borderRadius: 10, cursor: "pointer", whiteSpace: "nowrap",
              background: active ? `${accent}1c` : "transparent",
              border: `1px solid ${active ? accent : T.line}`,
              color: active ? accent : T.muted,
            }}>{t.label}</button>
          );
        })}
      </div>

      {tab === "today" && (
        <TodayView
          state={state} setState={setState}
          week={week} dayIndex={activeDay}
          goYijin={() => setTab("yijin")}
        />
      )}
      {tab === "week" && (
        <WeekView state={state} week={week} dayIndex={dayIndex}
          onPickDay={(di) => { setPickedDay(di); setTab("today"); }} />
      )}
      {tab === "yijin" && <YiJinView phase={phase} />}
      {tab === "program" && <ProgramView week={week} />}
      {tab === "progress" && <ProgressView state={state} week={week} />}
    </div>
  );
}

function StartScreen({ onStart }) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayISO);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 340, animation: "fadeUp .4s ease" }}>
        <div style={{ ...DEVA, fontSize: 52, color: SOLAR, lineHeight: 1 }}>योद्धा</div>
        <div style={{ ...DISPLAY, fontSize: 26, color: T.ink, marginTop: 8 }}>Yoddha Protocol</div>
        <div style={{ ...MONO, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: T.faint, marginTop: 4 }}>
          Shaolin · Yoga · Pehlwani · Calisthenics · Tai Chi
        </div>
        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: "22px 0 14px" }}>
          Twelve weeks. Six days a week. The program lives on this device — no account, no feed, no noise.
          Set the day your arc begins.
        </div>
        <input
          type="date" value={date} onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%", padding: "12px", borderRadius: 12, fontSize: 15,
            background: T.card, border: `1px solid ${T.line}`, color: T.ink,
            colorScheme: "dark", outline: "none",
          }}
        />
        <button
          onClick={() => onStart(date)}
          style={{
            marginTop: 12, width: "100%", padding: "14px 0", borderRadius: 14, cursor: "pointer",
            background: SOLAR, border: "none", color: T.bg, fontSize: 15, fontWeight: 700,
          }}
        >Begin the arc</button>
      </div>
    </div>
  );
}
