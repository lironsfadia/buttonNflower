interface Coordinates {
  lat: number;
  lng: number;
}

interface FloweringReport {
  id: number;
  reportName: string;
  reportContent: string;
  plantIds: number[];
  userId: number;
  reportDate: string;
  viewCount: number;
  likeCount: number;
  status: 'approved' | 'pending' | 'rejected';
  location: {
    lat: number;
    lng: number;
  };
  itemCount: number;
  freePics: string[];
}

interface ListItem {
  item: FloweringReport;
}
