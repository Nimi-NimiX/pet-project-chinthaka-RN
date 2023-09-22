import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Store from '../../store/Store';
import transaction from '../../APIs/transaction';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator, TextInput } from 'react-native-paper';

const AddTransaction = (props) => {
  const store = Store.useContainer();
  const categories = store.categories;
  const [filteredCategories, setFilteredCategories] = useState([]);

  //states for form
  const [editing, setEditing] = useState(false); // to show loading indicator
  const [form, setForm] = useState({
    amount: '',
    categoryId: '',
    remarks: '',
  });

  // set form values when modal is opened
  useEffect(() => {
    setForm({
      amount: `${props.transaction.amount}`,
      categoryId: props.transaction.categoryId,
      remarks: props.transaction.remarks,
    });

    // filter categories based on transaction type
    const filteredCategories = categories.filter(
      (category) => category.categoryType === props.transaction.type
    );
    setFilteredCategories(filteredCategories);
  }, [props.transaction]);

  // add transaction function
  const transactionEdit = () => {
    setEditing(true);
    transaction
      .edit(props.transaction.id, form)
      .then((res) => {
        if (res) {
          props.hideModal();
          store.updateTransaction(res.transaction);
        }
      })
      .finally(() => setEditing(false));
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
            Edit Transaction ID : {props.transaction.id}
          </Text>

          {/* form */}

          {/* amount */}
          <TextInput
            label={'Amount'}
            style={{ width: 200 }}
            mode="outlined"
            keyboardType="numeric"
            value={form.amount}
            onChangeText={(text) => setForm({ ...form, amount: text })}
          />

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
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.hideModal()}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => transactionEdit()}
              disabled={editing}
            >
              {editing ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Text>Save</Text>
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
