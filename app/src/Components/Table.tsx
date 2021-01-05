import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../Globals/colors';
import { ReportModel } from '../types';
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
  data?: ReportModel | null;
  loading?: boolean;
}> = ({ data, loading }) => {
  if (!data || loading) {
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
              <Cell
                left={{
                  title: 'Test Sayısı',
                  content: data.tests,
                }}
                right={{
                  title: 'Test Sayısı',
                  content: data.totalTests,
                }}
              />
              <Cell
                left={{
                  title: 'Vaka',
                  content: data.cases,
                }}
                right={{
                  title: 'Vaka',
                  content: data.totalPatients, // typo by saglik bakanligi
                }}
              />
              <Cell
                left={{
                  title: 'Hasta',
                  content: data.patients,
                }}
                right={{
                  title: 'Ağır Hasta',
                  content: data.critical,
                }}
              />
              <Cell
                left={{
                  title: 'Vefat',
                  content: data.deaths,
                }}
                right={{
                  title: 'Vefat',
                  content: data.totalDeaths,
                }}
              />
              <Cell
                left={{
                  title: 'İyileşen',
                  content: data.recovered,
                }}
                right={{
                  title: 'İyileşen',
                  content: data.totalRecovered,
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
