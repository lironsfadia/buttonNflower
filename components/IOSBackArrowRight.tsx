import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const IOSBackArrowRight = () => (
  <View style={{ transform: [{ scaleX: -1 }] }}>
    <Ionicons name="chevron-back" size={24} color="#007AFF" />
  </View>
);

export default IOSBackArrowRight;
