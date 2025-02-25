import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

import { HeaderButton } from '~/components/HeaderButton';
import { STACK } from '~/consts/stack';
import { TABS } from '~/consts/tabs';

export default function ReportsTabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTintColor: STACK.HEADER_TINT_COLOR,
          headerRight: () => (
            <Link href="/(tabs)/reports/map">
              <Ionicons name="globe-outline" size={24} color="black" />
            </Link>
          ),
          headerLeft: () => (
            <Link href="/profile" asChild>
              <HeaderButton />
            </Link>
          ),
          title: 'דיווחי פריחה',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
