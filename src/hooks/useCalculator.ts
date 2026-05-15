import { useState, useCallback } from 'react';
import { saveToHistory } from '../utils/history';

export type Operator = '+' | '−' | '×' | '÷' | null;

export interface CalculatorState {
  display: string;
  expression: string;
  operator: Operator;
  prevValue: string;
  waitingForSecond: boolean;
  justEvaluated: boolean;
}

const MAX_DIGITS = 9;

function formatResult(n: number): string {
  if (!isFinite(n)) return 'Error';
  if (isNaN(n)) return 'Error';
  // Use scientific notation for very large/small numbers
  if (Math.abs(n) >= 1e10 || (Math.abs(n) < 1e-6 && n !== 0)) {
    return n.toExponential(4);
  }
  // Limit decimal places to avoid floating point noise
  const str = parseFloat(n.toPrecision(10)).toString();
  return str;
}

function applyOp(a: number, op: Operator, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

const INITIAL: CalculatorState = {
  display: '0',
  expression: '',
  operator: null,
  prevValue: '',
  waitingForSecond: false,
  justEvaluated: false,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL);

  const pressDigit = useCallback((digit: string) => {
    setState(s => {
      if (s.display === 'Error') return { ...INITIAL };

      if (s.waitingForSecond || s.justEvaluated) {
        return { ...s, display: digit, waitingForSecond: false, justEvaluated: false };
      }

      if (s.display === '0' && digit !== '.') {
        return { ...s, display: digit };
      }

      // Prevent double decimal
      if (digit === '.' && s.display.includes('.')) return s;

      // Limit digit count
      const clean = s.display.replace(/[^0-9.]/g, '');
      if (clean.replace('.', '').length >= MAX_DIGITS && digit !== '.') return s;

      return { ...s, display: s.display + digit };
    });
  }, []);

  const pressOperator = useCallback((op: Operator) => {
    setState(s => {
      if (s.display === 'Error') return { ...INITIAL };

      // If already have prev + operator, chain evaluate first
      if (s.operator && !s.waitingForSecond && !s.justEvaluated) {
        const result = applyOp(parseFloat(s.prevValue), s.operator, parseFloat(s.display));
        const res = formatResult(result);
        return {
          ...s,
          display: res,
          expression: `${res}`,
          prevValue: res,
          operator: op,
          waitingForSecond: true,
          justEvaluated: false,
        };
      }

      return {
        ...s,
        prevValue: s.display,
        operator: op,
        waitingForSecond: true,
        justEvaluated: false,
        expression: `${s.display} ${op}`,
      };
    });
  }, []);

  const pressEquals = useCallback(() => {
    setState(s => {
      if (!s.operator || s.display === 'Error') return s;

      const a = parseFloat(s.prevValue);
      const b = parseFloat(s.display);
      const result = applyOp(a, s.operator, b);
      const res = formatResult(result);
      const expr = `${s.prevValue} ${s.operator} ${s.display} = ${res}`;

      // Save to history (only valid results)
      if (res !== 'Error') {
        saveToHistory({ expression: expr, result: res, timestamp: Date.now() });
      }

      return {
        ...s,
        display: res,
        expression: expr,
        operator: null,
        prevValue: '',
        waitingForSecond: false,
        justEvaluated: true,
      };
    });
  }, []);

  const pressPercent = useCallback(() => {
    setState(s => {
      if (s.display === 'Error') return s;
      const current = parseFloat(s.display);
      let result: number;

      // If there's a base number with + or −, calculate % of base
      if (s.prevValue && (s.operator === '+' || s.operator === '−')) {
        result = parseFloat(s.prevValue) * (current / 100);
      } else {
        result = current / 100;
      }

      return { ...s, display: formatResult(result) };
    });
  }, []);

  const pressToggleSign = useCallback(() => {
    setState(s => {
      if (s.display === '0' || s.display === 'Error') return s;
      const n = parseFloat(s.display) * -1;
      return { ...s, display: formatResult(n) };
    });
  }, []);

  const pressBackspace = useCallback(() => {
    setState(s => {
      if (s.display === 'Error' || s.justEvaluated) return { ...INITIAL };
      if (s.display.length <= 1) return { ...s, display: '0' };
      const next = s.display.slice(0, -1);
      return { ...s, display: next.endsWith('.') ? next.slice(0, -1) : next };
    });
  }, []);

  const pressClear = useCallback(() => {
    setState(INITIAL);
  }, []);

  const restoreFromHistory = useCallback((value: string) => {
    setState(s => ({ ...INITIAL, display: value, justEvaluated: true }));
  }, []);

  return {
    state,
    pressDigit,
    pressOperator,
    pressEquals,
    pressPercent,
    pressToggleSign,
    pressBackspace,
    pressClear,
    restoreFromHistory,
  };
}
