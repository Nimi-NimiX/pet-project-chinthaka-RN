import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import * as constants from '../../constants';
import Store from '../../store/Store';

const MonthYearPicker = (props) => {
  const store = Store.useContainer();

  // 10 years before the current year
  const years = Array.from(new Array(10), (val, index) => {
    return new Date().getFullYear() - index;
  });
  const month = store.month;
  const year = store.year;

  const handleMonthSelect = (month) => {
    store.setMonth(month);
  };

  const handleYearSelect = (year) => {
    store.setYear(year);
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={() => {
        props.hideModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Selected : {constants.months[month]} {year}
          </Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {/* Month List */}
            <ScrollView style={styles.list}>
              {constants.months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => handleMonthSelect(index)}
                >
                  <Text>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Year List */}
            <ScrollView style={styles.list}>
              {years.map((year, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => handleYearSelect(year)}
                >
                  <Text>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* ok button */}
          <View style={{ flexDirection: 'row', gap: 5, marginTop: 25 }}>
            <TouchableOpacity style={styles.button} onPress={props.hideModal}>
              <Text>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    height: 300,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    width: '80%',
    maxHeight: 150,
  },
  item: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  button: {
    width: 100,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default MonthYearPicker;
