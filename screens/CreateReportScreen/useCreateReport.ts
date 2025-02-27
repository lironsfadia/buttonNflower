import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { FormErrors, FormField } from './types';
import { Plant } from '../PlantsScreen/types';

import { useAuth } from '~/contexts/authProvider';
import { GeoJSONResponse } from '~/types/adressAutocomplete';
import { supabase } from '~/utils/supabase';

const FORM_FIELDS_COUNT = 6;

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [displayErrors, setDisplayErrors] = useState<string[]>([]);

  const validators = {
    name: (value: string) =>
      value.length > 2 && value.length < 50 && value.match(/^[a-zA-Zא-ת\s]*$/)
        ? null
        : 'שם לא תקין',
    content: (value: string) => (value.length > 2 && value.length < 501 ? null : 'תוכן לא תקין'),
    itemsCount: (value: string) =>
      Number(value) > 0 && Number(value) < 100 ? null : 'כמות פריטים לא תקינה',
    plantIds: (value: number[]) => (value.length > 0 ? null : 'צמח לא נבחר'),
    imageUrl: (value: string) => (value.length > 0 ? null : 'תמונה לא נבחרה'),
    location: (value: GeoJSONResponse) => (value !== null ? null : 'מיקום לא נבחר'),
    date: (value: Date) => (value instanceof Date ? null : 'תאריך לא תקין'),
  };

  const validateField = useCallback(
    (fieldName: FormField, value: string | number | number[] | GeoJSONResponse) => {
      if (!validators[fieldName]) return;
      const error = validators[fieldName](value);

      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    [name, content, itemsCount, plantIds, imageUrl, location]
  );

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
    const areAllFieldsFill = Object.values(errors).length === FORM_FIELDS_COUNT;
    const areAllFieldsValid = Object.values(errors).every((error) => error === null);

    if (!areAllFieldsFill || !areAllFieldsValid) {
      if (!areAllFieldsFill) {
        setDisplayErrors(['אנא מלא את כל השדות']);
      } else {
        setDisplayErrors(Object.values(errors).filter((value) => value !== null));
      }
      return;
    }
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
      setDisplayErrors([]);
      setLocation(null);
      setErrors({});

      router.push(`/(report)/${data.id}`);
    }

    setLoading(false);
  };

  const handleSelect = useCallback(
    (itemId: number) => {
      setPlantIds([itemId]);
      validateField('plantIds', [itemId]);
    },
    [plantIds]
  );

  const handleName = (value: string) => {
    setName(value);
    validateField('name', value);
  };

  const handleImage = (url: string) => {
    setImageUrl(url);
    validateField('imageUrl', url);
  };

  const handleContent = (value: string) => {
    setContent(value);
    validateField('content', value);
  }

  const handleItemsCount = (value: string) => {
    setItemsCount(value);
    validateField('itemsCount', value)
  }

  return {
    open,
    setOpen,
    name,
    handleName,
    handleImage,
    handleContent,
    handleItemsCount,
    itemsCount,
    plantIds,
    setPlantIds,
    content,
    date,
    setDate,
    loading,
    plants,
    handleSelect,
    createReport,
    setImageUrl,
    imageUrl,
    setLocation,
    validateField,
    displayErrors,
  };
}

export default useCreateReport;
