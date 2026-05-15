# Epic 002: Pyramid UI

**Goal:** Build the distinctive pyramid button layout and overall screen design that makes Smart Calculator visually unique.  
**Status:** pending

---

## Stories

### US-002-001: As a user, I want to see a pyramid-shaped button layout so that the app feels unique and premium

**Acceptance Criteria:**
- [ ] Given the app is open, the buttons are arranged in rows that narrow toward the top, forming a visible pyramid shape
- [ ] Given any screen size, the pyramid layout scales proportionally without buttons overflowing or becoming too small to tap
- [ ] Given the pyramid layout, each button has a minimum touch target of 44×44pt (Apple/Google HIG standard)
- [ ] Given the layout, the widest row (numbers) is at the bottom and the narrowest (AC, +/−, %) is at the top

**Edge Cases:**
- What if the screen is very small (e.g. iPhone SE)? (pyramid compresses but remains recognizable, no clipping)
- What if the device is rotated to landscape? (layout adapts — pyramid may flatten but remains usable)
- What if system font size is set to extra large? (button labels scale, touch targets remain intact)

---

### US-002-002: As a user, I want a clear display area at the top so that I can always see my current input and result

**Acceptance Criteria:**
- [ ] Given any calculation state, the display shows the current number or result at all times
- [ ] Given a number with many digits, the font size reduces automatically to fit the display (like iPhone calculator)
- [ ] Given a result, the display right-aligns the number
- [ ] Given an operator is active, a subtle indicator shows which operator is selected

**Edge Cases:**
- What if the number is longer than the display can show even at minimum font size? (switch to scientific notation)
- What if "Error" is displayed? (show in a distinct color, e.g. red)
- What if the user is in the middle of entering a second number? (display the new number being typed, not the first)

---

### US-002-003: As a user, I want distinct visual styles for different button types so that I can quickly identify operators, numbers, and functions

**Acceptance Criteria:**
- [ ] Given the button layout, number buttons (0–9, .) have a neutral color (dark gray)
- [ ] Given the layout, operator buttons (+, −, ×, ÷, =) use an accent color (e.g. orange, similar to iPhone)
- [ ] Given the layout, function buttons (AC, +/−, %) use a medium gray
- [ ] Given I tap a button, it shows a pressed/highlight state for visual feedback

**Edge Cases:**
- What if the active operator button should appear "selected"? (keep it highlighted in a lighter shade while waiting for second operand)
- What if dark mode is enabled on the device? (all button colors adapt to a dark theme)
- What if the user taps and holds a button? (no repeat trigger — calculators are tap-only)

---

### US-002-004: As a user, I want smooth animations on button taps so that the app feels responsive and polished

**Acceptance Criteria:**
- [ ] Given any button tap, a subtle scale-down animation plays (duration ~80ms)
- [ ] Given the display updates, the new value appears instantly with no lag
- [ ] Given the history panel opens or closes, it slides in/out with a smooth animation (~250ms)

**Edge Cases:**
- What if the user taps very rapidly? (animations do not stack or delay — each tap registers immediately)
- What if the device has "Reduce Motion" enabled? (skip animations, show instant state changes)
