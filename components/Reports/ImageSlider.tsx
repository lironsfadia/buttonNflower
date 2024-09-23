import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface ImageSliderProps {
  images: string[] | undefined;
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <Image source={{ uri: images?.[currentIndex] }} className="aspect-video w-5/6 rounded-xl" />
      <View className="absolute inset-0 flex flex-row items-center justify-between p-4">
        <TouchableOpacity onPress={goToPrevious} className="rounded-full bg-white/50 p-2">
          <Feather icon="chevrons-left" color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNext} className="rounded-full bg-white/50 p-2">
          <Feather icon="chevrons-right" color="black" size={24} />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-0 w-5/6 bg-black/20 px-4 py-2">
        <Text className="text-center text-white">
          Image {currentIndex + 1} of {images?.length}
        </Text>
      </View>
    </>
  );
};

export default ImageSlider;
