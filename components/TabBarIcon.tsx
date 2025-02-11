import { TABS } from 'consts/tabs';
import { Code, Flower, Star } from 'lucide-react-native';
import { useMemo } from 'react';

import { TabBarIconProps, TabIcons } from './types';

const icons: TabIcons = {
  star: Star,
  flower: Flower,
  code: Code,
};

export const TabBarIcon = ({ name, color, focused }: TabBarIconProps) => {
  const Icon = icons[name];

  const styles = useMemo(
    () => `mb-[-3px] ${focused ? TABS.OPACITY.ACTIVE : TABS.OPACITY.INACTIVE}`,
    [focused]
  );

  return <Icon size={TABS.ICON_SIZE} className={styles} color={color} />;
};
