import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2';
const LIMIT = 151;

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPokemon = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const listRes = await fetch(`${BASE_URL}/pokemon?limit=${LIMIT}&offset=0`);
      if (!listRes.ok) throw new Error(`HTTP error! status: ${listRes.status}`);
      const listData = await listRes.json();

      const batchSize = 20;
      const results = [];

      for (let i = 0; i < listData.results.length; i += batchSize) {
        const batch = listData.results.slice(i, i + batchSize);
        const batchDetails = await Promise.all(
          batch.map(async (p) => {
            const res = await fetch(p.url);
            if (!res.ok) throw new Error(`Failed to fetch ${p.name}`);
            const data = await res.json();
            return {
              id: data.id,
              name: data.name,
              image:
                data.sprites.other['official-artwork'].front_default ||
                data.sprites.front_default,
              types: data.types.map((t) => t.type.name),
              stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
              },
              height: data.height,
              weight: data.weight,
              abilities: data.abilities.map((a) => a.ability.name),
              baseExperience: data.base_experience,
            };
          })
        );
        results.push(...batchDetails);
      }

      setAllPokemon(results);
    } catch (err) {
      setError(err.message || 'Gagal memuat data Pokemon. Periksa koneksi internet kamu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const refresh = useCallback(() => {
    fetchPokemon(true);
  }, [fetchPokemon]);

  const retry = useCallback(() => {
    fetchPokemon(false);
  }, [fetchPokemon]);

  return { allPokemon, loading, error, refreshing, refresh, retry };
}