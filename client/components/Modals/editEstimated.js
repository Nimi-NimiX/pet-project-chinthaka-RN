import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import budget from '../../APIs/budget';
import Store from '../../store/Store';
import * as constants from '../../constants';

const MonthYearPicker = (props) => {
  const [estimated, setEstimated] = useState('');
  const [saving, setSaving] = useState(false);
  const store = Store.useContainer();

  useEffect(() => {
    setEstimated(`${props.estimated}`);
  }, [props.estimated, props.visible]);

  handleSave = () => {
    setSaving(true);
    // do not call api if estimated is not changed
    if (estimated === props.estimated) {
      props.hideModal();
      setSaving(false);
      return;
    }

    // else call api to update estimated budget
    budget
      .set(store.budgetId, estimated)
      .then((res) => {
        if (res) {
          store.setBudget(res.budget);
          props.hideModal();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setSaving(false);
      });
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
            Set Estimated Budget {'\n'}
            {constants.months[store.month]} {store.year}
          </Text>
          <TextInput
            mode="outlined"
            label={'Estimated Budget'}
            value={estimated}
            onChangeText={setEstimated}
            style={{ width: 300 }}
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button
              style={styles.btn}
              mode="contained"
              loading={saving}
              onPress={handleSave}
            >
              Save
            </Button>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={props.hideModal}
            >
              Cancel
            </Button>
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
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
  btn: {
    width: 100,
  },
});

export default MonthYearPicker;
