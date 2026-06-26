import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ query }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔍</Text>
      <Text style={styles.title}>Tidak ditemukan</Text>
      <Text style={styles.desc}>
        Tidak ada Pokemon bernama{'\n'}
        <Text style={styles.query}>"{query}"</Text>
        {'\n'}Coba kata kunci lain.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  query: {
    color: '#E3350D',
    fontWeight: '700',
  },
});