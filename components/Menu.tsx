import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { typography, fontSize } from '~/consts/theme';

const { width } = Dimensions.get('window');

const ScrollMenu = ({
  items,
  onSelect,
  activeColor = '#3b82f6', // blue-500 equivalent
  textActiveColor = '#ffffff', // white equivalent
  textInactiveColor = '#1f2937', // gray-800 equivalent
  initialIndex = 0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const scrollRef = useRef(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    // Scroll to make the selected item visible
    const itemWidth = 100; // Approximation of item width
    const scrollPosition = index * itemWidth - width / 3;
    scrollRef.current?.scrollTo({ x: Math.max(0, scrollPosition), animated: true });

    if (onSelect) {
      onSelect(items[index], index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemButton,
              {
                backgroundColor: selectedIndex === index ? activeColor : 'transparent',
              },
            ]}
            onPress={() => handleSelect(index)}>
            <Text
              style={[
                { fontFamily: typography.bold, fontSize: fontSize.lg },
                styles.itemText,
                {
                  color: selectedIndex === index ? textActiveColor : textInactiveColor,
                },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48, // h-12 equivalent
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gray-200 equivalent
  },
  scrollView: {
    paddingHorizontal: 8, // px-2 equivalent
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  itemButton: {
    marginHorizontal: 4, // mx-1 equivalent
    marginVertical: 4, // my-1 equivalent
    borderRadius: 9999, // rounded-full equivalent
    paddingHorizontal: 16, // px-4 equivalent
    paddingVertical: 8, // py-2 equivalent
  },
  itemText: {
    fontSize: 16, // text-base equivalent
    fontWeight: '500', // font-medium equivalent
  },
});

export default ScrollMenu;
