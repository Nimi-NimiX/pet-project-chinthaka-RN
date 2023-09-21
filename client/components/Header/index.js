import { useEffect, useState } from 'react';
import MonthPicker from '../Modals/monthPicker';
import AddTransaction from '../Modals/addTransaction';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import budget from '../../APIs/budget';
import category from '../../APIs/category';
import Store from '../../store/Store';
import { FontAwesome } from '@expo/vector-icons';
import * as constants from '../../constants';

const Header = () => {
  const store = Store.useContainer();
  const budgetId = store.budgetId;

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Get budget and transactions from API for selected month
  useEffect(() => {
    budget.get(budgetId).then((res) => {
      if (res) {
        store.setBudget(res.budget);
        store.setTransactions(res.budget.Transactions);
      }
    });

    return () => {
      store.setBudget({});
      store.setTransactions([]);
    };
  }, [budgetId]);

  // Get categories from API
  useEffect(() => {
    category.get().then((res) => {
      if (res) {
        store.setCategories(res.categories);
      }
    });

    return () => {
      store.setCategories([]);
    };
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Overview for {constants.months[store.month]} {store.year}
        </Text>

        {/* Add Transaction */}
        <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 10 }}
          onPress={() => setShowAddTransaction(true)}
        >
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>

        {/* Select Month */}
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 10 }}
          onPress={() => setShowMonthPicker(true)}
        >
          <FontAwesome name="calendar" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Month Picker */}
      <MonthPicker
        visible={showMonthPicker}
        hideModal={() => setShowMonthPicker(false)}
      />

      {/* Add Transaction */}
      <AddTransaction
        visible={showAddTransaction}
        hideModal={() => setShowAddTransaction(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: 40,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  header: {
    position: 'relative',
    marginTop: 10,
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;
