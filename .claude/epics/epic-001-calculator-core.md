# Epic 001: Calculator Core

**Goal:** Implement the arithmetic engine and display so users can perform accurate calculations.  
**Status:** pending

---

## Stories

### US-001-001: As a user, I want to enter numbers and operators so that I can build a calculation

**Acceptance Criteria:**
- [ ] Given the app is open, when I tap any digit (0–9), then it appears on the display
- [ ] Given a number is on the display, when I tap an operator (+, −, ×, ÷), then the operator is stored and I can enter the second number
- [ ] Given two numbers and an operator are entered, when I tap `=`, then the correct result is shown on the display
- [ ] Given a result is shown, when I tap a digit, then a new calculation starts

**Edge Cases:**
- What if the user taps `=` without entering a second number? (repeat last operation)
- What if the user taps an operator immediately after another operator? (replace the operator)
- What if the result is a repeating decimal? (cap to 9 significant digits)
- What if the user divides by zero? (display "Error", allow clear)

---

### US-001-002: As a user, I want to use the percentage function so that I can quickly calculate percentages

**Acceptance Criteria:**
- [ ] Given a standalone number, when I tap `%`, then the display shows the number divided by 100 (e.g. 50 → 0.5)
- [ ] Given a base number and an operator (+/−), when I enter a second number and tap `%`, then it calculates the percentage of the base (e.g. 200 + 10% = 220)
- [ ] Given the result of a `%` operation, when I tap `=`, then the final result is shown correctly

**Edge Cases:**
- What if the user taps `%` on an empty display? (do nothing)
- What if the user taps `%` after entering only an operator? (do nothing)
- What if chaining % multiple times? (apply % to the current display value each time)

---

### US-001-003: As a user, I want to clear and correct my input so that I can fix mistakes without restarting

**Acceptance Criteria:**
- [ ] Given any state, when I tap `AC`, then the display resets to 0 and all stored values are cleared
- [ ] Given I am entering a number, when I tap `C` (backspace), then the last digit is removed
- [ ] Given only one digit remains and I tap `C`, then the display shows 0
- [ ] Given a result is displayed, when I tap `AC`, then everything clears

**Edge Cases:**
- What if the display shows "Error" and the user taps `C`? (treat same as AC, full clear)
- What if the user taps `C` after tapping `=`? (clear the full result, back to 0)
- What if a decimal point is the last character after backspace? (remove the decimal too)

---

### US-001-004: As a user, I want to toggle the sign of a number so that I can work with negative values

**Acceptance Criteria:**
- [ ] Given a positive number on the display, when I tap `+/−`, then the number becomes negative
- [ ] Given a negative number on the display, when I tap `+/−`, then the number becomes positive
- [ ] Given 0 on the display, when I tap `+/−`, then nothing changes

**Edge Cases:**
- What if the user toggles sign after pressing an operator? (apply to the new number being entered)
- What if the result of a calculation is negative and the user toggles? (toggle the result correctly)

---

### US-001-005: As a user, I want to enter decimal numbers so that I can work with non-integer values

**Acceptance Criteria:**
- [ ] Given a number on the display, when I tap `.`, then a decimal point is added
- [ ] Given a decimal point already exists, when I tap `.` again, then nothing happens (no double decimal)
- [ ] Given the display shows 0, when I tap `.`, then the display shows `0.`

**Edge Cases:**
- What if the user taps `.` immediately after an operator? (treat as `0.`)
- What if the result of a calculation already has decimals and the user taps `.`? (start a new number with `0.`)
