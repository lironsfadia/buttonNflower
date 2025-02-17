import { Report } from '~/types/db';

interface Coordinates {
  lat: number;
  lng: number;
}

type Status = 'מאושר' | 'ממתין לאישור' | 'נדחה';

interface FavoriteFloweringReport {
  report_id: number;
  created_at: string;
}

interface ListItem {
  item: Report;
  index: number;
}

export { ListItem, Coordinates, FavoriteFloweringReport, Status };
