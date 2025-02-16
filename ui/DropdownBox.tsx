import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

import { CustomDropdownProps } from './types';

const CustomDropdown = ({ data, defaultValue, onSelect, textStyles }: CustomDropdownProps) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({ name: defaultValue, id: -1 });
  const isFocused = visible ? 'focused' : '';

  useEffect(() => {
    if (!isFocused) {
      setSelected({ name: defaultValue, id: -1 });
    }
  }, [isFocused]);

  const onItemPress = (item: { name: string; id: number }) => {
    setSelected(item);
    onSelect(item.id);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => onItemPress(item)}>
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} className={textStyles}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{selected.name}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  dropdownButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;
