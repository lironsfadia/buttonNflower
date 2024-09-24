import { View, Text, Image, Pressable, ActivityIndicator, I18nManager } from 'react-native';
import { Link, Stack } from 'expo-router';
import useReport from '~/hooks/useReport';
import ImageSlider from '~/components/Reports/ImageSlider';
import Feather from '@expo/vector-icons/Feather';

function EventScreen() {
  const { report, onLike, loading, time, plants, reporter } = useReport();

  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  const { id, name, created_at, content, pics, plantIds, userId, likeCount } = report || {};

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!report) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Report not found</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-col gap-7">
        <Stack.Screen
          options={{ title: 'Report', headerBackTitleVisible: false, headerTintColor: 'black' }}
        />
        <View className="flex-3 px-2">
          <ImageSlider images={pics} />
        </View>

        <View className="flex-row gap-0 px-4">
          <View className="flex-1 items-start">
            {/* <Image className="aspect-video w-full" source={{ uri: image_uri }} /> */}
            <Text className="mt-1 text-xl font-bold" numberOfLines={2}>
              {name}
            </Text>
            <Text className="text-lg font-semibold uppercase">{reporter.username}</Text>
            <Text className="text-lg font-semibold uppercase text-amber-700">{time}</Text>
            <Text className="text-md text-right">{content}</Text>
          </View>

          <View className="flex-3 flex-row gap-1">
            <Feather name="heart" size={20} color="grey" />
            <Text className="text-lg font-semibold uppercase">{likeCount}</Text>
          </View>
        </View>

        <View className="flex-2 items-start px-4">
          <Text className="text-right text-2xl font-bold">הפרחים שנצפו:</Text>
          {plants?.map(({ id, name }) => (
            <View className="flex-row items-center justify-between" key={id}>
              <Link href={`/(plant)/${id}`} className="mt-1 text-lg  font-extrabold text-green-600">
                <Text className="text-lg font-bold">{name}</Text>
              </Link>
            </View>
          ))}
        </View>
      </View>

      <View className="border-grey-100 absolute bottom-1 left-0 right-0 flex-1 flex-row items-center justify-between border-t-2 bg-white p-5">
        <Text className="p-3 text-xl font-semibold">Free</Text>
        {true ? (
          <>
            <Text className="font-bold text-green-600">You Are Attending!</Text>
            <Link
              href={`/(report)/${id}/attendance`}
              className="mt-1 text-lg  font-extrabold text-green-600">
              View Attendees
            </Link>
          </>
        ) : (
          <Pressable onPress={onLike} className="rounded-md bg-red-400 p-5">
            <Text className="font-bold text-white">Join and RSVP</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

export default EventScreen;
