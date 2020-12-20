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

const Table: React.FC<{
  prevData?: StatisticResponse;
  data?: StatisticResponse;
  loading?: boolean;
}> = ({ prevData, data, loading }) => {
  if (loading) {
    return (
      <View style={[styles.tableContainer, { paddingTop: 24 }]}>
        <ActivityIndicator color={colors.textColorWhite} size="large" />
      </View>
    );
  }

  const todayTest = data && prevData ? data.tests.total - prevData?.tests.total : '-';
  const todayRecovered = data && prevData ? data.cases.recovered - prevData?.cases.recovered : '-';
  const todayCase =
    data && prevData
      ? data.cases.new
        ? data.cases.new.replace('+', '')
        : data.cases.total - prevData?.cases.total
      : '-';
  const todayDeath =
    data && prevData
      ? data.deaths.new
        ? data.deaths.new.replace('+', '')
        : data.deaths.total - prevData?.deaths.total
      : '-';
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
              <Cell
                left={{
                  title: 'Test Sayısı',
                  content: todayTest,
                }}
                right={{
                  title: 'Test Sayısı',
                  content: data?.tests.total || '-',
                }}
              />
              <Cell
                left={{
                  title: 'Vaka',
                  content: todayCase,
                }}
                right={{
                  title: 'Vaka',
                  content: data?.cases.total || '-',
                }}
              />
              <Cell
                left={{
                  title: 'Vefat',
                  content: todayDeath,
                }}
                right={{
                  title: 'Vefat',
                  content: data?.deaths.total || '-',
                }}
              />
              <Cell
                left={{
                  title: 'İyileşen',
                  content: todayRecovered,
                }}
                right={{
                  title: 'İyileşen',
                  content: data?.cases.recovered || '-',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Table;
