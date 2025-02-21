import { useIsFocused } from '@react-navigation/native';
import { PostgrestError } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import ReportListItem from '../components/ReportListItem';

import { useAuth } from '~/contexts/authProvider';
import { DataCache } from '~/data/DataCache';
import { useNearbyReports } from '~/hooks/useNearbyReports';
import { supabase } from '~/utils/supabase';

const useReports = () => {
  const isFocused = useIsFocused();
  const { reports, fetchNextPage, keyExtractor, getItemLayout, renderFooter, renderSeparator } =
    useNearbyReports();

  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { session, user } = useAuth();

  const cache = useMemo(() => DataCache.getInstance(), []);

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

  const renderItem = useCallback(
    ({ item, index }: { item: Report; index: number }) => (
      <ReportListItem item={item} index={index} />
    ),
    [cache, isFocused]
  );

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
