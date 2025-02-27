import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const EditButton = () => (
  <View style={{ transform: [{ scaleX: -1 }] }}>
    <Ionicons name="pencil" size={24} color="#007AFF" />
  </View>
);

export default EditButton;
