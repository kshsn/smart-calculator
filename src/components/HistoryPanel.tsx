import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, Alert, Modal,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withTiming, Easing, runOnJS,
} from 'react-native-reanimated';
import { HistoryEntry, loadHistory, clearHistory } from '../utils/history';

interface HistoryPanelProps {
  visible: boolean;
  onClose: () => void;
  onRestore: (value: string) => void;
}

export default function HistoryPanel({ visible, onClose, onRestore }: HistoryPanelProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const translateY = useSharedValue(600);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      loadHistory().then(setEntries);
      translateY.value = withTiming(0, { duration: 280, easing: Easing.out(Easing.cubic) });
    } else {
      translateY.value = withTiming(600, { duration: 240, easing: Easing.in(Easing.cubic) });
    }
  }, [visible]);

  const handleRestore = useCallback((entry: HistoryEntry) => {
    onRestore(entry.result);
    onClose();
  }, [onRestore, onClose]);

  const handleClear = useCallback(() => {
    Alert.alert('Clear history?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear', style: 'destructive', onPress: async () => {
          await clearHistory();
          setEntries([]);
        }
      },
    ]);
  }, []);

  if (!visible && translateY.value === 600) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      {/* Dim overlay */}
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />

      {/* Slide-up panel */}
      <Animated.View style={[styles.panel, panelStyle]}>
        {/* Handle bar */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          {entries.length > 0 && (
            <TouchableOpacity onPress={handleClear} hitSlop={12}>
              <Text style={styles.clearBtn}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Entries */}
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.entry} onPress={() => handleRestore(item)}>
                <Text style={styles.entryExpr}>{item.expression}</Text>
                <View style={styles.divider} />
              </TouchableOpacity>
            )}
          />
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: '#222224',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
  },
  handle: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#48484A',
    alignSelf: 'center',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  clearBtn: {
    color: '#FF9500',
    fontSize: 16,
  },
  entry: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  entryExpr: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#3A3A3C',
    marginTop: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#636366',
    fontSize: 18,
  },
});
