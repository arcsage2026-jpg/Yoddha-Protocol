// ── Yoddha Protocol · 12-week arc ───────────────────────────────
// Phase index 0/1/2 = Foundation / Build / Advanced. Weeks 4 & 8 deload (-40%).

export const PHASES = [
  { id: 0, name: "Foundation", weeks: "1–4", sub: "Learn the shapes. Groove the breath." },
  { id: 1, name: "Build", weeks: "5–8", sub: "Add volume. Load the tendons." },
  { id: 2, name: "Advanced", weeks: "9–12", sub: "Full expression. Intention leads." },
];

export const DELOAD_WEEKS = [4, 8];

// vol: [P1, P2, P3] prescriptions
export const DAYS = [
  {
    id: "sun", name: "Vishram", deva: "विश्राम", kind: "rest",
    tags: ["Full Rest"],
    blocks: [],
    note: "Complete rest. Walk, eat well, sleep. The body builds on the empty day.",
  },
  {
    id: "mon", name: "Shaolin Strength + Sun", deva: "सूर्य", kind: "solar",
    tags: ["Strength", "Cardio"],
    blocks: [
      { id: "surya", name: "Surya Namaskar", sub: "warm-up", videoId: "l_bJzyXGoFo",
        vol: ["5 rounds, slow", "8–10 rounds", "12–15 rounds"],
        cues: ["Move with the breath — one breath, one shape.", "Full range in cobra and down-dog.", "Let round one be the slowest."] },
      { id: "horse", name: "Horse Stance", sub: "Ma Bu holds", videoId: "OEx7yhNpfVs",
        vol: ["3 × 30s", "3 × 60s", "3 × 90s+"],
        cues: ["Knees track the toes.", "Spine tall, tailbone tucked.", "Breathe low into the belly — don't brace the chest."] },
      { id: "dand", name: "Hindu Push-ups", sub: "Dand", videoId: "NPkIWXKZEYg",
        vol: ["3 × 6–8", "4 × 12–15", "5 × 20–25"],
        cues: ["Sweep low like a wave, not a dive-bomb.", "Elbows soft at the bottom.", "Hips lead the return."] },
      { id: "baithak", name: "Hindu Squats", sub: "Baithak", videoId: "bxkjl8rbzCw",
        vol: ["3 × 15", "4 × 25", "5 × 40"],
        cues: ["Heels rise, arms swing — it's a rhythm, not a squat PR.", "Land soft.", "Eyes on one point."] },
      { id: "bear", name: "Bear Crawl", sub: "quadrupedal work", videoId: null,
        vol: ["3 × 10 m", "3 × 20 m", "4 × 25 m"],
        cues: ["Knees an inch off the floor.", "Opposite hand and foot move together.", "Slow is harder — go slow."] },
      { id: "tcCool", name: "Tai Chi Cooldown", sub: "settle", videoId: "B0QDRqHNNE8",
        vol: ["5 min", "5 min", "5 min"],
        cues: ["Let the heart rate fall inside the movement.", "Nose breathing only."] },
    ],
  },
  {
    id: "tue", name: "Conditioning", deva: "दम", kind: "solar",
    tags: ["Cardio", "Stamina"],
    blocks: [
      { id: "circuit", name: "Military Circuit", sub: "push-ups · jacks · climbers · burpees", videoId: null,
        vol: ["2 rounds", "3 rounds", "4 rounds"],
        cues: ["Strict push-ups — chest to floor, body a plank.", "Rest only between rounds.", "Pace the burpees; don't sprint round one."] },
      { id: "suryaFast", name: "Surya Namaskar", sub: "fast rounds", videoId: "l_bJzyXGoFo",
        vol: ["5 rounds", "8 rounds", "12 rounds"],
        cues: ["Brisk but never sloppy.", "Breath still leads."] },
      { id: "run", name: "Run", sub: "road work", videoId: null,
        vol: ["15 min easy", "20 min + pickups", "25 min intervals"],
        cues: ["Nasal breathing on easy portions.", "Tall posture, quick feet."] },
    ],
  },
  {
    id: "wed", name: "Flow & Flexibility", deva: "चन्द्र", kind: "lunar",
    tags: ["Flexibility", "Recovery"],
    blocks: [
      { id: "yijin", name: "Yi Jin Jing", sub: "muscle-tendon changing · anchor", videoId: null, yijin: true,
        vol: ["~20 min · 3 breaths/posture", "~30 min · 6 breaths/posture", "~40 min · 9 breaths/posture"],
        cues: ["Open the YI JIN tab for the full 12-posture form.", "Depth and breath scale — never speed."] },
      { id: "taichi", name: "Tai Chi Practice", sub: "form work", videoId: "B0QDRqHNNE8",
        vol: ["10 min", "15 min", "20 min form"],
        cues: ["Weight fully commits before each step.", "Continuous — no seams between movements."] },
      { id: "chandra", name: "Chandra Namaskar", sub: "moon salutation", videoId: "x-QxVypp86U",
        vol: ["3 rounds", "5 rounds", "7 rounds"],
        cues: ["Softer and slower than Surya.", "Long exhales — this one downshifts you."] },
      { id: "stretch", name: "Deep Stretch", sub: "long holds", videoId: null,
        vol: ["15 min", "15 min", "15 min"],
        cues: ["90-second holds minimum.", "Ease off anything that pinches."] },
      { id: "prana", name: "Pranayama", sub: "breath practice", videoId: null,
        vol: ["5 min", "8 min", "10 min"],
        cues: ["Sit tall or lie flat.", "Use the meditation timer's pacer."] },
    ],
  },
  {
    id: "thu", name: "Shaolin Power + Pull", deva: "बल", kind: "solar",
    tags: ["Strength", "Endurance"],
    blocks: [
      { id: "suryaW", name: "Surya Namaskar", sub: "warm-up", videoId: "l_bJzyXGoFo",
        vol: ["3 rounds", "5 rounds", "5 rounds"],
        cues: ["Just enough to heat the joints."] },
      { id: "kicks", name: "Shaolin Kicks", sub: "straight · inside · outside", videoId: "TYz_m9XC1XM",
        vol: ["2 × 10 each", "3 × 15 each", "3 × 20 each"],
        cues: ["Height comes from the hip, not the back.", "Standing leg stays proud.", "Snap out, float back."] },
      { id: "pull", name: "Pull-up Progression", sub: "negatives → full", videoId: "CGAqIFxl43Q",
        vol: ["negatives + assisted 3 × 5", "4 × 5–8 full", "5 × 8–12"],
        cues: ["Dead hang start, full lockout finish.", "5-second negatives are the teacher.", "Shoulders down before you pull."] },
      { id: "dips", name: "Dips", sub: "bars or chairs", videoId: null,
        vol: ["3 × 8", "4 × 12", "5 × 15"],
        cues: ["Elbows to 90°, chest slightly forward.", "No shrugging at the top."] },
      { id: "iron", name: "Iron Body Holds", sub: "plank + horse stance", videoId: null,
        vol: ["3 × 30s", "3 × 60s", "3 × 90s"],
        cues: ["Whole body one piece of iron.", "Quiet face, quiet breath."] },
      { id: "core", name: "Core Circuit", sub: "hollow · side plank · raises", videoId: null,
        vol: ["2 rounds", "3 rounds", "3 rounds"],
        cues: ["Low back stays glued in hollow holds.", "Quality over count."] },
    ],
  },
  {
    id: "fri", name: "Full-Body + Yoga Strength", deva: "योग", kind: "solar",
    tags: ["Strength", "Flexibility"],
    blocks: [
      { id: "fbCircuit", name: "Calisthenics Circuit", sub: "push · pull · squat mix", videoId: null,
        vol: ["2 rounds", "3 rounds", "4 rounds"],
        cues: ["Pick your hardest clean variations.", "Rest 90s between rounds."] },
      { id: "armBal", name: "Yoga Holds & Arm Balances", sub: "crow · side plank · boat", videoId: null,
        vol: ["3 × 20s", "3 × 40s", "3 × 60s"],
        cues: ["Fingers grip the floor in crow.", "Falling is part of the syllabus.", "Boat: chest open, not crunched."] },
    ],
  },
  {
    id: "sat", name: "Shaolin Endurance", deva: "सहन", kind: "solar",
    tags: ["Endurance", "Stamina"],
    blocks: [
      { id: "flow", name: "Shaolin Flow", sub: "continuous bodyweight round", videoId: "TYz_m9XC1XM",
        vol: ["15 min continuous", "22 min continuous", "30 min continuous"],
        cues: ["Baithak → Dand → bear crawl → bear-hug walk → horse stance, repeat.", "Never stop moving; downshift instead of resting.", "This is the crucible day."] },
      { id: "ruck", name: "Run or Ruck", sub: "road work", videoId: null,
        vol: ["20 min", "30 min", "40 min"],
        cues: ["Conversational pace.", "Rucking: pack tight and high."] },
      { id: "tcCool2", name: "Tai Chi Cooldown", sub: "settle", videoId: "B0QDRqHNNE8",
        vol: ["5 min", "5 min", "5 min"],
        cues: ["Reward movement. Slow everything down."] },
    ],
  },
];

export const weekToPhase = (week) => (week <= 4 ? 0 : week <= 8 ? 1 : 2);
export const isDeload = (week) => DELOAD_WEEKS.includes(week);
