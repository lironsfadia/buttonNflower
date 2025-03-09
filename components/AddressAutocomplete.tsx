import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { fontSize, textStyles, typography } from '~/consts/theme';
import { useAuth } from '~/contexts/authProvider';
import { FormField } from '~/screens/CreateReportScreen/types';
import { GeoJSONResponse, Suggestion } from '~/types/adressAutocomplete';
import { getSuggestions, reteriveDetails } from '~/utils/AddressAutocomplete';

export default function AddressAutoComplete({
  onSelect,
  onBlur,
  value,
}: {
  onSelect: (location: GeoJSONResponse) => void;
  onBlur?: (fieldName: FormField, value: string | number | number[] | GeoJSONResponse) => void;
  value?: string | number | GeoJSONResponse;
  error?: string | undefined;
}) {
  const isFocused = useIsFocused();

  const { session } = useAuth();

  const [input, setInput] = useState(value?.toString() || '');
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);

  useEffect(() => {
    setInput(value?.toString() || '');
  }, [value]);

  useEffect(() => {
    if (!isFocused) {
      setSuggestions([]);
      setInput('');
    }
  }, [isFocused]);

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
    <View>
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
              onBlur?.('location', item);
            }}
            key={`${item.name}_${Date.now()}`}
            className="border-grey-300 border p-2">
            <Text style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>{item.name}</Text>
            <Text style={{ fontFamily: typography.regular, fontSize: fontSize.md }}>
              {item.place_formatted}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
