import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ImageProps } from './types';

const Image = ({
  uri,
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
}: ImageProps) => (
  <FastImage
    style={styles.image}
    source={{
      uri: uri ?? 'https://unsplash.it/400/400?image=1',
      priority,
    }}
    resizeMode={resizeMode}
  />
);
const styles = StyleSheet.create({
  image: {
    width: '40%',
    aspectRatio: 1,
  },
});
export default Image;
