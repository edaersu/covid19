import ViewPager from '@react-native-community/viewpager';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from '../Components/DatePicker';
import MyDonut from '../Components/MyDonut';
import Table from '../Components/Table';
import colors from '../Globals/colors';
import { formatDate } from '../utils';
import { useLastReport, useReport } from '../utils/data';

const styles = StyleSheet.create({
  pickerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  tableOptGroup: {
    paddingVertical: 3,
  },
  dateBtn: {
    flexDirection: 'row',
    marginRight: 12,
  },
  countryBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 3,
  },
  tableDateTitle: {
    color: colors.yellow,
    fontWeight: '500',
    fontSize: 24,
    marginRight: 6,
  },
  lastUpdateTitle: {
    color: colors.yellow,
    fontSize: 14,
  },
  tableDateText: {
    color: colors.textColorWhite,
    fontSize: 24,
  },
  lastUpdateText: {
    color: colors.textColorWhite,
    fontSize: 14,
    textAlign: 'right',
  },
  countryText: {
    color: colors.textColorWhite,
    flex: 1,
  },
  chartBottomText: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: '500',
  },
  chartBottomTextInfo: {
    color: colors.textColorWhite,
    fontSize: 18,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});

const initialPage = 0;
const Main: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [datePickerModalVisible, setDatePickerModalvisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data, mutate, isValidating } = useReport(formatDate(selectedDate));
  const { data: lastData } = useLastReport();
  const chartKeys = [0, 1, 2, 3, 4];

  // TODO solve date problem

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={() => {
              mutate();
            }}
            tintColor={colors.textColorWhite}
          />
        }
      >
        <View style={{ height: 230, marginTop: 12 }}>
          <ViewPager
            style={{ flex: 1 }}
            initialPage={initialPage}
            onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
          >
            <View key="0">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={Number(data?.pneumoniaPercent)} />
                <Text style={styles.chartBottomText}>Hastalarda Zatürre Oranı</Text>
              </View>
            </View>
            <View key="1">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={Number(data?.bedOccupancyRate)} />
                <Text style={styles.chartBottomText}>Yatak Doluluk Oranı</Text>
              </View>
            </View>
            <View key="2">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={Number(data?.adultIntensiveCareRatio)} />
                <Text style={styles.chartBottomText}>Erişkin Yoğun Bakım Doluluk Oranı</Text>
              </View>
            </View>
            <View key="3">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={Number(data?.ventilatorOccupancyRatio)} />
                <Text style={styles.chartBottomText}>Ventilatör Doluluk Oranı</Text>
              </View>
            </View>
            <View key="4">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={Number(data?.fillationRatio)} />
                <Text style={styles.chartBottomText}>filyasyon Oranı</Text>
              </View>
            </View>
          </ViewPager>
          <View style={styles.pagination}>
            {chartKeys.map((key, idx) => (
              <View
                key={key}
                style={[
                  styles.dot,
                  {
                    backgroundColor: currentPage === idx ? colors.yellow : colors.darkGray,
                    marginRight: idx === chartKeys.length - 1 ? 0 : 6,
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.pickerGroup}>
          <View style={[styles.dateBtn, styles.tableOptGroup]}>
            <Text style={styles.tableDateTitle}>Tarih</Text>
            <TouchableOpacity onPress={() => setDatePickerModalvisible(true)}>
              <Text style={styles.tableDateText}>
                {formatDate(selectedDate).replace(/\//g, '.')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.dateBtn, styles.tableOptGroup, { flexDirection: 'column' }]}>
            <Text style={styles.lastUpdateTitle}>Son Güncelleme</Text>
            <TouchableOpacity onPress={() => setDatePickerModalvisible(true)}>
              <Text style={styles.lastUpdateText}>{lastData?.date.replace(/\//g, '.')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Table loading={isValidating} data={data} />
      </ScrollView>
      <DatePicker
        visible={datePickerModalVisible}
        onClose={() => setDatePickerModalvisible(false)}
        value={selectedDate}
        onChange={setSelectedDate}
        maximumDate={new Date()}
      />
    </>
  );
};

export default Main;
