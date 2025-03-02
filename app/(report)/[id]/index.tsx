import { Link, Stack } from 'expo-router';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import EditButton from '~/components/EditButton';
import SupaImage from '~/components/SupaImage';
import LikesComponent from '~/components/likesComponent';
import { STACK } from '~/consts/stack';
import { typography, fontSize } from '~/consts/theme';
import useReport from '~/screens/ReportScreen/hooks/useReport';

function ReportScreen() {
  const { report, onLike, loading, fullTime, shortTime, plants, reporter } = useReport();
  const { username } = reporter ?? '';

  const { id, name, content, like_count, pics, user_id, location } = report || {};

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
            title: `דיווח מתאריך ${shortTime}`,
            headerBackTitleVisible: false,
            headerTintColor: STACK.HEADER_TINT_COLOR,
            headerRight: () => (
              <Link
                href={{
                  pathname: '/(report)/create',
                  params: {
                    reportId: id,
                  },
                }}>
                <EditButton />
              </Link>
            ),
          }}
        />

        <View className="flex-row pl-2">
          <View className="w-full flex-1 flex-col items-start gap-3">
            <SupaImage
              bucketName="report_imgs"
              path={pics?.[0]}
              className="aspect-video rounded-xl"
            />
            <View className="w-full flex-row justify-between">
              <View className="flex-col gap-1">
                <Text
                  className="w-full text-left"
                  style={{
                    fontFamily: typography.bold,
                    fontSize: fontSize.xxl,
                    writingDirection: 'rtl',
                  }}
                  numberOfLines={2}>
                  {name}
                </Text>

                <Link
                  href={`/(user)/${user_id}`}
                  className="mt-1 text-lg font-extrabold text-green-600">
                  <Text
                    className="w-full text-left uppercase"
                    style={{
                      fontFamily: typography.bold,
                      fontSize: fontSize.md,
                      writingDirection: 'rtl',
                    }}>
                    {username}
                  </Text>
                </Link>
                <Text
                  className="w-full text-left uppercase"
                  style={{
                    fontFamily: typography.bold,
                    fontSize: fontSize.md,
                    writingDirection: 'rtl',
                  }}>
                  {location}
                </Text>
                <Text
                  className="w-full text-left uppercase text-amber-700"
                  style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
                  {fullTime}
                </Text>
                <Text
                  className="w-full text-left uppercase"
                  style={{
                    fontFamily: typography.regular,
                    fontSize: fontSize.md,
                    writingDirection: 'rtl',
                  }}>
                  {content}
                </Text>
              </View>
              <LikesComponent likes={like_count ?? 0} />
            </View>
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
