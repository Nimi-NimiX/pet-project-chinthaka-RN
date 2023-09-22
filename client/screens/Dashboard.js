import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Header from '../components/Header';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Table from '../components/Table';
import Store from '../store/Store';
import budget from '../APIs/budget';

const Dashboard = () => {
  const store = Store.useContainer();
  const budgetId = store.budgetId;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    try {
      budget
        .get(budgetId)
        .then((res) => {
          if (res) {
            store.setBudget(res.budget);
            store.setTransactions(res.budget.Transactions);
          }
        })
        .finally(() => setRefreshing(false));
    } catch (error) {}
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <Overview />
      <Analytics />
      <Table />
    </ScrollView>
  );
};

export default Dashboard;
