import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import colors from '../Globals/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: Dimensions.get('screen').height * 0.05,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  headerSection: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textColorWhite,
  },
  headerLeft: {
    flex: 1,
  },
  headerBody: {
    flex: 3,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

const Header: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.headerSection, styles.headerLeft]} />
      <View style={[styles.headerSection, styles.headerBody]}>
        <Text style={styles.headerTitle}>Pandemic</Text>
      </View>
      <View style={[styles.headerSection, styles.headerRight]} />
    </View>
  );
};

export default Header;
