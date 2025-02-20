interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  place_formatted: string;
  context: object;
  language: string;
  brand: string[];
  external_ids: { federated: string };
}

interface AddressAutoCompleteOutput {
  suggestions: Suggestion[];
}

interface Coordinates {
  longitude: number;
  latitude: number;
  accuracy: string;
}

interface MatchCode {
  address_number: string;
  street: string;
  postcode: string;
  place: string;
  region: string;
  locality: string;
  country: string;
  confidence: string;
}

interface Address {
  mapbox_id: string;
  address_number: string;
  street_name: string;
  name: string;
}

interface Location {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
  region_code?: string;
  region_code_full?: string;
  country_code?: string;
  country_code_alpha_3?: string;
  alternate?: {
    mapbox_id: string;
    name: string;
  };
}

interface Context {
  address: Address;
  street: Pick<Address, 'mapbox_id' | 'name'>;
  neighborhood: Location;
  postcode: Pick<Location, 'mapbox_id' | 'name'>;
  place: Location;
  district: Location;
  region: Location;
  country: Location;
}

interface Feature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    mapbox_id: string;
    feature_type: string;
    name: string;
    coordinates: Coordinates;
    place_formatted: string;
    match_code: MatchCode;
    context: Context;
  };
}

interface GeoJSONResponse {
  type: 'FeatureCollection';
  features: Feature[];
  attribution: string;
}

export { AddressAutoCompleteOutput, GeoJSONResponse, Suggestion };
