import { Redirect, Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { TabBarIcon } from '../../components/TabBarIcon';

import { SCREENS } from '~/consts/screens';
import { TABS } from '~/consts/tabs';
import { useAuth } from '~/contexts/authProvider';

export default function TabLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Platform.select({
          ios: TABS.ACTIVE_TINT_COLOR.IOS,
          android: TABS.ACTIVE_TINT_COLOR.ANDROID,
          default: TABS.ACTIVE_TINT_COLOR.IOS,
        }),
      }}>
      <Tabs.Screen
        name="reports"
        options={{
          tabBarLabel: SCREENS.SCREEN_NAMES.FLOWERING_REPORTS,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="flower" color={color} focused={focused} />
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
