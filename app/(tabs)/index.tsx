import { Flower } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { SCREENS } from '~/consts/screens';
import useReports from '~/screens/ReportsScreen/hooks/useReports';

// by default, show all reports by radius/country sorted by date.
// Add search on the top - .
// search can be by location, date, title, seasons, etc. + reporter names.
// sort by - date, radious, likes, view count, etc.

// add report button. report can be for few flowers. user should add location in the map.
// each report should have: reporter, time, location, reported plants. how many.

// show reports in the user radious

// what should be clickable in each report.
// 1. reporter name - will show his profile.
// 2. time - will show the report.
// 3. location - will show the location in the map.
// 4. reported plants - will show the plants in the report.
// 5. like - will add like to the report.
// 6. share - will share the report.
// 7. save - will save the report.
// 8. report - will report the report.

// REGISTER AND Notification
// user can register to other users or plants that interest him or places.
// if a plant was not reported for a year - user will get notification.
// also, he will get notification on every new report according to the registrations he made.
// user can also get notification on new reports in his radious, when someone did to him like,

// user settings
// user can set the notifications he wants to get. by user, by plant, by location, etc.
// edit/ delete report.
// edit/ delete settings.
// user: name, email, password, location

// add plaent screen

// timeline screen for each plaent, location

// navigation to the plant screen from the report screen.
// navigate to the flower
// focus on the flower - reconize the flower and show the report.
// camaera - label recognition.

export default function Reports() {
  const {
    reports,
    error,
    loading,
    renderItem,
    keyExtractor,
    onEndReached,
    renderFooter,
    renderSeparator,
    getItemLayout,
  } = useReports();
  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  if (error) {
    return (
      <View className="flex-1 justify-center align-middle">
        <Text className="text-lg font-bold text-red-400">{error.message}</Text>
      </View>
    );
  }

  if (loading && reports?.length === 0) {
    return (
      <View className="flex-1 justify-center align-middle">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="ios:p-6 android:p-4 mb-6 flex-row justify-start gap-2 border-b border-b-gray-200 bg-white">
        <Flower size={SCREENS.ICON_SIZE_LARGE} color="green" />
        <Text className="ml-2 text-2xl font-bold color-green-600">רשימת דיווחים</Text>
      </View>

      <FlatList
        className="flex-1 bg-white"
        data={reports}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={SCREENS.LIST.THRESHOLD}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: SCREENS.STYLES.PADDING,
    gap: SCREENS.STYLES.GAP,
  },
});
