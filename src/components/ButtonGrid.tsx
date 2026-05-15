import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalcButton, { ButtonVariant } from './CalcButton';
import { Operator } from '../hooks/useCalculator';

interface ButtonGridProps {
  activeOperator: Operator;
  onDigit: (d: string) => void;
  onOperator: (op: Operator) => void;
  onEquals: () => void;
  onPercent: () => void;
  onToggleSign: () => void;
  onBackspace: () => void;
  onClear: () => void;
}

interface BtnDef {
  label: string;
  variant: ButtonVariant;
  action: () => void;
  wide?: boolean;
  key: string;
}

export default function ButtonGrid({
  activeOperator, onDigit, onOperator,
  onEquals, onPercent, onToggleSign, onBackspace, onClear,
}: ButtonGridProps) {

  const rows: BtnDef[][] = [
    // Row 1 — functions
    [
      { key:'ac',    label:'AC',   variant:'function', action: onClear },
      { key:'sign',  label:'+/−',  variant:'function', action: onToggleSign },
      { key:'pct',   label:'%',    variant:'function', action: onPercent },
      { key:'div',   label:'÷',    variant:'operator', action: () => onOperator('÷') },
    ],
    // Row 2
    [
      { key:'7', label:'7', variant:'number', action: () => onDigit('7') },
      { key:'8', label:'8', variant:'number', action: () => onDigit('8') },
      { key:'9', label:'9', variant:'number', action: () => onDigit('9') },
      { key:'mul', label:'×', variant:'operator', action: () => onOperator('×') },
    ],
    // Row 3
    [
      { key:'4', label:'4', variant:'number', action: () => onDigit('4') },
      { key:'5', label:'5', variant:'number', action: () => onDigit('5') },
      { key:'6', label:'6', variant:'number', action: () => onDigit('6') },
      { key:'sub', label:'−', variant:'operator', action: () => onOperator('−') },
    ],
    // Row 4
    [
      { key:'1', label:'1', variant:'number', action: () => onDigit('1') },
      { key:'2', label:'2', variant:'number', action: () => onDigit('2') },
      { key:'3', label:'3', variant:'number', action: () => onDigit('3') },
      { key:'add', label:'+', variant:'operator', action: () => onOperator('+') },
    ],
    // Row 5 — 0 is wide
    [
      { key:'0',   label:'0', variant:'number',   action: () => onDigit('0'), wide: true },
      { key:'dot', label:'.', variant:'number',   action: () => onDigit('.') },
      { key:'eq',  label:'=', variant:'operator', action: onEquals },
    ],
  ];

  return (
    <View style={styles.grid}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map(btn => (
            <CalcButton
              key={btn.key}
              label={btn.label}
              variant={btn.variant}
              wide={btn.wide}
              isActive={activeOperator !== null && btn.label === activeOperator}
              onPress={btn.action}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 13,
    paddingBottom: 28,
    gap: 12,
    backgroundColor: '#1C1C1E',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
