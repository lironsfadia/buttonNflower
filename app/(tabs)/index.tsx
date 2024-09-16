import { FlatList } from 'react-native';
import reports from '../../assets/mock_data/reports.json';
import ReportListItem from '~/components/Reports/ReportListItem';

export default function Reports() {
  const listItem = ({ item }) => {
    return <ReportListItem item={item} />;
  };

  return (
    <FlatList
      className="bg-white"
      data={reports}
      renderItem={listItem}
      keyExtractor={(item) => item.id}
    />
  );
}
