import { nearbyReports } from '~/types/db';

interface Coordinates {
  lat: number;
  lng: number;
}

type Status = 'מאושר' | 'ממתין לאישור' | 'נדחה';

interface FavoriteFloweringReport {
  report_id: number;
  created_at: string;
}

type nearbyReport = nearbyReports[number];

interface ListItem {
  item: nearbyReport;
  index: number;
}

export { ListItem, Coordinates, FavoriteFloweringReport, Status };
