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
  }, []);

  useEffect(() => {
    const reports = cache.getAll();
    console.log(reports.map((report) => report.id));
    console.log(favorites.map((favorite) => favorite));
    const filtered = reports.filter((report) =>
      favorites.some((favorite) => favorite.report_id === report.id)
    );
    console.log({filtered})
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
