import { Link, Redirect, Tabs } from 'expo-router';
import { Button, Platform } from 'react-native';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

import { TABS } from '~/consts/tabs';
import { useAuth } from '~/contexts/authProvider';
import { supabase } from '~/utils/supabase';
import { SCREENS } from '~/consts/screens';

export default function TabLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Platform.select({
          ios: TABS.ACTIVE_TINT_COLOR.IOS,
          android: TABS.ACTIVE_TINT_COLOR.ANDROID,
          default: TABS.ACTIVE_TINT_COLOR.IOS,
        }),

        headerRight: () => <Button onPress={() => supabase.auth.signOut()} title="Sign out" />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: SCREENS.SCREEN_NAMES.FLOWERING_REPORTS,
          title: TABS.TAB_NAMES.SEARCH,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="flower" color={color} focused={focused} />
          ),
          headerRight: () => (
            <Link href="/profile" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: TABS.TAB_NAMES.FAVORITES,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="star" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
