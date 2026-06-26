export const TYPE_COLORS = {
  normal:   '#A8A878',
  fire:     '#F08030',
  water:    '#6890F0',
  electric: '#F8D030',
  grass:    '#78C850',
  ice:      '#98D8D8',
  fighting: '#C03028',
  poison:   '#A040A0',
  ground:   '#E0C068',
  flying:   '#A890F0',
  psychic:  '#F85888',
  bug:      '#A8B820',
  rock:     '#B8A038',
  ghost:    '#705898',
  dragon:   '#7038F8',
  dark:     '#705848',
  steel:    '#B8B8D0',
  fairy:    '#EE99AC',
};

export const TYPE_BG = {
  normal:   '#F5F5F0',
  fire:     '#FFF3E0',
  water:    '#E8F0FE',
  electric: '#FFFDE7',
  grass:    '#E8F5E9',
  ice:      '#E0F7FA',
  fighting: '#FCE4EC',
  poison:   '#F3E5F5',
  ground:   '#FFF8E1',
  flying:   '#EDE7F6',
  psychic:  '#FCE4EC',
  bug:      '#F9FBE7',
  rock:     '#F5F5F5',
  ghost:    '#EDE7F6',
  dragon:   '#EDE7F6',
  dark:     '#EFEBE9',
  steel:    '#FAFAFA',
  fairy:    '#FCE4EC',
};

export function getTypeColor(type) {
  return TYPE_COLORS[type] || '#A8A878';
}

export function getPrimaryBg(types) {
  return TYPE_BG[types?.[0]] || '#F5F5F5';
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}

export const ALL_TYPES = [
  'all', 'fire', 'water', 'grass', 'electric', 'psychic',
  'normal', 'fighting', 'flying', 'poison', 'ground',
  'rock', 'bug', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'fairy',
];