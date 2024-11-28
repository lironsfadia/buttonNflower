import { LucideIcon } from 'lucide-react-native';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  name: string;
}

interface TabIcons {
  [key: string]: LucideIcon;
}

export { TabBarIconProps, TabIcons };
