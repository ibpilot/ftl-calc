# FTL Calc

**EASA Flight Time Limitations calculator for commercial air transport crew.**

A mobile-first Progressive Web App that calculates the maximum Flight Duty Period (FDP) and minimum rest requirements based on EASA Subpart FTL (Regulation EU 83/2014, ORO.FTL.205 / ORO.FTL.235). Designed for cockpit use — fast, offline-capable, installable on any device.

**Live app → [ibpilot.github.io/ftl-calc](https://ibpilot.github.io/ftl-calc)**

---

## Features

- **FDP limit calculator** — enter report time, number of sectors, acclimatisation state and crew configuration to get the maximum legal FDP and the exact off-block limit time
- **FDP extensions** — augmented crew (+3h), in-flight rest by facility class (class 1/2/3), and commander's discretion (+2h standard / +3h augmented)
- **Estimated block time** — enter the flight plan block time to calculate the latest legal departure (FDP limit − block time), so the landing fits within the FDP
- **Delay check** — optional section to enter an ETD (local or UTC/Zulu) and instantly see whether the departure is feasible and the margin remaining
- **UTC → local conversion** — airport search backed by the full OpenFlights database (7,600+ airports) with automatic DST-aware timezone conversion; falls back to a curated list of common routes if offline
- **Minimum rest** — calculates the minimum required rest after duty (ORO.FTL.235) and the earliest time for the next report, for both home base and away from base
- **WOCL detection** — flags when duty encroaches the Window of Circadian Low (02:00–05:59) with contextual explanation
- **Contextual help** — inline "?" panels explaining acclimatisation states (with transatlantic route examples), augmented crew, WOCL, and commander's discretion
- **Install prompt** — guided onboarding modal with device-specific instructions for iOS, Android, and desktop

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

> **Reference only.** Always verify against your operator's Operations Manual Part A. FDP values in this app follow the published ORO.FTL.205 Table 1 structure. Operator-specific variations may apply.

---

## PWA — offline use

The app works fully offline once installed. Static assets (icons, manifest) are cached on first load. The `index.html` is served network-first — when online, the latest version is always fetched automatically.

Install to home screen:
- **iOS**: open in Safari → Share → Add to Home Screen
- **Android**: open in Chrome → menu → Add to Home Screen
- **Desktop**: click the ⊕ icon in the Chrome/Edge address bar

---

## Stack

- Single self-contained HTML file — no framework, no build step, no backend
- Vanilla JavaScript (ES2020) with strict separation between calculation logic and UI rendering
- CSS custom properties, `dvh` units, responsive grid
- OpenFlights airport database (CC BY 3.0)
- Service worker with network-first strategy for HTML, cache-first for static assets
- PWA manifest with maskable icons

---

## Related

- [cosmic-rad](https://github.com/ibpilot/cosmic-rad) — cosmic radiation flight exposure calculator for crew

---

## License

MIT © ibpilot
