import Feather from '@expo/vector-icons/Feather';
import { Link, Stack } from 'expo-router';
import { View, Text, Pressable, ActivityIndicator, I18nManager } from 'react-native';

import useReport from '~/screens/ReportScreen/hooks/useReport';
import ImageSlider from '~/screens/ReportsScreen/components/ImageSlider';

function CreateReportScreen() {
  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return <View className="flex-col gap-7" />;
}

export default CreateReportScreen;
