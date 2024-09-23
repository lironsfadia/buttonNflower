import { Stack, Link } from 'expo-router';
import React from 'react';
import { Pressable, View, Text, Image, I18nManager } from 'react-native';
import { formatDate } from '~/utils/time';
import Feather from '@expo/vector-icons/Feather';
import ImageSlider from './ImageSlider';

function ReportListItem({ item }: ListItem) {
  const {
    id,
    reportName: title,
    plantIds,
    userId,
    reportDate: date,
    viewCount,
    likeCount,
    status,
    location,
    itemCount,
    freePics,
  } = item;

  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  console.log(item);

  const time = formatDate(date);
  return (
    <View className="flex-col p-3">
      <View className="flex-3">
        <ImageSlider images={freePics} />
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
                <Feather name="thumbs-up" size={20} color="grey" />
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
