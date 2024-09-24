import React from 'react';
import { Pressable, View, Text, I18nManager } from 'react-native';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

import { formatDate } from '~/utils/time';
import ImageSlider from './ImageSlider';

function ReportListItem({ item }: ListItem) {
  const {
    id,
    name: title,
    plantIds,
    userId,
    created_at: date,
    viewCount,
    likeCount,
    status,
    latitude,
    longitude,
    itemsCount,
    pics,
  } = item;

  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  const time = formatDate(date);
  return (
    <View className="flex-1 flex-col p-3">
      <View className="flex-3">
        <ImageSlider images={pics} />
      </View>
      <View className="flex-3">
        <Link
          href={{
            pathname: '/(report)/[id]',
            params: { id: id },
          }}
          asChild>
          <Pressable className="border-grey-100 m-3 gap-5 border-b pb-3">
            <View className="flex-1 flex-row justify-between px-1">
              <View className="mt-1 flex-col items-start">
                <Text className="text-2xl font-bold" numberOfLines={2}>
                  {title}
                </Text>
                <Text className="text-md text-right font-semibold uppercase text-amber-700">
                  {time}
                </Text>

                <Text className="text-md text-grey-700 text-right">מיקום</Text>
              </View>

              <View className="mt-1 flex-row gap-1 align-middle">
                <Feather name="heart" size={20} color="grey" />
                <Text className="text-md text-grey-700 text-right">{likeCount}</Text>
              </View>

              {/* <Image source={{ uri: image_uri }} className="aspect-video w-2/5 rounded-xl" /> */}
            </View>

            <View className="flex-row gap-3">
              <Feather name="share" size={20} color="grey" />
              <Feather name="save" size={20} color="grey" />
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

export default ReportListItem;
