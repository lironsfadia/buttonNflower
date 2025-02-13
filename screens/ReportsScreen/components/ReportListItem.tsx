import { Link } from 'expo-router';
import { Heart, Save, Share } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, View, Text, I18nManager } from 'react-native';

import ImageSlider from './ImageSlider';
import useReportListItem from '../hooks/useReportListItem';

import { SCREENS } from '~/consts/screens';
import { ListItem } from '~/screens/ReportsScreen/reports';
import { formatDate } from '~/utils/time';
import { typography, fontSize } from '~/consts/theme';

const ReportListItem = memo(
  ({ item, index }: ListItem) => {
    const { id, name: title, created_at: date, viewCount, pics } = item;
    const { isFavorite, toggleFavorite } = useReportListItem(id);
    React.useEffect(() => {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }, []);

    const time = formatDate(date);

    return (
      <Link
        href={{
          pathname: '/(report)/[id]',
          params: { id },
        }}
        asChild>
        <Pressable
          className="mb-4 flex-1 overflow-hidden rounded-xl bg-white p-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}>
          <View className="flex-row justify-end gap-2">
            {/* Index number */}
            <View className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Text
                className="text-left text-base text-gray-600"
                style={{ fontFamily: typography.bold, fontSize: fontSize.lg }}>
                #{index + 1}
              </Text>
            </View>

            {/* Content */}
            <View className="flex-1">
              <Text
                className="mb-2 text-left text-gray-900"
                numberOfLines={2}
                style={{ fontFamily: typography.bold, fontSize: fontSize.lg }}>
                {title}
              </Text>
              <Text
                className="text-left text-base text-gray-600"
                style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
                {viewCount || 0} views
              </Text>
              <Text
                className="text-left text-amber-700"
                style={{ fontFamily: typography.regular, fontSize: fontSize.sm }}>
                {time}
              </Text>
            </View>

            {/* Action buttons */}
            <View className="flex-row items-end justify-end gap-3">
              <Share size={20} color="grey" />
              <Save size={20} color="grey" />
            </View>
            {/* Image slider */}
            <View className="h-28 w-20 overflow-hidden rounded-lg">
              <ImageSlider images={pics} />
            </View>
            <Pressable
              onPress={toggleFavorite}
              className="rounded-full bg-gray-50 p-3"
              hitSlop={8}
              style={{
                shadowColor: isFavorite
                  ? SCREENS.FAVORITES.ICON_COLORS.FILLED
                  : SCREENS.FAVORITES.ICON_COLORS.UNFILLED,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <Heart
                size={24}
                color={
                  isFavorite
                    ? SCREENS.FAVORITES.ICON_COLORS.FILLED
                    : SCREENS.FAVORITES.ICON_COLORS.UNFILLED
                }
                fill={isFavorite ? '#ef4444' : 'none'}
              />
            </Pressable>
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
