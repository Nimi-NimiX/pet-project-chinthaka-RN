import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import * as constants from '../../constants';
import Store from '../../store/Store';
import transaction from '../../APIs/transaction';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper';

const AddTransaction = (props) => {
  const store = Store.useContainer();
  const month = store.month;
  const year = store.year;
  const budgetId = store.budgetId;
  const categories = store.categories;
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [showCaldender, setShowCaldender] = useState(false);

  //states for form
  const [adding, setAdding] = useState(false); // to show loading indicator
  const initialState = {
    type: constants.types.EXPENSE,
    amount: '0',
    date: new Date(),
    categoryId: categories.filter(
      (el) => el.categoryType === constants.types.EXPENSE
    )[0]?.id,
    remarks: '',
  };
  const [form, setForm] = useState({ ...initialState });

  // reset form on modal open
  useEffect(() => {
    setForm({ ...initialState });
  }, [props.visible]);

  // filter categories based on type
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) => category.categoryType === form.type)
    );
  }, [form.type, categories]);

  // hide modal function
  const hideModal = () => {
    props.hideModal();
  };

  // add transaction function
  const transactionAdd = () => {
    setAdding(true);
    transaction
      .add({
        budgetId: budgetId,
        ...form,
      })
      .then((res) => {
        if (res) {
          hideModal();
          store.addTransaction(res.transaction);
        }
      })
      .finally(() => setAdding(false));
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
            Add Transaction for {constants.months[month]} {year}
          </Text>

          {/* form */}

          {/* transaction type */}
          <RadioButton.Group
            value={form.type}
            onValueChange={(value) => setForm({ ...form, type: value })}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <RadioButton.Item
                label="Expense"
                value={constants.types.EXPENSE}
                color="red"
              />
              <RadioButton.Item
                label="Income"
                value={constants.types.INCOME}
                color="green"
              />
            </View>
          </RadioButton.Group>

          {/* amount */}
          <TextInput
            label={'Amount'}
            style={{ width: 200 }}
            mode="outlined"
            keyboardType="numeric"
            value={form.amount}
            onChangeText={(text) => setForm({ ...form, amount: text })}
          />

          {/* date */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              label={'Date'}
              style={{ width: 200 }}
              mode="outlined"
              value={new Date(form.date).toLocaleDateString()}
              onPressIn={() => setShowCaldender(true)}
              showSoftInputOnFocus={false}
            />
            {showCaldender && (
              <DateTimePicker
                value={form.date}
                mode={'date'}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowCaldender(false);
                  setForm({ ...form, date: selectedDate });
                }}
              />
            )}
          </View>

          {/* category */}
          <View style={styles.picker}>
            <Picker
              selectedValue={form.categoryId}
              style={{
                height: 50,
                width: 200,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setForm({ ...form, categoryId: itemValue })
              }
            >
              {filteredCategories.map((category) => (
                <Picker.Item
                  label={category.categoryName}
                  value={category.id}
                  key={category.id}
                />
              ))}
            </Picker>
          </View>

          {/* remarks */}
          <TextInput
            label={'Remarks'}
            style={{ width: 200 }}
            mode="outlined"
            value={form.remarks}
            onChangeText={(text) => setForm({ ...form, remarks: text })}
          />

          {/* action buttons */}
          <View style={{ flexDirection: 'row', gap: 5, marginTop: 25 }}>
            <TouchableOpacity style={styles.button} onPress={hideModal}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => transactionAdd()}
              disabled={adding}
            >
              {adding ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Text onPress={AddTransaction}>Add</Text>
              )}
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
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    width: 100,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  picker: { borderColor: 'black', borderWidth: 0.6, borderRadius: 5 },
});

export default AddTransaction;
