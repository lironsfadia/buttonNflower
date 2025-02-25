import {
  MapView,
  Camera,
  LocationPuck,
  setAccessToken,
  ShapeSource,
  CircleLayer,
} from '@rnmapbox/maps';
import { point, featureCollection } from '@turf/helpers';
import { router } from 'expo-router';
import { View } from 'react-native';

import { useNearbyReports } from '~/hooks/useNearbyReports';

setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_DOWNLOADS_TOKEN || '');

export default function ReportsMapView() {
  const { reports } = useNearbyReports();
  const points = reports
    ?.filter((report) => report.long && report.lat)
    .map((report) => point([report.lat, report.long], { report }));

  return (
    <View className="flex-1 bg-red-300">
      <MapView className="h-full w-full flex-1" style={{ height: '100%' }}>
        <Camera
          zoomLevel={12}
          centerCoordinate={[34.7818, 32.0853]}
          followZoomLevel={14}
          followUserLocation
        />
        <LocationPuck puckBearing="heading" puckBearingEnabled pulsing={{ isEnabled: true }} />
        {/* improve  - better points, better theme, cluster*/}
        <ShapeSource
          id="events"
          shape={featureCollection(points)}
          onPress={(report) => {
            router.push(`/(report)/${report.features[0].properties.report.id}`);
          }}>
          {/* Render points */}
          <CircleLayer
            id="events"
            style={{
              circlePitchAlignment: 'map',
              circleColor: '#42E100',
              circleRadius: 10,
              circleOpacity: 1,
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
          {/* <SymbolLayer
            id="events-icons"
            style={{
              iconImage: 'pin',
              iconSize: 0.5,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
            }}
          /> */}
          {/* <Images images={{ pin }} /> */}
        </ShapeSource>
      </MapView>
    </View>
  );
}
