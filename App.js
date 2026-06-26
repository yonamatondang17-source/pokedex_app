import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#E3350D" />
      {selectedPokemon ? (
        <DetailScreen
          pokemon={selectedPokemon}
          onBack={() => setSelectedPokemon(null)}
        />
      ) : (
        <HomeScreen onSelectPokemon={setSelectedPokemon} />
      )}
    </SafeAreaProvider>
  );
}
