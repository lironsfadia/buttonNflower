import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { typography, fontSize } from '~/consts/theme';
import { Plant } from '~/types/db';
import { supabase } from '~/utils/supabase';

const PlantScreen = () => {
  //which reports it were recently
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('plants').select('*').eq('id', id);

        setPlant(data ? data[0] : null);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };

    fetchPlant();
  }, [id]);

  return (
    <View className="flex-1 bg-white p-5">
      <Text style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>Plant Screen {id}</Text>
      <Text style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
        {JSON.stringify(plant)}
      </Text>
    </View>
  );
};

export default PlantScreen;
