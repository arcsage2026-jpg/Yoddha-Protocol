# Yoddha Protocol · योद्धा

A 12-week warrior training instrument — Shaolin Kung Fu, yoga, pehlwani conditioning, military calisthenics, Tai Chi, and Yi Jin Jing — built as a local-first installable PWA.

Not a fitness tracker. A sadhana instrument: the week is structured by the Surya/Chandra (solar/lunar) duality — solar days build, lunar days restore — and the internal work (Yi Jin Jing, meditation) scales by **depth, breath, and duration**, never reps.

## Design

- **Akhara at Dawn** palette — warm earth darks, saffron (solar) and moon-sage (lunar) accents
- Oswald display type, IBM Plex Mono training-ledger numerals, Tiro Devanagari Sanskrit for the bilingual identity
- Signature element: a breath-pacer ring (4s in · 4s hold · 6s out) driving meditation and pranayama
- No gamification, no feed, no account. Local-first: all data on-device, exportable as JSON.

## Features

- Auto-detects your program week and day from a chosen start date
- Phase-scaled prescriptions (Foundation / Build / Advanced), automatic deload weeks (4, 8)
- Per-exercise bottom sheet: prescription, coaching cues, YouTube form video, set logging, rest timer
- Yi Jin Jing module: the full 12-posture Muscle-Tendon Changing form, phase-scaled by breath cycles and stance depth
- Beej Mantra meditation timer with breath pacer and end chime
- Progress: 12-week arc, sessions sealed per phase, total set volume
- Installable PWA (Android/iOS home screen), works offline

## Run locally

```bash
npm install
npm run dev
```

## Deploy (free, ~3 minutes)

1. Push this folder to a GitHub repository
2. Go to vercel.com → Add New Project → import the repo
3. Framework preset: Vite (auto-detected) → Deploy
4. Open the URL on your phone → browser menu → "Add to Home screen"

## Stack

React 18 · Vite · vite-plugin-pwa. No backend, no database, no tracking. ~zero dependencies beyond React.
