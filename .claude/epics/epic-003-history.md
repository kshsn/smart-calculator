# Epic 003: History

**Goal:** Allow users to view past calculations and restore them to the display.  
**Status:** pending

---

## Stories

### US-003-001: As a user, I want to open a history panel so that I can see my past calculations

**Acceptance Criteria:**
- [ ] Given the app is open, a history icon/button is visible (e.g. top-right of the display area)
- [ ] Given I tap the history icon, a panel slides up showing a list of past calculations
- [ ] Given the history panel is open, each entry shows the full expression and result (e.g. "120 × 3 = 360")
- [ ] Given the panel is open, I can scroll through entries if there are more than fit on screen

**Edge Cases:**
- What if there are no past calculations yet? (show an empty state message: "No history yet")
- What if the history has hundreds of entries? (show the 50 most recent, oldest are dropped)
- What if the panel is open and the device is rotated? (panel adapts to the new orientation)

---

### US-003-002: As a user, I want to tap a history entry to restore it so that I can reuse a past result

**Acceptance Criteria:**
- [ ] Given the history panel is open, when I tap an entry, the result of that calculation is placed on the display
- [ ] Given a result is restored, the history panel closes automatically
- [ ] Given the restored value is on display, I can continue calculating with it immediately (tap an operator)

**Edge Cases:**
- What if the user taps a history entry while a calculation is in progress? (confirm replacement or cancel — show a brief toast)
- What if the restored value is very long (many decimals)? (truncate display with auto-size font, full value used internally)
- What if the user dismisses the panel without selecting? (display remains unchanged)

---

### US-003-003: As a user, I want to clear my history so that I can start fresh

**Acceptance Criteria:**
- [ ] Given the history panel is open, a "Clear All" button is visible
- [ ] Given I tap "Clear All", a confirmation dialog appears ("Clear history?")
- [ ] Given I confirm, all history entries are deleted and the empty state is shown
- [ ] Given I cancel, the history panel remains unchanged

**Edge Cases:**
- What if the user force-closes the app and reopens? (history persists via local storage)
- What if the device runs out of storage? (silently stop saving new entries, existing history preserved)
- What if the user clears history and immediately shakes the device (undo gesture)? (not supported in MVP — history is permanently cleared)

---

### US-003-004: As a user, I want my history to persist between app sessions so that I can refer back to past calculations later

**Acceptance Criteria:**
- [ ] Given I close the app and reopen it, my calculation history is still there
- [ ] Given a new calculation completes (= is tapped), it is automatically saved to history
- [ ] Given history is stored locally, no internet connection is required

**Edge Cases:**
- What if the user uninstalls and reinstalls the app? (history is cleared — local storage only, no backup)
- What if the app crashes mid-calculation? (the incomplete calculation is NOT saved to history)
- What if the device is restored from a backup? (behavior depends on OS backup settings — not guaranteed)
