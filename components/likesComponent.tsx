import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { typography, fontSize } from '~/consts/theme';

interface Props {
  likes: number;
}

export default function LikesComponent({ likes }: Props) {
  return (
    <View className="flex-3 flex-row justify-end gap-1">
      <Feather name="heart" size={20} color="red" />
      <Text
        className="text-right uppercase"
        style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
        {likes}
      </Text>
    </View>
  );
}
