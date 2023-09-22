import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const PieChartExample = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [names, setNames] = useState([]);
  const [colors, setColors] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // get the series and names from the data
    setSeries(Object.values(data).map((item) => item.amount));
    setNames(Object.values(data).map((item) => item.name));

    // generate random colros for each name
    setColors(
      Array.from({ length: Object.values(data).length }, () => {
        const randomHue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 70;
        const lightness = Math.floor(Math.random() * 30) + 60;

        const color = `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;
        return color;
      })
    );

    if (Object.values(data).length > 0) {
      setShow(true);
    }

    return () => {
      setShow(false);
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses by Category</Text>
      {show ? (
        <>
          <PieChart
            widthAndHeight={250}
            series={series}
            sliceColor={colors}
            coverRadius={0.55}
            coverFill={'#FFF'}
          />
          <View style={styles.legendContainer}>
            {series.map((item, index) => {
              return (
                <View style={styles.legendItem} key={index}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors[index] },
                    ]}
                  ></View>
                  <Text>{names[index]}</Text>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.loadingView}>
          <Text> Add some transactions to see the chart </Text>
        </View>
      )}
    </View>
  );
};

export default PieChartExample;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    margin: 10,
  },
  loadingView: {
    height: 500,
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    padding: 5,
    justifyContent: 'center',
    marginHorizontal: 5,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  legendColor: {
    width: 20,
    height: 10,
  },
});
