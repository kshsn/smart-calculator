import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Operator } from '../hooks/useCalculator';

interface DisplayProps {
  value: string;
  expression: string;
  activeOperator: Operator;
  onHistoryPress: () => void;
}

function getFontSize(value: string): number {
  if (value.length <= 6) return 80;
  if (value.length <= 9) return 60;
  if (value.length <= 12) return 44;
  return 32;
}

export default function Display({ value, expression, activeOperator, onHistoryPress }: DisplayProps) {
  const isError = value === 'Error';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.historyBtn} onPress={onHistoryPress} hitSlop={16}>
        <Text style={styles.historyIcon}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.expression} numberOfLines={1}>
        {expression}
      </Text>

      <Text
        style={[
          styles.value,
          { fontSize: getFontSize(value) },
          isError && styles.errorText,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#1C1C1E',
  },
  historyBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
  },
  historyIcon: {
    color: '#636366',
    fontSize: 24,
  },
  expression: {
    color: '#636366',
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 4,
    minHeight: 24,
  },
  value: {
    color: '#FFFFFF',
    fontWeight: '300',
    textAlign: 'right',
  },
  errorText: {
    color: '#FF453A',
  },
});
