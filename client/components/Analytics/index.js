import { StyleSheet, View } from 'react-native';
import PieChartExample from './pieChart';
import Store from '../../store/Store';
import calculate from './calculation';

const Analytics = () => {
  const store = Store.useContainer();
  const transactions = store.transactions || [];
  const Categories = store.categories || [];

  return (
    <>
      <View style={styles.container}>
        <PieChartExample data={calculate(transactions, Categories)} />
      </View>
    </>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
});
