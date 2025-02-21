import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { DataCache } from '~/data/DataCache';
import { useListConfig } from '~/hooks/useListConfig';
import ReportListItem from '~/screens/ReportsScreen/components/ReportListItem';
import { FavoriteFloweringReport, FloweringReport } from '~/screens/ReportsScreen/reports';
import { supabase } from '~/utils/supabase';

export const useWatchlistReports = () => {
  const { keyExtractor, getItemLayout, renderFooter, renderSeparator } = useListConfig();
  const [favorites, setFavorites] = useState<FavoriteFloweringReport[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const isFocused = useIsFocused();

  const cache = useMemo(() => DataCache.getInstance(), []);
  const [watchlist, setWatchlist] = useState<FloweringReport[]>([]);

  const renderItem = useCallback(
    ({ item, index }: { item: FloweringReport; index: number }) => (
      <ReportListItem item={item} index={index} />
    ),
    []
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase.from('favorites').select('*');
        if (error) {
          throw new Error(error.message);
        }
        setFavorites(data || []);
      } catch (e: unknown) {
        setError(e);
      }
    };
    fetchFavorites();
  }, [isFocused]);

  useEffect(() => {
    const reports = cache.getAll();

    const filtered = reports.filter((report) =>
      favorites.some((favorite) => favorite.report_id === report.id)
    );
    setWatchlist(filtered);
  }, [favorites]);

  return {
    keyExtractor,
    renderItem,
    watchlist,
    getItemLayout,
    renderFooter,
    renderSeparator,
    error,
  };
};
