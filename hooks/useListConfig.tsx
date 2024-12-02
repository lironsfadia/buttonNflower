import { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { SCREENS } from '~/consts/screens';
import { FloweringReport } from '~/screens/ReportsScreen/reports';

export interface UseListConfigProps {
  onHeartPress: (floweringReport: FloweringReport) => void;
  isFavorite?: (floweringReportId: number) => boolean;
}

export const useListConfig = (hasMoreData: boolean = false) => {
  const keyExtractor = useCallback((item: FloweringReport) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (data: ArrayLike<FloweringReport> | null | undefined, index: number) => ({
      length: SCREENS.LIST.ITEM_HEIGHT,
      offset: SCREENS.LIST.ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderFooter = useCallback(
    (loading: boolean) =>
      loading && hasMoreData ? (
        <View className="items-center justify-center py-4">
          <ActivityIndicator size="small" />
        </View>
      ) : null,
    []
  );

  const renderSeparator = useCallback(() => <View className="my-4 h-[1px] bg-gray-800" />, []);

  return {
    keyExtractor,
    getItemLayout,
    renderFooter,
    renderSeparator,
  };
};
