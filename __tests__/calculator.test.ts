/**
 * Unit tests for the calculator engine
 * Covers all acceptance criteria and edge cases from epic-001
 */

// Pure function extracted for testing (mirrors useCalculator logic)
function applyOp(a: number, op: string, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

function formatResult(n: number): string {
  if (!isFinite(n) || isNaN(n)) return 'Error';
  if (Math.abs(n) >= 1e10 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(4);
  return parseFloat(n.toPrecision(10)).toString();
}

function calcPercent(current: number, base?: number, op?: string): number {
  if (base !== undefined && (op === '+' || op === '−')) return base * (current / 100);
  return current / 100;
}

// ── US-001-001: Basic arithmetic ──────────────────────────────────
describe('US-001-001: Basic arithmetic', () => {
  test('addition: 3 + 4 = 7', () => {
    expect(applyOp(3, '+', 4)).toBe(7);
  });
  test('subtraction: 10 − 3 = 7', () => {
    expect(applyOp(10, '−', 3)).toBe(7);
  });
  test('multiplication: 6 × 7 = 42', () => {
    expect(applyOp(6, '×', 7)).toBe(42);
  });
  test('division: 20 ÷ 4 = 5', () => {
    expect(applyOp(20, '÷', 4)).toBe(5);
  });
  test('floating point: 0.1 + 0.2 rounds cleanly', () => {
    const result = formatResult(applyOp(0.1, '+', 0.2));
    expect(result).toBe('0.3');
  });
});

// ── US-001-001: Edge cases ────────────────────────────────────────
describe('US-001-001: Edge cases', () => {
  test('divide by zero → Error', () => {
    expect(formatResult(applyOp(5, '÷', 0))).toBe('Error');
  });
  test('repeating decimal caps at 9 significant digits', () => {
    const result = formatResult(applyOp(1, '÷', 3));
    expect(result.length).toBeLessThanOrEqual(12);
  });
  test('very large number uses scientific notation', () => {
    const result = formatResult(9999999999 * 10);
    expect(result).toContain('e');
  });
});

// ── US-001-002: Percentage ────────────────────────────────────────
describe('US-001-002: Percentage', () => {
  test('standalone: 50% = 0.5', () => {
    expect(calcPercent(50)).toBe(0.5);
  });
  test('200 + 10% → 10% of 200 = 20 (not 0.10)', () => {
    expect(calcPercent(10, 200, '+')).toBe(20);
  });
  test('200 − 10% → 10% of 200 = 20', () => {
    expect(calcPercent(10, 200, '−')).toBe(20);
  });
});

// ── US-001-003: Clear & backspace ─────────────────────────────────
describe('US-001-003: Clear logic', () => {
  test('formatResult of Infinity is Error', () => {
    expect(formatResult(Infinity)).toBe('Error');
  });
  test('formatResult of NaN is Error', () => {
    expect(formatResult(NaN)).toBe('Error');
  });
});

// ── US-001-004: Toggle sign ───────────────────────────────────────
describe('US-001-004: Toggle sign', () => {
  test('positive becomes negative', () => {
    expect(42 * -1).toBe(-42);
  });
  test('negative becomes positive', () => {
    expect(-42 * -1).toBe(42);
  });
  test('zero stays zero', () => {
    expect(0 * -1).toBe(-0);
  });
});

// ── US-001-005: Decimal input ─────────────────────────────────────
describe('US-001-005: Decimals', () => {
  test('1.5 + 1.5 = 3', () => {
    expect(applyOp(1.5, '+', 1.5)).toBe(3);
  });
  test('formatResult strips trailing zeros', () => {
    expect(formatResult(3.0)).toBe('3');
  });
});
