interface Coordinates {
  lat: number;
  lng: number;
}

type Status = 'מאושר' | 'ממתין לאישור' | 'נדחה';
interface FloweringReport {
  id: number;
  name: string;
  content: string;
  plantIds: number[];
  userId: number;
  created_at: string;
  viewCount: number;
  likeCount: number;
  status: Status;
  longitude: number;
  latitude: number;
  itemsCount: number;
  pics: string[];
}

interface FavoriteFloweringReport {
  report_id: number;
  created_at: string;
}

interface ListItem {
  item: FloweringReport;
  index: number;
}

export { ListItem, FloweringReport, Coordinates, FavoriteFloweringReport, Status };
