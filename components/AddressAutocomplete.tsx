import { FontAwesome } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { fontSize, textStyles, typography } from '~/consts/theme';
import { useAuth } from '~/contexts/authProvider';
import { GeoJSONResponse, Suggestion } from '~/types/adressAutocomplete';
import { getSuggestions, reteriveDetails } from '~/utils/AddressAutocomplete';

export default function AddressAutoComplete({
  onSelect,
}: {
  onSelect: (location: GeoJSONResponse) => void;
}) {
  // improve can be found them not by distence, by box
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
  const { session } = useAuth();

  const search = async () => {
    const data = await getSuggestions(input, session?.access_token);
    setSuggestions(data.suggestions);
  };

  const disabledSearch = useMemo(() => input.length < 3, [input]);

  const onSuggestionClick = async (suggestion: Suggestion) => {
    onSelect(suggestion);
    setInput(suggestion.name);
    setSuggestions([]);

    const details = await reteriveDetails(suggestion.mapbox_id, session?.access_token);
    onSelect(details);
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between gap-3">
        <TextInput
          placeholder="מיקום"
          className={`${textStyles} flex-1`}
          value={input}
          onChangeText={setInput}
        />
        <FontAwesome
          name="search"
          size={24}
          color={disabledSearch ? 'grey' : 'black'}
          onPress={search}
          disabled={disabledSearch}
        />
      </View>
      <View className="gap-2">
        {suggestions.map((item) => (
          <Pressable
            onPress={() => {
              onSuggestionClick(item);
            }}
            key={item.name}
            className="border-grey-300 border p-2">
            <Text style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>{item.name}</Text>
            <Text style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
              {item.place_formatted}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}
