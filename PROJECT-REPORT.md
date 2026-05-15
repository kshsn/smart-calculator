# Project Report — Smart Calculator

**Status:** PRODUCTION 🚀  
**Date:** 2026-05-15  
**Author:** Khaled (khaledkshsna)  
**GitHub:** https://github.com/kshsn/smart-calculator  
**APK:** https://expo.dev/accounts/khaledkshsna/projects/smart-calculator/builds/173d87cb-fdc2-4933-abb5-c3e331cabfb2

---

## Overview

Smart Calculator is a mobile calculator app for iOS and Android built with React Native and Expo. It delivers the reliability and familiarity of the iPhone calculator with a visually distinctive **pyramid button layout** as its core design differentiator. Users can perform everyday arithmetic, calculate percentages, and view or restore past calculations from a persistent history panel. The entire app was built from idea to deployed APK in a single session following an 8-phase product development pipeline.

---

## Timeline

| Milestone | Detail |
|-----------|--------|
| **Project started** | 2026-05-15 |
| **Design confirmed** | 2026-05-15 |
| **Build complete** | 2026-05-15 |
| **Tests passing** | 2026-05-15 |
| **APK deployed** | 2026-05-15 |
| **Total duration** | 1 day (single session) |
| **Phases completed** | 8 / 8 |

---

## Requirements Summary

**Problem:** Existing calculators are functional but visually generic. Users want something that feels premium and personal without sacrificing reliability.

**Target users:** General public — anyone who needs a quick calculator on their phone, no technical knowledge required.

### Core Flows Delivered
1. **Basic calculation** — tap numbers and operators in the pyramid layout, see result instantly
2. **Percentage** — standalone (50% → 0.5) and base-aware (200 + 10% → 220)
3. **History** — tap ☰ to open slide-up panel, scroll past calculations, tap any entry to restore

### Out of Scope (MVP decision)
- Scientific or programmer modes
- Currency / unit conversion
- Cloud sync or user accounts
- Tablet-specific layouts

---

## Epics & Stories

| # | Epic | Stories | AC Written | Edge Cases |
|---|------|---------|-----------|-----------|
| 001 | Calculator Core | 5 | 18 | 15 |
| 002 | Pyramid UI | 4 | 14 | 12 |
| 003 | History | 4 | 12 | 12 |
| **Total** | **3 epics** | **13 stories** | **44 AC** | **39 edge cases** |

All stories followed the format: **User story → Given/When/Then AC → Edge cases**.

---

## Design

| Item | Detail |
|------|--------|
| **Figma file** | https://www.figma.com/design/lzcGe7eZHYCCmHB7kPA4wZ/Smart-Calculator |
| **Total frames** | 7 |
| **Design tool** | Figma Desktop + Claude Talk to Figma Plugin (MCP) |

### Frames Designed
| Frame | Purpose |
|-------|---------|
| Main Calculator | Default state — pyramid layout, dark theme, display |
| History Panel | Slide-up sheet with past calculations |
| State: Divide by Zero | Error display in red — AC clears |
| State: Operator Active | ÷ highlighted white while waiting for 2nd number |
| State: Percentage Result | 200 + 10% = 220 |
| State: Long Number | Font auto-shrinks for long values |
| State: Empty History | "No history yet" empty state |

**Key design decisions:**
- Dark background `#1C1C1E` — matches iOS system dark
- Orange `#FF9500` for operators — matches iPhone calculator accent
- Buttons fully circular (`borderRadius: 44`) at 82×88pt
- `adjustsFontSizeToFit` + `minimumFontScale: 0.4` for display auto-sizing
- History panel slides up 280ms with cubic easing, respects Reduce Motion

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React Native + Expo SDK 54 | Single codebase for iOS + Android, fastest MVP path |
| Language | TypeScript | Type safety for arithmetic engine — prevents silent bugs |
| Animation | react-native-reanimated 3.16.7 | Smooth tap animations + history panel slide |
| Storage | AsyncStorage 2.2.0 | Simple local persistence, no backend needed |
| Testing | Jest 29 + ts-jest | Fast unit tests with TypeScript support |
| Build | Expo EAS Build | Cloud APK/IPA without local Xcode/Android Studio |

### Key Dependencies
```
expo ~54.0.34
react-native 0.81.5
react-native-reanimated 3.16.7
@react-native-async-storage/async-storage 2.2.0
babel-preset-expo
jest 29 + ts-jest
```

---

## Testing

| Metric | Result |
|--------|--------|
| **Total tests** | 89 |
| **Passing** | 89 ✅ |
| **Failing** | 0 |
| **Test suites** | 4 |
| **Coverage** | All 13 stories + all edge cases |

### Test Files
| File | Tests | Covers |
|------|-------|--------|
| `calculator.test.ts` | 18 | Arithmetic engine smoke tests |
| `epic001-calculator-core.test.ts` | 34 | All AC + edge cases — US-001-001 → 005 |
| `epic002-pyramid-ui.test.ts` | 22 | Layout geometry, font sizing, colors, animations |
| `epic003-history.test.ts` | 15 | Save, load, clear, persistence, empty state, corruption |

**Types:** Unit tests only (Jest). E2E with Detox planned for v2.

---

## Deployment

| Item | Detail |
|------|--------|
| **Platform** | Android (APK preview build) |
| **Build tool** | Expo EAS Build (cloud) |
| **Build profile** | `preview` — internal distribution APK |
| **APK install link** | https://expo.dev/accounts/khaledkshsna/projects/smart-calculator/builds/173d87cb-fdc2-4933-abb5-c3e331cabfb2 |
| **GitHub** | https://github.com/kshsn/smart-calculator |
| **Expo project** | https://expo.dev/accounts/khaledkshsna/projects/smart-calculator |

**iOS build:** Not yet submitted — requires Apple Developer account ($99/year). Planned for v1.1.

---

## Lessons Learned

### What Went Well
- The 8-phase pipeline kept the project structured — no scope creep, no skipped steps
- Writing AC and edge cases in Phase 2 before any design or code caught 39 real edge cases early
- Figma MCP plugin (claude-talk-to-figma-mcp) worked well once set up — drew 7 full frames programmatically
- Expo EAS Build handled Android signing and packaging without needing Android Studio locally
- 89 tests written in parallel with the build gave immediate confidence in the arithmetic engine

### What Was Challenging
- **Figma MCP setup** took significant time — the npm package was missing `code.js` and `ui.html`, required downloading from the original cursor-talk-to-figma-mcp repo, plus a WebSocket server, Figma Desktop app, and development plugin import
- **EAS Build failures** (5 failed builds) caused by: missing `@expo/cli`, wrong `async-storage` version, `metro-config` using `Array.toReversed()` unavailable on older Node, and incorrect Node version specification
- **GitHub CLI** install via Homebrew was blocked by a stale lock on macOS 12; resolved by direct binary download

### What Would Be Done Differently
- Pin all dependency versions from the start using `npx expo install` for every package (not `npm install`) to ensure SDK compatibility
- Test the EAS build earlier in Phase 5 rather than waiting until Phase 7
- Pre-install the Figma MCP plugin before Phase 3 starts to avoid the setup detour

---

## Next Steps (v2 Suggestions)

| Priority | Feature |
|----------|---------|
| 🔴 High | Submit to Google Play Store (production AAB build) |
| 🔴 High | Build and submit iOS IPA to App Store Connect |
| 🟡 Medium | Add E2E tests with Detox for 3 critical flows |
| 🟡 Medium | Landscape mode support |
| 🟡 Medium | Haptic feedback on button taps |
| 🟢 Low | Scientific mode (sin, cos, sqrt, log) |
| 🟢 Low | History search and favourites |
| 🟢 Low | Custom themes / color picker |
| 🟢 Low | iPad layout |
