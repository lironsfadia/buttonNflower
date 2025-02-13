import { Film } from 'lucide-react-native';
import { SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import { SCREENS } from '~/consts/screens';
import { useWatchlistReports } from '~/screens/whitelistScreen/hooks/useWatchlistReports';

export default function Watchlist() {
  const { keyExtractor, renderItem, watchlist, getItemLayout, renderSeparator, error } =
    useWatchlistReports();

  if (error) {
    return (
      <SafeAreaView className="flex-1 p-2">
        <Text className="text-center font-bold text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white p-5">
      <View className="ios:p-6 android:p-4 mb-6 flex-row justify-start gap-2 border-b border-b-gray-200 bg-white">
        <Film size={SCREENS.ICON_SIZE_LARGE} color="red" />
        <Text className="ml-2 text-2xl font-bold color-red-600">
          {SCREENS.SCREEN_NAMES.WATCHLIST}
        </Text>
      </View>

      <FlatList
        className="flex-1 bg-white"
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={SCREENS.LIST.THRESHOLD}
        ItemSeparatorComponent={renderSeparator}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: SCREENS.STYLES.PADDING,
    gap: SCREENS.STYLES.GAP,
  },
});
