import { Stack } from 'expo-router';
import React from 'react';
import { Text, View, I18nManager, TextInput, Pressable, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';

import AddressAutoComplete from '~/components/AddressAutocomplete';
import Avatar from '~/components/Avatar';
import { STACK } from '~/consts/stack';
import { typography, fontSize, textStyles } from '~/consts/theme';
import useCreateReport from '~/screens/CreateReportScreen/useCreateReport';
import CustomDropdown from '~/ui/DropdownBox';

function CreateReport() {
  const {
    name,
    handleName,
    handleImage,
    handleContent,
    handleItemsCount,
    content,
    setOpen,
    open,
    loading,
    plants,
    itemsCount,
    handleSelect,
    date,
    setDate,
    createReport,
    imageUrl,
    setLocation,
    validateField,
    displayErrors,
    submitButtonText,
    selectPlant,
  } = useCreateReport();

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-5 bg-white p-5">
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
      <View className="items-center">
        <Avatar size={200} url={imageUrl} onUpload={handleImage} bucketName="report_imgs" />
      </View>
      <TextInput className={textStyles} value={name} onChangeText={handleName} placeholder="שם" />
      <TextInput
        className={`${textStyles} min-h-32`}
        placeholder="תוכן דיווח"
        value={content}
        onChangeText={handleContent}
        multiline
        maxLength={500}
        numberOfLines={3}
      />
      <Text
        className={textStyles}
        onPress={() => setOpen(true)}
        style={{ fontFamily: typography.regular, fontSize: fontSize.sm }}>
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
        className={textStyles}
        placeholder="כמות פריטים"
        value={itemsCount ?? '0'}
        onChangeText={handleItemsCount}
      />
      <AddressAutoComplete onSelect={setLocation} onBlur={validateField} />
      <CustomDropdown
        data={plants}
        defaultValue={selectPlant}
        onSelect={handleSelect}
        textStyles="rounded-md border-2 border-gray-300 p-3"
      />
      <Pressable
        className="mt-5 items-center rounded-md border-2 bg-blue-500 p-5 px-8"
        onPress={() => createReport()}>
        <Text className="text-white" style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>
          {submitButtonText}
        </Text>
      </Pressable>

      <View className="mt-2 rounded-md border border-red-300 bg-red-50 p-3">
        {displayErrors.map((value) => (
          <Text
            key={value.split(' ')[0]}
            className="text-left text-sm text-red-500"
            style={{ fontFamily: typography.bold, fontSize: fontSize.md }}>{`${value}\n`}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export default CreateReport;
