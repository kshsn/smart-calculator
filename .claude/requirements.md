# Requirements — Smart Calculator

**Created:** 2026-05-15  
**Status:** Awaiting confirmation

---

## Problem Statement
Users need a clean, visually distinctive calculator on their phone. Existing calculators are functional but generic. Smart Calculator offers the same reliability as the iPhone calculator with a unique pyramid button layout that makes it stand out and feel premium.

## Goals
1. Provide a fast, reliable calculator for everyday arithmetic on iOS and Android
2. Deliver a visually unique pyramid button layout as the core design differentiator
3. Let users view and recall past calculations via a history panel

## Non-Goals (explicitly out of scope)
- Scientific or programmer modes
- Currency conversion or unit conversion
- Cloud sync or user accounts
- Tablet-specific layouts (MVP targets phone screens only)

## User Types
| User Type | Description |
|-----------|-------------|
| General public | Anyone who needs a quick calculator on their phone — no technical knowledge required |

## Core Flows
1. **Basic calculation:** User opens app → taps numbers and operators in pyramid layout → sees result on display
2. **Percentage:** User enters a number → taps % → result shown inline (e.g. 200 % → 2, or 200 + 10% → 220)
3. **History:** User taps the history icon → sees a scrollable list of past calculations → taps one to restore it to the display

## Constraints
- **Platform:** iOS + Android (React Native / Expo)
- **Deadline:** MVP / prototype — ship something working first, polish later
- **Design:** Pyramid button layout — buttons arranged so each row narrows toward the top, creating a visual pyramid shape
- **Reference:** iPhone calculator for UX familiarity (display at top, operators on right, numbers in center)

---

## Epic Index
| # | Epic | Stories | Status |
|---|------|---------|--------|
| 001 | Calculator Core | 5 | pending |
| 002 | Pyramid UI | 4 | pending |
| 003 | History | 4 | pending |
