import React, { useEffect, useState } from 'react';
import * as constants from '../../constants';
import { StyleSheet, Text } from 'react-native';
import { Chip, DataTable } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import EditTransactionModel from '../Modals/editTransaction';
import transaction from '../../APIs/transaction';
import Store from '../../store/Store';

const Table = ({ transactions, categories }) => {
  const store = Store.useContainer();
  const [items, setItems] = useState(transactions);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [editModel, setEditModel] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});

  // trim the transactions array to the current page
  useEffect(() => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(transactions && transactions.slice(startIndex, endIndex));
    setTotalPages(
      Math.ceil(transactions && transactions.length / itemsPerPage)
    );
  }, [page, itemsPerPage, transactions]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleDelete = (id) => {
    transaction
      .delete(id)
      .then((res) => {
        if (res) {
          store.deleteTransaction(id);
        }
      })
      .finally(() => {});
  };

  const handleEdit = (id) => {
    setEditTransaction(
      transactions.find((transaction) => transaction.id === id)
    );
    setEditModel(true);
  };

  const TypeGetter = (type) => {
    if (type === constants.types.INCOME) {
      return <Chip style={{ backgroundColor: '#79eb6c' }}>Income</Chip>;
    } else {
      return <Chip style={{ backgroundColor: '#eb6c6c' }}>Expense</Chip>;
    }
  };

  const CategoryGetter = (categoryId) => {
    return (
      categories.find((category) => category.id === categoryId)?.categoryName ||
      ''
    );
  };

  const ActionButton = ({ icon, onPress }) => (
    <FontAwesome name={icon} size={25} color="black" />
  );

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.tableAmount}>Amount</DataTable.Title>
          <DataTable.Title style={styles.tableType}>Type</DataTable.Title>
          <DataTable.Title style={styles.tableCategory}>
            Category
          </DataTable.Title>
          <DataTable.Title style={styles.tableButton}></DataTable.Title>
          <DataTable.Title style={styles.tableButton}></DataTable.Title>
        </DataTable.Header>
        {items &&
          items.map((transaction, index) => {
            return (
              <DataTable.Row key={transaction.id}>
                {/* Amount */}
                <DataTable.Cell style={styles.tableAmount}>
                  {transaction.amount}
                </DataTable.Cell>

                {/* Type */}
                <DataTable.Cell style={styles.tableType}>
                  <Text style={styles.typeText}>
                    {TypeGetter(transaction.type)}
                  </Text>
                </DataTable.Cell>

                {/* Category */}
                <DataTable.Cell style={styles.tableCategory}>
                  <Text>{CategoryGetter(transaction.categoryId)}</Text>
                </DataTable.Cell>

                {/* Edit */}
                <DataTable.Cell
                  style={styles.tableButton}
                  onPress={() => handleEdit(transaction.id)}
                >
                  <ActionButton icon="edit" />
                </DataTable.Cell>

                {/* Delete */}
                <DataTable.Cell
                  style={styles.tableButton}
                  onPress={() => handleDelete(transaction.id)}
                >
                  <ActionButton icon="trash" />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(transactions?.length / itemsPerPage)}
          onPageChange={(page) => handlePageChange(page)}
          label={`${page + 1} of ${totalPages}` + ' pages'}
          showFastPaginationControls
          numberOfItemsPerPageList={[5, 10, 15, 20]}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={(value) => setItemsPerPage(value)}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
      <EditTransactionModel
        visible={editModel}
        transaction={editTransaction}
        hideModal={() => setEditModel(false)}
      />
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
  tableAmount: {
    flex: 0.2,
    justifyContent: 'center',
  },
  tableType: {
    flex: 0.4,
    justifyContent: 'center',
  },
  typeText: {
    color: 'white',
  },
  tableCategory: {
    flex: 0.3,
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableButton: {
    flex: 0.15,
    justifyContent: 'center',
  },
});

export default Table;
