import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '~/utils/supabase';

const UserScreen = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase.from('profiles').select('*').eq('id', id);

        setUser(data);
        setLoading(false);
      } catch (e: unknown) {
        setError(e);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <View>
      <Text>User Screen {id}</Text>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
};

export default UserScreen;
