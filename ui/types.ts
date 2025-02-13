import { ResizeMode, Priority } from 'react-native-fast-image';

interface ImageProps {
  uri?: string;
  resizeMode?: ResizeMode;
  priority?: Priority;
}

interface CustomDropdownProps {
  data: any[];
  defaultValue: string;
  onSelect: (id: number) => void;
  textStyles: string;
}

export { ImageProps, CustomDropdownProps };
