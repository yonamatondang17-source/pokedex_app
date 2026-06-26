import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  TouchableOpacity, StyleSheet, RefreshControl, SafeAreaView,
  Platform,
} from 'react-native';
import { usePokemon } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import TypeFilter from '../components/TypeFilter';
import EmptyState from '../components/EmptyState';

const SORT_OPTIONS = [
  { key: 'id-asc',    label: '# ↑' },
  { key: 'id-desc',   label: '# ↓' },
  { key: 'name-asc',  label: 'A–Z' },
  { key: 'name-desc', label: 'Z–A' },
  { key: 'hp-desc',   label: 'HP ↓' },
];

export default function HomeScreen({ onSelectPokemon }) {
  const { allPokemon, loading, error, refreshing, refresh, retry } = usePokemon();

  const [query, setQuery]           = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortKey, setSortKey]       = useState('id-asc');
  const [showSort, setShowSort]     = useState(false);

  const displayList = useMemo(() => {
    let list = allPokemon;

    if (typeFilter !== 'all') {
      list = list.filter((p) => p.types.includes(typeFilter));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.includes(q) ||
          String(p.id).includes(q) ||
          p.types.some((t) => t.includes(q))
      );
    }

    list = [...list].sort((a, b) => {
      switch (sortKey) {
        case 'id-asc':    return a.id - b.id;
        case 'id-desc':   return b.id - a.id;
        case 'name-asc':  return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'hp-desc':   return b.stats.hp - a.stats.hp;
        default:          return a.id - b.id;
      }
    });

    return list;
  }, [allPokemon, query, typeFilter, sortKey]);

  const renderItem = useCallback(
    ({ item }) => <PokemonCard pokemon={item} onPress={onSelectPokemon} />,
    [onSelectPokemon]
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>Memuat 151 Pokemon Gen 1…</Text>
        <Text style={styles.loadingSubtext}>Mohon tunggu sebentar</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>⚡</Text>
        <Text style={styles.errorTitle}>Gagal Memuat Data</Text>
        <Text style={styles.errorMsg}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={retry}>
          <Text style={styles.retryText}>🔄 Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <Text style={styles.headerSub}>{allPokemon.length} Pokemon Gen 1</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama, nomor, atau tipe…"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[styles.sortBtn, showSort && styles.sortBtnActive]}
          onPress={() => setShowSort((v) => !v)}
        >
          <Text style={styles.sortIcon}>⇅</Text>
        </TouchableOpacity>
      </View>

      {showSort && (
        <View style={styles.sortRow}>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.sortChip,
                sortKey === opt.key && styles.sortChipActive,
              ]}
              onPress={() => { setSortKey(opt.key); setShowSort(false); }}
            >
              <Text
                style={[
                  styles.sortChipText,
                  sortKey === opt.key && styles.sortChipTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TypeFilter selectedType={typeFilter} onSelect={setTypeFilter} />

      <Text style={styles.resultCount}>
        {displayList.length} hasil
        {typeFilter !== 'all' ? ` · tipe ${typeFilter}` : ''}
      </Text>

      <FlatList
        data={displayList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={[
          styles.listContent,
          displayList.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={<EmptyState query={query || typeFilter} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={['#E3350D']}
            tintColor="#E3350D"
          />
        }
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 24,
  },
  header: {
    backgroundColor: '#E3350D',
    paddingTop: Platform.OS === 'android' ? 40 : 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    margin: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
    elevation: 2,
    marginRight: 8,
  },
  sortBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  sortBtnActive: {
    backgroundColor: '#E3350D',
  },
  sortIcon: {
    fontSize: 18,
    color: '#555',
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 6,
  },
  sortChipActive: {
    backgroundColor: '#E3350D',
    borderColor: '#E3350D',
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  sortChipTextActive: {
    color: '#fff',
  },
  resultCount: {
    paddingHorizontal: 18,
    paddingBottom: 4,
    fontSize: 12,
    color: '#aaa',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 6,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 13,
    color: '#888',
  },
  errorEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  errorMsg: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryBtn: {
    backgroundColor: '#E3350D',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 3,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});