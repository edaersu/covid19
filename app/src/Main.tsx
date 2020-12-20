import React, { ReactText, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from './Components/CountryPicker';
import DatePicker from './Components/DatePicker';
import PieChart from './Components/PieChart';
import Table from './Components/Table';
import colors from './Globals/colors';
import { CountriesResponse, StatisticResponse } from './types';
import { getAvailableCountries, getStatisticHistory } from './utils/services';

const styles = StyleSheet.create({
  pickerGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  tableOptGroup: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
  },
  dateBtn: {
    flexDirection: 'row',
    marginRight: 12,
  },
  countryBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkGray,
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
});

const Main: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [todayStat, setTodayStat] = useState<StatisticResponse>();
  const [countries, setCountries] = useState<CountriesResponse[]>();
  const [selectedCountry, setSelectedCountry] = useState<ReactText | undefined>('Turkey');
  const [countryPickerModalVisible, setCountryPickerModalvisible] = useState<boolean>(false);
  const [datePickerModalVisible, setDatePickerModalvisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const date = new Date();
    try {
      setLoading(true);
      getAvailableCountries().then(res => setCountries(res.items));
      getStatisticHistory('turkey', '2020-12-19').then(res => setTodayStat(res.item));
      setSelectedDate(date);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.textColorWhite} />
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <PieChart />
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
          <Table data={todayStat} />
        </ScrollView>
      </View>
      <CountryPicker
        visible={countryPickerModalVisible}
        onClose={() => setCountryPickerModalvisible(false)}
        value={selectedCountry}
        options={countries?.map(c => ({ label: c, value: c }))}
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
