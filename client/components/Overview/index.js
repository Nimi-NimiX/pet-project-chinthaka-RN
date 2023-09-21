import { StyleSheet, View } from 'react-native';
import Card from './cardComponent';
import EditEstimated from '../Modals/editEstimated';
import Store from '../../store/Store';
import { useState } from 'react';

const Overview = () => {
  const store = Store.useContainer();
  const budget = store.budget;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ width: '45%' }}>
            <Card amount={budget.income} title="Income" />
          </View>
          <View style={{ width: '45%' }}>
            <Card amount={budget.expense} title="Expense" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ width: '45%' }}>
            <Card amount={budget.balance} title="Balance" />
          </View>
          <View style={{ width: '45%' }}>
            <Card
              amount={budget.estimatedBudget}
              title="Estimated Budget"
              editable
              onEdit={() => setVisible(true)}
            />
          </View>
        </View>
      </View>
      <EditEstimated
        visible={visible}
        hideModal={() => setVisible(false)}
        estimated={budget.estimatedBudget}
      />
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
});
