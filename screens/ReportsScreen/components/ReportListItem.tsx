import { Link } from 'expo-router';
import { Heart, Save, Share } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, View, Text } from 'react-native';

//import ImageSlider from './ImageSlider';
import useReportListItem from '../hooks/useReportListItem';

import SupaImage from '~/components/SupaImage';
import { SCREENS } from '~/consts/screens';
import { typography, fontSize } from '~/consts/theme';
import { ListItem } from '~/screens/ReportsScreen/reports';
import { formatFullDate } from '~/utils/time';

const ReportListItem = memo(
  ({ item }: ListItem) => {
    const {
      id,
      name: title,
      created_at: date,
      items_count: itemCount,
      pics,
      like_count,
      view_count: viewsCount,
      dist_meters,
      location,
    } = item;
    const { isFavorite, toggleFavorite } = useReportListItem(id);

    const time = formatFullDate(date);

    return (
      <Link
        href={{
          pathname: '/(report)/[id]',
          params: { id },
        }}
        asChild>
        <Pressable
          className="mb-4 flex-1 overflow-hidden rounded-xl bg-white p-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}>
          <View className="flex-row items-start justify-end">
            <View className="flex-1">
              <Text
                className="text-left text-amber-700"
                style={{ fontFamily: typography.regular, fontSize: fontSize.sm }}>
                {time}
              </Text>
              <Text
                className="mb-2 text-left text-gray-900"
                numberOfLines={2}
                style={{ fontFamily: typography.bold, fontSize: fontSize.lg }}>
                {title}
              </Text>
              <Text
                className="text-left text-base text-gray-600"
                style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
                {location}
              </Text>
              <Text
                className="text-left text-base text-gray-600"
                style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
                {viewsCount || 0} views ● {Math.round(Number(dist_meters) / 1000)} ק״מ ממך
              </Text>
            </View>

            <View className="flex-1 flex-col items-start gap-2">
              <SupaImage
                bucketName="report_imgs"
                path={pics?.[0]}
                className="aspect-video w-2/5 rounded-xl"
                height={90}
              />

              <View className="w-full flex-row items-center justify-between">
                <Pressable
                  onPress={toggleFavorite}
                  className="rounded-full bg-gray-50/80 p-2"
                  hitSlop={8}>
                  <Heart
                    size={20}
                    color={
                      isFavorite
                        ? SCREENS.FAVORITES.ICON_COLORS.FILLED
                        : SCREENS.FAVORITES.ICON_COLORS.UNFILLED
                    }
                    fill={isFavorite ? '#ef4444' : 'none'}
                  />
                </Pressable>
                <View className="flex-row items-center gap-2">
                  <Pressable className="p-1" hitSlop={8}>
                    <Share size={20} color="grey" />
                  </Pressable>
                  <Pressable className="p-1" hitSlop={8}>
                    <Save size={20} color="grey" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.index === nextProps.index &&
      prevProps.isFavorite === nextProps.isFavorite
    );
  }
);

export default ReportListItem;
