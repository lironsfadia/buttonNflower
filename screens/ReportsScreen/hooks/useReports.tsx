import { useIsFocused } from '@react-navigation/native';
import { PostgrestError } from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { getCountry, getLocale } from '../utils';

import { PAGE_SIZE } from '~/consts/list';
import { useAuth } from '~/contexts/authProvider';
import { DataCache } from '~/data/DataCache';
import { FloweringReport } from '~/screens/ReportsScreen/reports';
import { supabase } from '~/utils/supabase';
import ReportListItem from '../components/ReportListItem';

const useReports = () => {
  const isFocused = useIsFocused();

  const [reports, setReports] = useState<FloweringReport[] | null>([]);
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
  const [favoriteUpdate, setFavoriteUpdate] = useState(0);

  const { session, user } = useAuth();

  const cache = DataCache.getInstance();

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

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

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
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(`Error!: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleHeartPress = useCallback(
    (report: FloweringReport) => {
      if (!cache.getWhitelistItem(report.id)) {
        cache.setWhitelistItem(report);
      } else {
        cache.removeWhitelistItem(report.id);
      }
      setFavoriteUpdate((prev) => prev - 1);
    },
    [reports]
  );

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

      console.error('Error fetching movies:', err);
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

  useEffect(() => {
    if (isInitialized) {
      fetchNextPage();
    }
  }, [isInitialized]);

  useEffect(() => {
    return () => cache.clear();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: FloweringReport; index: number }) => (
      <ReportListItem
        item={item}
        index={index}
        onPressHeart={() => handleHeartPress(item)}
        isFavorite={cache.getWhitelistItem(item.id) !== null}
      />
    ),
    [cache, isFocused, favoriteUpdate]
  );

  const keyExtractor = useCallback((item: FloweringReport) => item.id.toString(), []);

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View className="items-center justify-center py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  }, [loading]);

  const renderSeparator = useCallback(() => <View className="my-4 h-[4px] bg-gray-800" />, []);

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
  };
};

export default useReports;
