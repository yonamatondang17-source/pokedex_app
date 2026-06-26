import React, { memo } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { getTypeColor, formatId, formatName, getPrimaryBg } from '../utils/pokemonUtils';

function PokemonCard({ pokemon, onPress }) {
  const bgColor = getPrimaryBg(pokemon.types);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor }]}
      onPress={() => onPress(pokemon)}
      activeOpacity={0.75}
    >
      <Text style={styles.number}>{formatId(pokemon.id)}</Text>

      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.name} numberOfLines={1}>
        {formatName(pokemon.name)}
      </Text>

      <View style={styles.typesRow}>
        {pokemon.types.map((type) => (
          <View
            key={type}
            style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}
          >
            <Text style={styles.typeText}>{type}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  number: {
    alignSelf: 'flex-end',
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.35)',
    marginBottom: 2,
  },
  image: {
    width: 90,
    height: 90,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
    marginTop: 6,
    marginBottom: 6,
    textAlign: 'center',
  },
  typesRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default memo(PokemonCard);