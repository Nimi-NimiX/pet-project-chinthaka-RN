import * as constants from '../../constants';

function calculate(transactions, categories) {
  let expenseCategories = categories.filter(
    (c) => c.categoryType === constants.types.EXPENSE
  );

  // Pie chart data object
  let pieChartData = {};

  for (let c of expenseCategories) {
    let amount =
      transactions &&
      transactions
        // filter transactions by category id
        .filter((transaction) => transaction.categoryId === c.id)
        // sum up the amounts
        .reduce((total, transaction) => total + transaction.amount, 0);

    if (amount > 0) {
      pieChartData[c.id] = {
        name: c.categoryName,
        amount,
      };
    }
  }

  return pieChartData;
}

export default calculate;
