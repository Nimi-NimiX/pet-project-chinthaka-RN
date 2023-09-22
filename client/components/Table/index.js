import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Store from '../../store/Store';
import DataTable from './table';

const Table = () => {
  const store = Store.useContainer();
  const transactions = store.transactions;
  const categories = store.categories;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Transactions</Text>

        <DataTable transactions={transactions} categories={categories} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    margin: 10,
  },
});

export default Table;
