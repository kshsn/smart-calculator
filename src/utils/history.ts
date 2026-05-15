import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@smart_calculator_history';
const MAX_ENTRIES = 50;

export interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: number;
}

export async function saveToHistory(entry: HistoryEntry): Promise<void> {
  try {
    const existing = await loadHistory();
    const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (_) {
    // Silently fail — storage issues must not crash the calculator
  }
}

export async function loadHistory(): Promise<HistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (_) {}
}
