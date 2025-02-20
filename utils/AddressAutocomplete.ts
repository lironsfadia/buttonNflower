import { AddressAutoCompleteOutput, GeoJSONResponse } from '~/types/adressAutocomplete';
const mapboxToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '';

export async function getSuggestions(
  input: string,
  seesionToken: string | undefined
): Promise<AddressAutoCompleteOutput> {
  if (!seesionToken) {
    return { suggestions: [] };
  }

  const response = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${input}&language=en&proximity=-73.990593,40.740121&session_token=${seesionToken}&access_token=${mapboxToken}`
  );
  const json = await response.json();
  return json;
}

export async function reteriveDetails(id: string, sessionToken: string): Promise<GeoJSONResponse> {
  console.log('reteriveDetails');
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?language=en&session_token=${sessionToken}&access_token=${mapboxToken}`
    );
    const json = await response.json();
    console.log('reteriveDetails:', json);
    return json;
  } catch (error) {
    console.error('reteriveDetails error:', error);
    throw new Error('Failed to retrieve details');
  }
}
