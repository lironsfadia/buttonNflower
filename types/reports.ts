interface Coordinates {
  lat: number;
  lng: number;
}

interface FloweringReport {
  id: number;
  reportName: string;
  plantIds: number[];
  userId: number;
  reportDate: string;
  viewCount: number;
  likeCount: number;
  status: 'approved' | 'pending' | 'rejected';
  location: Coordinates;
  itemCount: number;
  freePics: string[];
}

interface listItem {
  item: FloweringReport;
}
