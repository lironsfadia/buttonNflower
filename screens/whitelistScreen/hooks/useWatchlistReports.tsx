import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useCallback, useMemo } from 'react';

import { DataCache } from '~/data/DataCache';
import { useListConfig } from '~/hooks/useListConfig';
import ReportListItem from '~/screens/ReportsScreen/components/ReportListItem';
import { FloweringReport } from '~/screens/ReportsScreen/reports';

export const useWatchlistReports = () => {
  const isFocused = useIsFocused();
  const { keyExtractor, getItemLayout, renderFooter, renderSeparator } = useListConfig();

  const [favoriteUpdate, setFavoriteUpdate] = useState(0);

  const cache = useMemo(() => DataCache.getInstance(), []);
  const [whitelist, setWhitelist] = useState<FloweringReport[]>([]);

  useEffect(() => {
    const data = cache.getWatchlist();
    setWhitelist(data);
  }, [isFocused, favoriteUpdate]);

  const handleHeartPress = useCallback((report: FloweringReport) => {
    cache.deleteWhitelistItem(report);
    setFavoriteUpdate((prev) => prev + 1);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: FloweringReport; index: number }) => (
      <ReportListItem
        item={item}
        index={index}
        onPressHeart={() => handleHeartPress(item)}
        isFavorite={cache.getWatchlistItem(item.id) !== null}
      />
    ),
    [cache, favoriteUpdate]
  );

  return { keyExtractor, renderItem, whitelist, getItemLayout, renderFooter, renderSeparator };
};

