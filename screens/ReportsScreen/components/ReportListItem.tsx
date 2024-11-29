import { Link } from 'expo-router';
import { Heart, Save, Share } from 'lucide-react-native';
import React from 'react';
import { Pressable, View, Text, I18nManager } from 'react-native';
import ImageSlider from './ImageSlider';
import { ListItem } from '~/screens/ReportsScreen/reports';
import { formatDate } from '~/utils/time';

function ReportListItem({ item, index, onPressHeart, isFavorite }: ListItem) {
  const { id, name: title, created_at: date, viewCount, pics } = item;

  // Force RTL for the entire app
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
        <View className="flex-row justify-end gap-4">
          {/* Heart button - moved to the left side in RTL */}
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onPressHeart(id);
            }}
            className="rounded-full bg-gray-50 p-3"
            hitSlop={8}
            style={{
              shadowColor: isFavorite ? '#ef4444' : '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <Heart
              size={24}
              color={isFavorite ? '#ef4444' : '#9ca3af'}
              fill={isFavorite ? '#ef4444' : 'none'}
            />
          </Pressable>

          {/* Content */}
          <View className="flex-1">
            <Text className="mb-2 text-right text-lg font-bold text-gray-900" numberOfLines={2}>
              {title}
            </Text>
            <Text className="text-right text-base text-gray-600">{viewCount || 0} views</Text>
            <Text className="text-right text-sm text-amber-700">{time}</Text>
          </View>

          {/* Image slider */}
          <View className="h-28 w-20 overflow-hidden rounded-lg">
            <ImageSlider images={pics} />
          </View>

          {/* Index number */}
          <View className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Text className="text-base font-bold text-gray-600">#{index + 1}</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View className="mt-3 flex-row justify-end gap-3">
          <Share size={20} color="grey" />
          <Save size={20} color="grey" />
        </View>
      </Pressable>
    </Link>
  );
}

export default ReportListItem;
