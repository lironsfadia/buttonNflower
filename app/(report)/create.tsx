import { Stack } from 'expo-router';
import React from 'react';
import { Text, View, I18nManager, TextInput, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { STACK } from '~/consts/stack';
import { typography, fontSize, textStyles } from '~/consts/theme';
import useCreateReport from '~/screens/CreateReportScreen/useCreateReport';
import CustomDropdown from '~/ui/DropdownBox';

function CreateReport() {
  const {
    name,
    setName,
    content,
    setContent,
    setOpen,
    open,
    loading,
    plants,
    itemsCount,
    setItemsCount,
    handleSelect,
    date,
    setDate,
    createReport,
  } = useCreateReport();

  // Force RTL for the entire app
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return (
    <View className="flex-1 flex-col gap-3 bg-white p-5">
      <Stack.Screen
        options={{
          title: 'דיווח פריחה חדש',
          headerBackTitleVisible: false,
          headerTintColor: STACK.HEADER_TINT_COLOR,
        }}
      />
      <Text className="text-left" style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
        ספר מה ראית:
      </Text>
      <TextInput className={textStyles} value={name} onChangeText={setName} placeholder="שם" />
      <TextInput
        className={`${textStyles} min-h-32`}
        placeholder="תוכן דיווח"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={3}
      />

      <Text
        className="rounded-md border-2 border-gray-300 p-3 text-left"
        onPress={() => setOpen(true)}>
        {date.toLocaleString()}
      </Text>
      <DatePicker
        modal
        open={open}
        date={date}
        maximumDate={new Date()}
        minuteInterval={15}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TextInput
        className="rounded-md border-2 border-gray-300 p-3 text-right"
        placeholder="כמות פריטים"
        value={itemsCount}
        onChangeText={setItemsCount}
      />
      <CustomDropdown
        data={plants}
        defaultValue="בחר פרח"
        onSelect={handleSelect}
        textStyles="rounded-md border-2 border-gray-300 p-3"
      />

      <Pressable
        className="mt-auto items-center rounded-md border-2 bg-blue-500 p-5 px-8"
        onPress={() => createReport()}
        disabled={loading}>
        <Text className="text-white" style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
          שמור
        </Text>
      </Pressable>
    </View>
  );
}

export default CreateReport;
