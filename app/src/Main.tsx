import ViewPager from '@react-native-community/viewpager';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryPicker from './Components/CountryPicker';
import DatePicker from './Components/DatePicker';
import MyDonut from './Components/MyDonut';
import Table from './Components/Table';
import colors from './Globals/colors';
import { formatDate } from './utils';
import { useHistory } from './utils/data';

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
  tableDateText: {
    color: colors.textColorWhite,
    fontSize: 24,
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
});

const Main: React.FC<{
  defaultCountry?: string;
}> = ({ defaultCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Turkey');
  const [countryPickerModalVisible, setCountryPickerModalvisible] = useState<boolean>(false);
  const [datePickerModalVisible, setDatePickerModalvisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: historyData, mutate: mutateHistory, isValidating: historyLoading } = useHistory(
    selectedCountry,
    formatDate(selectedDate),
  );
  const {
    data: historyPevData,
    mutate: mutatePrevHistory,
    isValidating: prevHistoryLoading,
  } = useHistory(selectedCountry, formatDate(new Date(selectedDate.getTime() - 86400000)));

  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [defaultCountry]);

  const population = historyData?.population;
  const activeCase = historyData?.cases.active;
  const totalCase = historyData?.cases.total;
  const totalDeaths = historyData?.deaths.total;
  const totalRecovered = historyData?.cases.recovered;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={prevHistoryLoading || historyLoading}
            onRefresh={() => {
              mutateHistory();
              mutatePrevHistory();
            }}
            tintColor={colors.textColorWhite}
          />
        }
      >
        <View style={{ height: 200, marginTop: 12 }}>
          <ViewPager style={{ flex: 1 }} initialPage={0}>
            <View key="1">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={activeCase} max={population} />
                <Text style={styles.chartBottomTextInfo}>({activeCase})</Text>
                <Text style={styles.chartBottomText}>Aktif Vaka-Nüfus Oranı</Text>
              </View>
            </View>
            <View key="2">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={totalRecovered} max={totalCase} />
                <Text style={styles.chartBottomText}>Toplam İyileşen-Vaka Oranı</Text>
              </View>
            </View>
            <View key="3">
              <View style={{ alignItems: 'center' }}>
                <MyDonut percentage={totalDeaths} max={totalCase} />
                <Text style={styles.chartBottomText}>Toplam Vefat-Vaka Oranı</Text>
              </View>
            </View>
          </ViewPager>
        </View>
        <View style={styles.pickerGroup}>
          <View style={[styles.dateBtn, styles.tableOptGroup]}>
            <Text style={styles.tableDateTitle}>Tarih</Text>
            <TouchableOpacity onPress={() => setDatePickerModalvisible(true)}>
              <Text style={styles.tableDateText}>
                {selectedDate.toLocaleDateString()?.replace(/\//g, '.')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.countryBtn, styles.tableOptGroup]}
            onPress={() => setCountryPickerModalvisible(true)}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.tableDateText, styles.countryText]}
            >
              {selectedCountry}
            </Text>
          </TouchableOpacity>
        </View>
        <Table prevData={historyPevData} data={historyData} />
      </ScrollView>
      <CountryPicker
        visible={countryPickerModalVisible}
        onClose={() => setCountryPickerModalvisible(false)}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />
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
