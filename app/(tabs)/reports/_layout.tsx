import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

export default function ReportsTabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Link href="/(tabs)/reports/map">
              <Ionicons name="globe-outline" size={24} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
