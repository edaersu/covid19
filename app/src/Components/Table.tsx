import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../Globals/colors';
import { StatisticResponse } from '../types';
import Cell from './Cell';

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
  },
  tableWrapper: {
    width: '100%',
    paddingHorizontal: 24,
  },
  table: {
    marginTop: 12,
  },
  tableBody: {
    flexDirection: 'row',
  },
  cellHeaderReverse: {
    backgroundColor: colors.yellow,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cellHeaderTextReverse: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '700',
  },
});

const Table: React.FC<{ data?: StatisticResponse }> = ({ data }) => {
  if (!data) {
    return (
      <View style={[styles.tableContainer, { paddingTop: 24 }]}>
        <ActivityIndicator color={colors.textColorWhite} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableWrapper}>
        <View style={styles.table}>
          <View style={[styles.cellHeaderReverse, { marginBottom: 3 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.cellHeaderTextReverse}>Bugün</Text>
              <Text style={styles.cellHeaderTextReverse}>Toplam</Text>
            </View>
          </View>
          <View style={styles.tableBody}>
            <View style={{ flex: 1 }}>
              <Cell title="Test Sayısı" content={data.tests.total || '-'} />
              <Cell title="Vaka" content={data.NewCases?.replace('+', '') || '-'} />
              {/* <Cell title="Hasta" content="-" /> */}
              <Cell title="Vefat" content={data.NewDeaths?.replace('+', '') || '-'} />
              <Cell title="İyileşen" content={data.NewRecovered?.replace('+', '') || '-'} />
            </View>
            <View style={{ flex: 1 }}>
              <Cell right title="Test Sayısı" content={data.tests.total || '-'} />
              <Cell right title="Vaka" content={data.TotalCases || '-'} />
              {/* <Cell right title="Hasta" content="-" /> */}
              <Cell right title="Vefat" content={data.TotalDeaths || '-'} />
              <Cell right title="Toplam İyileşen" content={data.TotalRecovered || '-'} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Table;
