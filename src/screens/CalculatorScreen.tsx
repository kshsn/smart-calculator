import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Display from '../components/Display';
import ButtonGrid from '../components/ButtonGrid';
import HistoryPanel from '../components/HistoryPanel';
import { useCalculator } from '../hooks/useCalculator';

export default function CalculatorScreen() {
  const [historyVisible, setHistoryVisible] = useState(false);
  const {
    state,
    pressDigit,
    pressOperator,
    pressEquals,
    pressPercent,
    pressToggleSign,
    pressBackspace,
    pressClear,
    restoreFromHistory,
  } = useCalculator();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      <View style={styles.container}>
        {/* Display — takes all remaining space above buttons */}
        <Display
          value={state.display}
          expression={state.expression}
          activeOperator={state.operator}
          onHistoryPress={() => setHistoryVisible(true)}
        />

        {/* Button grid */}
        <ButtonGrid
          activeOperator={state.operator}
          onDigit={pressDigit}
          onOperator={pressOperator}
          onEquals={pressEquals}
          onPercent={pressPercent}
          onToggleSign={pressToggleSign}
          onBackspace={pressBackspace}
          onClear={pressClear}
        />

        {/* History slide-up panel */}
        <HistoryPanel
          visible={historyVisible}
          onClose={() => setHistoryVisible(false)}
          onRestore={(val) => {
            restoreFromHistory(val);
            setHistoryVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'flex-end',
  },
});
