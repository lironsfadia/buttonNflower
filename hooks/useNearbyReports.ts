import { PostgrestError } from '@supabase/supabase-js';
import * as Location from 'expo-location';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { useListConfig } from './useListConfig';

import { PAGE_SIZE } from '~/consts/screens';
import { DataCache } from '~/data/DataCache';
import { getLocale, getCountry } from '~/screens/ReportsScreen/utils';
import { nearbyReports } from '~/types/db';
import { supabase } from '~/utils/supabase';

export const useNearbyReports = () => {
  const [reports, setReports] = useState<nearbyReports[] | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  const cache = useMemo(() => DataCache.getInstance(), []);
  const { keyExtractor, getItemLayout, renderFooter, renderSeparator } = useListConfig(hasNextPage);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyEvents();
    }
    if (isInitialized) {
      //fetchNextPage();
    }
  }, [isInitialized, location]);

  const fetchNearbyEvents = async () => {
    if (!location) {
      return;
    }

    const { data, error } = await supabase.rpc('nearby_reports', {
      lat: location?.coords.latitude || 32.0853,
      long: location?.coords.longitude || 34.82577946183203,
    });

    if (data) {
      setReports(data);
    }
  };

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasNextPage || !isInitialized) return;

    setLoading(true);
    setError(null);

    try {
      const cachedData = cache.get(page);
      if (cachedData && Array.isArray(cachedData)) {
        setReports((prev) => {
          try {
            return [...(prev || []), ...cachedData];
          } catch (err) {
            console.error('State update error:', err);
            return prev;
          }
        });
        setPage((prev) => prev + 1);
        setHasNextPage(cachedData.length >= PAGE_SIZE);
        return;
      }

      const newReports = await fetchReports(page);
      if (newReports && Array.isArray(newReports)) {
        cache.set(page, newReports);
        setReports((prev) => {
          try {
            return [...(prev || []), ...newReports];
          } catch (err) {
            console.error('State update error:', err);
            return prev;
          }
        });
        setPage((prev) => prev + 1);
        setHasNextPage(newReports.length >= PAGE_SIZE);
      }
    } catch (err) {
      setError(err as PostgrestError);

      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasNextPage, language, country, isInitialized]);

  useEffect(() => {
    const init = async () => {
      try {
        setLanguage(getLocale());
        const countryData = await getCountry();
        if (countryData) {
          setCountry(countryData);
        }
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing:', err);
        setError({ message: 'Failed to initialize app settings' } as PostgrestError);
      }
    };
    init();
  }, []);

  return { reports, fetchNextPage, keyExtractor, getItemLayout, renderFooter, renderSeparator };
};
