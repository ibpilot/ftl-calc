# ✈️ FTL Calc

**EASA Flight Time Limitations calculator for commercial air transport crew.**

A mobile-first Progressive Web App that calculates the maximum Flight Duty Period (FDP), latest legal departure time, and minimum rest requirements — based on EASA Subpart FTL (Regulation EU 83/2014, ORO.FTL.205 / ORO.FTL.235). Built for cockpit use: fast, offline-capable, and installable on any device.

**→ [ibpilot.github.io/ftl-calc](https://ibpilot.github.io/ftl-calc)**

---

## Screenshots

> _Mobile-first dark UI designed for cockpit readability._

---

## Features

### 🕐 FDP Calculator
- Enter report time, number of sectors, acclimatisation state, and home/away base
- Instantly get the **maximum legal FDP** and **exact off-block limit time**
- Clock visual marks the FDP limit at a glance

### ⏱ Block Time & Latest Departure
- Enter estimated block time from the flight plan
- App calculates **latest legal off-block time** (FDP limit − block time) so the landing fits within limits — not just the departure

### 📋 FDP Extensions
- **Augmented crew** (+3h)
- **In-flight rest** by facility class (Class 1 / 2 / 3) with detailed explanations
- **Commander's discretion** (+2h standard / +3h augmented) per ORO.FTL.205(f)

### 🛫 Departure Window Check
- Enter ETD and ETA in UTC directly from the flight plan
- App checks whether **departure and landing** both fall within the FDP limit
- Shows block time, estimated landing, and margin in green / red

### 🌍 Local → UTC Converter
- Collapsible utility to convert a local report time to UTC
- Backed by the full **OpenFlights database** (7,600+ airports) with automatic DST-aware timezone resolution
- Falls back to a curated offline list of **58 long-haul airports** covering all Iberia and LEVEL routes (USA, Canada, Mexico, Caribbean, Central America, Colombia, Venezuela, Ecuador, Peru, Bolivia, Chile, Argentina, Uruguay, Paraguay, Brazil, Middle East, Asia, Europe)

### 😴 Minimum Rest
- Calculates minimum required rest after duty (ORO.FTL.235)
- Shows earliest time for next report, for home base and away from base

### ⚠️ WOCL Detection
- Flags when duty encroaches the Window of Circadian Low (02:00–05:59)
- Contextual explanation of physiological impact and operational implications

### ℹ️ Contextual Help
Inline "?" panels explaining every parameter:
- Acclimatisation states — with transatlantic route examples (MAD/BCN → East Coast, West Coast, South America)
- Augmented crew definition and A330 context
- In-flight rest facility classes (1 / 2 / 3)
- Window of Circadian Low (WOCL)
- Commander's discretion rules and limitations

### 📲 PWA — Installable & Offline
- Works fully offline once installed
- Install prompt with step-by-step instructions for iOS, Android, and desktop
- Network-first strategy for HTML (always serves fresh content when online)
- Auto-reloads when a new version is deployed

---

## All times in UTC

All inputs (report time, ETD, ETA, block time) are entered in **UTC/Zulu** as per the flight plan. A built-in local→UTC converter is available for report times given in local time by the operator.

---

## Regulatory basis

| Reference | Content |
|---|---|
| EASA ORO.FTL.205 | Maximum FDP limits by report hour and sector count |
| EASA ORO.FTL.205(e) | In-flight rest extensions by facility class |
| EASA ORO.FTL.205(f) | Commander's discretion |
| EASA ORO.FTL.235 | Minimum rest requirements |
| EASA ORO.FTL.105 | WOCL definition |
| Regulation (EU) 83/2014 | Subpart FTL framework |

> ⚠️ **Reference only.** Always verify against your operator's Operations Manual Part A. FDP values follow the published ORO.FTL.205 Table 1 structure. Operator-specific variations may apply.

---

## Stack

- Single self-contained HTML file — no framework, no build step, no backend
- Vanilla JavaScript (ES2020) with strict separation between calculation logic and UI rendering
- CSS custom properties, `dvh` units, mobile-first responsive grid
- OpenFlights airport database (CC BY 3.0) with offline fallback
- Service worker: network-first for HTML, cache-first for static assets, auto-reload on update
- PWA manifest with maskable icons

---

## Related

- [cosmic-rad](https://github.com/ibpilot/cosmic-rad) — in-flight cosmic radiation exposure calculator (EURADOS/ICRP 103)

---

## License

MIT © ibpilot
