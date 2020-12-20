import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from './Components/Header';
import colors from './Globals/colors';
import Main from './Main';

const Root: React.FC<{
  country?: string;
}> = ({ country }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <StatusBar animated barStyle="light-content" />
      <Header />
      <Main defaultCountry={country} />
    </SafeAreaView>
  );
};

export default Root;
