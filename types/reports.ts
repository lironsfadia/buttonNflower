interface Coordinates {
  lat: number;
  lng: number;
}

interface FloweringReport {
  id: number;
  name: string;
  content: string;
  plantIds: number[];
  userId: number;
  created_at: string;
  viewCount: number;
  likeCount: number;
  status: 'מאושר' | 'ממתין לאישור' | 'נדחה';
  longitude: number;
  latitude: number;
  itemsCount: number;
  pics: string[];
}

interface ListItem {
  item: FloweringReport;
}
