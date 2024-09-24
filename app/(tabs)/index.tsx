import { FlatList, I18nManager } from 'react-native';
import reports from '../../assets/mock_data/reports.json';
import ReportListItem from '~/components/Reports/ReportListItem';
import { Stack } from 'expo-router';
import useReports from '~/hooks/useReports';

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

export default function Reports() {
  const { reports } = useReports();
  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return (
    <>
      <Stack.Screen options={{ title: 'Flowering Today' }} />
      <FlatList
        className="bg-white"
        data={reports}
        renderItem={({ item }: ListItem) => {
          return <ReportListItem item={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
