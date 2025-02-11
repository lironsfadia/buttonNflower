import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import FadingText from './components/FadingText';
import { getGreeting } from './utils';

import { useAuth } from '~/contexts/authProvider';

function SplashScreen() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greeting = getGreeting();
    if (user) {
      setGreeting(`${greeting}, ${user.email}`);
    } else {
      setGreeting(greeting);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FadingText text={greeting} duration={2000} style={styles.content} repeat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
});

export default SplashScreen;
