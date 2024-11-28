import * as Location from 'expo-location';
import { getLocales } from 'expo-localization';

const getLocale = () => {
  const deviceLanguage = getLocales()[0].languageTag ?? 'en-US';
  return deviceLanguage;
};

const getCountry = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return address.country ?? 'usa';
  } catch (error) {
    console.error(error);
  }
};

export { getCountry, getLocale };
