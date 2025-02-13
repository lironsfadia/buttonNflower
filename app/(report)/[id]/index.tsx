import Feather from '@expo/vector-icons/Feather';
import { Link, Stack } from 'expo-router';
import { View, Text, Pressable, ActivityIndicator, I18nManager } from 'react-native';
import { STACK } from '~/consts/stack';
import { typography, fontSize } from '~/consts/theme';

import useReport from '~/screens/ReportScreen/hooks/useReport';
import ImageSlider from '~/screens/ReportsScreen/components/ImageSlider';

function ReportScreen() {
  const { report, onLike, loading, time, plants, reporter } = useReport();
  const { username } = reporter ?? '';

  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  const { name, content, pics, userId, likeCount } = report || {};

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!report) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text
          className="text-lg font-bold"
          style={{ fontFamily: typography.bold, fontSize: fontSize.lg }}>
          Report not found
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 flex-col gap-7 bg-white p-5">
        <Stack.Screen
          options={{
            title: 'Report',
            headerBackTitleVisible: false,
            headerTintColor: STACK.HEADER_TINT_COLOR,
          }}
        />
        <View className="flex-3 px-2">
          <ImageSlider images={pics} />
        </View>

        <View className="flex-row gap-0 px-4">
          <View className="w-full flex-1 items-start">
            {/* <Image className="aspect-video w-full" source={{ uri: image_uri }} /> */}
            <Text
              className="mt-1 text-right"
              style={{ fontFamily: typography.bold, fontSize: fontSize.xxl }}
              numberOfLines={2}>
              {name}
            </Text>

            <Link href={`/(user)/${userId}`} className="mt-1 text-lg font-extrabold text-green-600">
              <Text
                className="text-right uppercase"
                style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
                {username}
              </Text>
            </Link>
            <Text
              className="text-right uppercase text-amber-700"
              style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
              {time}
            </Text>
            <Text
              className="w-full text-left"
              style={{
                fontFamily: typography.regular,
                fontSize: fontSize.md,
                writingDirection: 'rtl',
              }}>
              {content}
            </Text>
          </View>

          <View className="flex-3 flex-row gap-1">
            <Feather name="heart" size={20} color="red" />
            <Text
              className="text-right uppercase"
              style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
              {likeCount}
            </Text>
          </View>
        </View>

        <View className="flex-2 items-start px-4">
          <Text
            className="text-right"
            style={{ fontFamily: typography.bold, fontSize: fontSize.lg }}>
            הפרחים שנצפו:
          </Text>
          {plants?.map(({ id, name }) => (
            <View className="flex-row items-center justify-between" key={id}>
              <Link href={`/(plant)/${id}`} className="mt-1 text-lg  font-extrabold text-green-600">
                <Text
                  style={{ fontFamily: typography.bold, fontSize: fontSize.md }}
                  className="text-right">
                  {name}
                </Text>
              </Link>
            </View>
          ))}
        </View>
      </View>

      <View className="border-grey-100 absolute bottom-1 left-0 right-0 flex-1 flex-row items-center justify-between border-t-2 bg-white p-5">
        <Text className="p-3 text-xl font-semibold">Free</Text>
        {true ? (
          <>
            <Text
              className="text-right text-green-600"
              style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
              You Are Attending!
            </Text>
            {/* <Link
              href={`/(report)/${id}/attendance`}
              className="mt-1 text-lg  font-extrabold text-green-600">
              View Attendees
            </Link> */}
          </>
        ) : (
          <Pressable onPress={onLike} className="rounded-md bg-red-400 p-5">
            <Text
              className="text-white"
              style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
              Join and RSVP
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

export default ReportScreen;
