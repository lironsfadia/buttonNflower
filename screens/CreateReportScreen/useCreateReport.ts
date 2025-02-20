import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Plant } from '../PlantsScreen/types';

import { useAuth } from '~/contexts/authProvider';
import { GeoJSONResponse } from '~/types/adressAutocomplete';
import { supabase } from '~/utils/supabase';

function useCreateReport() {
  const { user } = useAuth();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [itemsCount, setItemsCount] = useState<string>('0');
  const [plantIds, setPlantIds] = useState<number[]>([]);
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [plants, setPlants] = useState<Partial<Plant>[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [location, setLocation] = useState<GeoJSONResponse | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      const { data: plants, error } = await supabase.from('plants').select('id,name');
      if (error) {
        Alert.alert('Error: ', error.message);
      } else {
        setPlants(plants || []);
      }
      setLoading(false);
    };

    fetchPlants();
  }, []);

  const createReport = async () => {
    setLoading(true);

    const lat = location?.features[0].geometry.coordinates[1];
    const long = location?.features[0].geometry.coordinates[0];
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          name,
          view_count: 0,
          like_count: 0,
          status: 'ממתין לאישור',
          items_count: Number(itemsCount),
          content,
          location: location?.features[0].properties.name,
          plant_ids: plantIds,
          seen_at: date.toISOString(),
          user_id: user?.id,
          pics: [imageUrl],
          location_point: `POINT(${long} ${lat})`, //long lat
        },
      ])
      .select()
      .single();

    const { error: flowerReportError } = await supabase
      .from('flower_report_plants')
      .insert([
        {
          report_id: data?.id,
          plant_id: plantIds[0],
        },
      ])
      .select()
      .select();

    if (error || flowerReportError) {
      Alert.alert('Something bad occours...', error?.message || flowerReportError?.message);
    } else {
      setName('');
      setContent('');
      setItemsCount('0');
      setPlantIds([]);
      setImageUrl('');
      setDate(new Date());

      router.push(`/(report)/${data.id}`);
    }

    setLoading(false);
  };

  const handleSelect = useCallback(
    (itemId: number) => {
      console.log('handleSelect', itemId);
      setPlantIds([...plantIds, itemId]);
    },
    [plantIds]
  );

  return {
    open,
    setOpen,
    name,
    setName,
    itemsCount,
    setItemsCount,
    plantIds,
    setPlantIds,
    content,
    setContent,
    date,
    setDate,
    loading,
    plants,
    handleSelect,
    createReport,
    setImageUrl,
    imageUrl,
    setLocation,
  };
}

export default useCreateReport;
