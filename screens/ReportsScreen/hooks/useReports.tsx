import { useIsFocused } from '@react-navigation/native';
import { PostgrestError } from '@supabase/supabase-js';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import ReportListItem from '../components/ReportListItem';
import { getCountry, getLocale } from '../utils';

import { PAGE_SIZE } from '~/consts/screens';
import { useAuth } from '~/contexts/authProvider';
import { DataCache } from '~/data/DataCache';
import { useListConfig } from '~/hooks/useListConfig';
import { nearbyReports, Report } from '~/types/db';
import { supabase } from '~/utils/supabase';

const useReports = () => {
  const isFocused = useIsFocused();

  const [reports, setReports] = useState<nearbyReports[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const { session, user } = useAuth();

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

  useEffect(() => {
    return () => cache.clear();
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const fetchReports = async (pageNumber: number) => {
    try {
      const start = (pageNumber - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      const { data: reports, error } = await supabase.from('reports').select('*').range(start, end);
      if (!reports || !Array.isArray(reports)) {
        throw new Error('Invalid API response format');
      }
      setError(error);
      return reports;
    } catch (err) {
      console.error('fetchReports error:', error);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch reports');
    }
  };

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      console.log('Profile data:', data.avatar_url);
      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: string;
    full_name: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(), // !!!
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id?.toString() || '')
        .select();

      if (error) {
        throw error;
      }

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(`Error!: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

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

  const renderItem = useCallback(
    ({ item, index }: { item: Report; index: number }) => (
      <ReportListItem item={item} index={index} />
    ),
    [cache, isFocused]
  );

  const fetchNearbyEvents = async () => {
    if (!location) {
      return;
    }

    console.log(location?.coords.latitude, location?.coords.longitude);
    const { data, error } = await supabase.rpc('nearby_reports', {
      lat: location?.coords.latitude || 32.0853,
      long: location?.coords.longitude || 34.82577946183203,
    });

    if (data) {
      setReports(data);
    }
  };

  return {
    loading,
    username,
    setUsername,
    fullName,
    setFullName,
    website,
    setWebsite,
    avatarUrl,
    setAvatarUrl,
    updateProfile,
    reports,
    error,
    renderItem,
    keyExtractor,
    onEndReached: fetchNextPage,
    renderFooter,
    renderSeparator,
    getItemLayout,
  };
};

export default useReports;
