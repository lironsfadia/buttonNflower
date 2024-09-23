import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { Link, Stack } from 'expo-router';
import useReport from '~/hooks/useReport';
import ImageSlider from '~/components/Reports/ImageSlider';

function EventScreen() {
  const { report, onLike, loading, time } = useReport();
  const { id, reportName, reportDate, reportContent, freePics } = report || {};

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  if (!report) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Report not found</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-col gap-7 align-middle">
        <Stack.Screen
          options={{ title: 'Report', headerBackTitleVisible: false, headerTintColor: 'black' }}
        />
        <View className="flex-3">
          <ImageSlider images={freePics} />
        </View>

        <View className="flex-2">
          {/* <Image className="aspect-video w-full" source={{ uri: image_uri }} /> */}
          <Text className="mt-1 text-3xl font-bold" numberOfLines={2}>
            {reportName}
          </Text>
          <Text className="text-lg font-semibold uppercase text-amber-700">{time}</Text>
          <Text className="mt-1 text-lg">{reportContent}</Text>
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
