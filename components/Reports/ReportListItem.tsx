import { Stack, Link } from 'expo-router';
import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { formatDate } from '~/utils/time';
import Feather from '@expo/vector-icons/Feather';
import ImageSlider from './ImageSlider';

function ReportListItem({ item }: FloweringReport) {
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

  console.log(item);

  const time = formatDate(date);
  return (
    <>
      <Stack.Screen options={{ title: 'Report' }} />
      <ImageSlider images={freePics} />
      <Link
        href={{
          pathname: '/report/[id]',
          params: { id: id },
        }}
        asChild>
        <Pressable className="border-grey-100 m-3 gap-5 border-b px-6 pb-3">
          <View className="flex-row">
            <View className="flex-1 gap-2">
              <Text className="text-md font-semibold uppercase text-amber-700">{time}</Text>
              <Text className="text-md mt-1 font-bold" numberOfLines={2}>
                {title}
              </Text>

              {/* <Text className="text-md text-grey-700">{location}</Text> */}
            </View>

            {/* <Image source={{ uri: image_uri }} className="aspect-video w-2/5 rounded-xl" /> */}
          </View>

          <View className="flex-row gap-3">
            <Text className="text-grey-500 mr-auto">{likeCount} Likes</Text>
            <Feather name="share" size={20} color="grey" />
            <Feather name="save" size={20} color="grey" />
          </View>
        </Pressable>
      </Link>
    </>
  );
}

export default ReportListItem;
