import React from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, Platform, SafeAreaView,
} from 'react-native';
import { getTypeColor, formatId, formatName, getPrimaryBg } from '../utils/pokemonUtils';

function StatBar({ label, value, color }) {
  const pct = Math.min((value / 255) * 100, 100);
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statBarBg}>
        <View style={[styles.statBarFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function DetailScreen({ pokemon, onBack }) {
  const bg      = getPrimaryBg(pokemon.types);
  const primary = getTypeColor(pokemon.types[0]);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bg }]}>
      <View style={[styles.topBar, { backgroundColor: primary }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.topId}>{formatId(pokemon.id)}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.hero, { backgroundColor: primary }]}>
          <Text style={styles.heroName}>{formatName(pokemon.name)}</Text>
          <View style={styles.typeBadges}>
            {pokemon.types.map((t) => (
              <View key={t} style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{t}</Text>
              </View>
            ))}
          </View>
          <Image source={{ uri: pokemon.image }} style={styles.heroImage} resizeMode="contain" />
        </View>

        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Info Fisik</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
                <Text style={styles.infoKey}>Tinggi</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
                <Text style={styles.infoKey}>Berat</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{pokemon.baseExperience ?? '—'}</Text>
                <Text style={styles.infoKey}>Base EXP</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kemampuan</Text>
            <View style={styles.abilityRow}>
              {pokemon.abilities.map((a) => (
                <View key={a} style={[styles.abilityBadge, { borderColor: primary }]}>
                  <Text style={[styles.abilityText, { color: primary }]}>{formatName(a)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Base Stats</Text>
            <StatBar label="HP"  value={pokemon.stats.hp}      color={primary} />
            <StatBar label="ATK" value={pokemon.stats.attack}   color={primary} />
            <StatBar label="DEF" value={pokemon.stats.defense}  color={primary} />
            <StatBar label="SPD" value={pokemon.stats.speed}    color={primary} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 36 : 12,
    paddingBottom: 8, paddingHorizontal: 16,
  },
  backBtn: { padding: 8 },
  backIcon: { fontSize: 16, color: '#fff', fontWeight: '700' },
  topId: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  scrollContent: { paddingBottom: 32 },
  hero: {
    alignItems: 'center', paddingTop: 8, paddingBottom: 32,
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
  },
  heroName: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: 0.5, marginBottom: 8 },
  typeBadges: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeBadge: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 16, paddingVertical: 5, borderRadius: 20 },
  typeBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700', textTransform: 'capitalize' },
  heroImage: { width: 180, height: 180 },
  cards: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 14, fontWeight: '800', color: '#1a1a2e',
    marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  infoItem: { alignItems: 'center', flex: 1 },
  infoValue: { fontSize: 18, fontWeight: '800', color: '#1a1a2e' },
  infoKey: { fontSize: 12, color: '#999', marginTop: 4, fontWeight: '600' },
  divider: { width: 1, height: 36, backgroundColor: '#eee' },
  abilityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  abilityBadge: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  abilityText: { fontSize: 13, fontWeight: '600', textTransform: 'capitalize' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  statLabel: { width: 36, fontSize: 12, fontWeight: '700', color: '#888' },
  statValue: { width: 28, fontSize: 13, fontWeight: '700', color: '#1a1a2e', textAlign: 'right' },
  statBarBg: { flex: 1, height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' },
  statBarFill: { height: '100%', borderRadius: 4 },
});