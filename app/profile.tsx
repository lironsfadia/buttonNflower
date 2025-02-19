import { Stack } from 'expo-router';
import { Pressable, TextInput, View, Text } from 'react-native';

import Avatar from '~/components/Avatar';
import { STACK } from '~/consts/stack';
import { textStyles } from '~/consts/theme';
import { useAuth } from '~/contexts/authProvider';
import useReports from '~/screens/ReportsScreen/hooks/useReports';

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

  const { session } = useAuth();

  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackTitleVisible: false,
          headerTintColor: STACK.HEADER_TINT_COLOR,
        }}
      />

      <View className="items-center">
        <Avatar
          size={200}
          url={avatarUrl}
          bucketName="avatars"
          onUpload={(url: string) => {
            setAvatarUrl(url);
          }}
        />
      </View>

      <TextInput
        editable={false}
        value={session?.user?.email}
        placeholder="email"
        autoCapitalize="none"
        className={textStyles}
      />

      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="user name"
        autoCapitalize="none"
        className={textStyles}
      />

      <TextInput
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="full name"
        autoCapitalize="none"
        className={textStyles}
      />

      <TextInput
        onChangeText={(text) => setWebsite(text)}
        value={website}
        placeholder="website"
        autoCapitalize="none"
        className={textStyles}
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
