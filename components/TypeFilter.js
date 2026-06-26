import React, { memo } from 'react';
import {
  ScrollView, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import { ALL_TYPES, getTypeColor } from '../utils/pokemonUtils';

function TypeFilter({ selectedType, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {ALL_TYPES.map((type) => {
        const isSelected = selectedType === type;
        const color = type === 'all' ? '#E3350D' : getTypeColor(type);

        return (
          <TouchableOpacity
            key={type}
            onPress={() => onSelect(type)}
            style={[
              styles.chip,
              { borderColor: color },
              isSelected && { backgroundColor: color },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {type === 'all' ? '✦ All' : type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    textTransform: 'capitalize',
  },
  labelSelected: {
    color: '#fff',
  },
});

export default memo(TypeFilter);