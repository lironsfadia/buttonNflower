import { PostgrestError } from '@supabase/supabase-js';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { I18nManager, Alert } from 'react-native';

import { Plant } from '../PlantsScreen/types';

import { useAuth } from '~/contexts/authProvider';
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
    console.log('createReport', imageUrl);
    setLoading(true);
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
          plant_ids: plantIds,
          seen_at: date.toISOString(),
          user_id: user?.id,
          pics: [imageUrl],
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
  };
}

export default useCreateReport;
