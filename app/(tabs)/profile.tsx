import { Pressable, TextInput, View, Text } from 'react-native';
import { Stack } from 'expo-router';

import { useAuth } from '~/contexts/authProvider';
import Avatar from '~/components/Avatar';
import useReports from '~/hooks/useReports';

export default function Home() {
  const {
    loading,
    username,
    setUsername,
    fullName,
    setFullName,
    website,
    setWebsite,
    avatarUrl,
    setAvatarUrl,
    updateProfile,
  } = useReports();

  const { session, user } = useAuth();

  return (
    <View className="flex-1 gap-3 bg-white p-4">
      <Stack.Screen options={{ title: 'Profile' }} />

      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />

      <TextInput
        editable={false}
        value={session?.user?.email}
        placeholder="email"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3 text-gray-500"
      />

      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="user name"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <TextInput
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="full name"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <TextInput
        onChangeText={(text) => setWebsite(text)}
        value={website}
        placeholder="website"
        autoCapitalize={'none'}
        className="rounded-md border-2 border-gray-300 p-3"
      />

      <Pressable
        className="items-center rounded-md border-2 border-blue-400 p-5 px-8"
        onPress={() =>
          updateProfile({ username, website, avatar_url: avatarUrl, full_name: fullName })
        }
        disabled={loading}>
        <Text className="font-bold text-blue-500 ">Save</Text>
      </Pressable>
    </View>
  );
}
