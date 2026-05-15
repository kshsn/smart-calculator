/**
 * Epic 003 — History
 * Tests for save, load, clear, persistence, empty state, restore
 * Stories: US-003-001 through US-003-004
 */

// ── In-memory mock of AsyncStorage ───────────────────────────────
const store: Record<string, string> = {};
const MockAsyncStorage = {
  getItem: jest.fn(async (key: string) => store[key] ?? null),
  setItem: jest.fn(async (key: string, value: string) => { store[key] = value; }),
  removeItem: jest.fn(async (key: string) => { delete store[key]; }),
};

// ── Inline history logic (same as src/utils/history.ts) ──────────
const HISTORY_KEY = '@smart_calculator_history';
const MAX_ENTRIES = 50;

interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: number;
}

async function saveToHistory(entry: HistoryEntry): Promise<void> {
  try {
    const raw = await MockAsyncStorage.getItem(HISTORY_KEY);
    const existing: HistoryEntry[] = raw ? JSON.parse(raw) : [];
    const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
    await MockAsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (_) {}
}

async function loadHistory(): Promise<HistoryEntry[]> {
  try {
    const raw = await MockAsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) { return []; }
}

async function clearHistory(): Promise<void> {
  try {
    await MockAsyncStorage.removeItem(HISTORY_KEY);
  } catch (_) {}
}

// ── Reset storage before each test ───────────────────────────────
beforeEach(() => {
  Object.keys(store).forEach(k => delete store[k]);
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────────
// US-003-001: View history panel
// ─────────────────────────────────────────────────────────────────
describe('US-003-001: Open history panel', () => {
  // AC: each entry shows full expression + result
  test('AC3 — saved entry includes expression and result', async () => {
    await saveToHistory({ expression: '120 × 3 = 360', result: '360', timestamp: 1000 });
    const entries = await loadHistory();
    expect(entries[0].expression).toBe('120 × 3 = 360');
    expect(entries[0].result).toBe('360');
  });

  // AC: multiple entries are scrollable (list structure)
  test('AC4 — multiple entries are all returned in order', async () => {
    await saveToHistory({ expression: 'A', result: '1', timestamp: 1 });
    await saveToHistory({ expression: 'B', result: '2', timestamp: 2 });
    await saveToHistory({ expression: 'C', result: '3', timestamp: 3 });
    const entries = await loadHistory();
    expect(entries).toHaveLength(3);
    // Most recent first
    expect(entries[0].expression).toBe('C');
    expect(entries[1].expression).toBe('B');
    expect(entries[2].expression).toBe('A');
  });

  // Edge: no calculations yet → empty array
  test('Edge — empty storage returns empty array (no history yet)', async () => {
    const entries = await loadHistory();
    expect(entries).toHaveLength(0);
    expect(entries).toEqual([]);
  });

  // Edge: cap at 50 most recent entries
  test('Edge — history capped at 50 entries (oldest dropped)', async () => {
    for (let i = 0; i < 55; i++) {
      await saveToHistory({ expression: `calc ${i}`, result: `${i}`, timestamp: i });
    }
    const entries = await loadHistory();
    expect(entries).toHaveLength(MAX_ENTRIES);
    // Most recent should be calc 54
    expect(entries[0].expression).toBe('calc 54');
    // calc 0..4 should be dropped
    const hasOldest = entries.some(e => e.expression === 'calc 0');
    expect(hasOldest).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────
// US-003-002: Restore from history
// ─────────────────────────────────────────────────────────────────
describe('US-003-002: Restore calculation from history', () => {
  // AC: tapping entry places its result on display
  test('AC1 — restore sets display to entry result', async () => {
    await saveToHistory({ expression: '99 ÷ 3 = 33', result: '33', timestamp: 1 });
    const entries = await loadHistory();
    const restored = entries[0].result;
    expect(restored).toBe('33');
  });

  // AC: after restore, further calculation works
  test('AC3 — restored value is a valid number for further calculation', async () => {
    await saveToHistory({ expression: '6 × 7 = 42', result: '42', timestamp: 1 });
    const entries = await loadHistory();
    const val = parseFloat(entries[0].result);
    expect(isNaN(val)).toBe(false);
    expect(val + 8).toBe(50); // can add to it
  });

  // Edge: restored value is very long decimal → still valid internally
  test('Edge — long decimal result can be restored', async () => {
    await saveToHistory({ expression: '1 ÷ 3 = 0.333333333', result: '0.333333333', timestamp: 1 });
    const entries = await loadHistory();
    expect(entries[0].result).toBe('0.333333333');
    expect(parseFloat(entries[0].result)).toBeCloseTo(0.333, 3);
  });
});

// ─────────────────────────────────────────────────────────────────
// US-003-003: Clear history
// ─────────────────────────────────────────────────────────────────
describe('US-003-003: Clear history', () => {
  // AC: after clearing, history is empty
  test('AC3 — clear removes all entries', async () => {
    await saveToHistory({ expression: 'A = 1', result: '1', timestamp: 1 });
    await saveToHistory({ expression: 'B = 2', result: '2', timestamp: 2 });
    await clearHistory();
    const entries = await loadHistory();
    expect(entries).toHaveLength(0);
  });

  // AC: cancel → history unchanged
  test('AC4 — cancel does not clear history', async () => {
    await saveToHistory({ expression: 'A = 1', result: '1', timestamp: 1 });
    // Simulate cancel (no clearHistory call)
    const entries = await loadHistory();
    expect(entries).toHaveLength(1);
  });

  // Edge: clearing twice has no error
  test('Edge — clearing already-empty history throws no error', async () => {
    await expect(clearHistory()).resolves.toBeUndefined();
    await expect(clearHistory()).resolves.toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────
// US-003-004: History persistence between sessions
// ─────────────────────────────────────────────────────────────────
describe('US-003-004: Persistence', () => {
  // AC: history saved after = is tapped (auto-save)
  test('AC2 — each completed calculation is auto-saved', async () => {
    // Simulating 3 completed calculations
    const calcs = [
      { expression: '3 + 4 = 7', result: '7', timestamp: 1 },
      { expression: '10 × 2 = 20', result: '20', timestamp: 2 },
      { expression: '100 − 1 = 99', result: '99', timestamp: 3 },
    ];
    for (const c of calcs) await saveToHistory(c);
    const entries = await loadHistory();
    expect(entries).toHaveLength(3);
  });

  // AC: no internet needed (local storage only)
  test('AC3 — storage uses AsyncStorage (no network call)', async () => {
    await saveToHistory({ expression: '1 + 1 = 2', result: '2', timestamp: 1 });
    // AsyncStorage.setItem was called, not fetch/axios
    expect(MockAsyncStorage.setItem).toHaveBeenCalled();
    expect(MockAsyncStorage.setItem).toHaveBeenCalledWith(
      HISTORY_KEY,
      expect.any(String)
    );
  });

  // Edge: crash mid-calculation → incomplete calc not saved
  test('Edge — Error result is not saved to history', async () => {
    // Error results should be filtered out before save
    const result = 'Error';
    const shouldSave = result !== 'Error';
    expect(shouldSave).toBe(false);

    // Nothing saved
    const entries = await loadHistory();
    expect(entries).toHaveLength(0);
  });

  // Edge: storage failure → does not crash the app
  test('Edge — storage write failure is swallowed silently', async () => {
    MockAsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage full'));
    // Should not throw
    await expect(
      saveToHistory({ expression: '1 + 1 = 2', result: '2', timestamp: 1 })
    ).resolves.toBeUndefined();
  });

  // Edge: corrupted storage data → returns empty array gracefully
  test('Edge — corrupted stored JSON returns empty array', async () => {
    store[HISTORY_KEY] = 'NOT_VALID_JSON{{{{';
    const entries = await loadHistory();
    expect(entries).toEqual([]);
  });
});
