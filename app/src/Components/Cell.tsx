import React, { ReactText } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../Globals/colors';

const styles = StyleSheet.create({
  cell: {
    overflow: 'scroll',
  },
  cellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.darkGray,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cellHeaderText: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: '700',
  },
  cellBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cellBodyText: {
    color: colors.textColorWhite,
    fontSize: 24,
  },
  alignTextRight: {
    textAlign: 'right',
  },
});

const Cell: React.FC<{
  left: {
    title: ReactText;
    content: ReactText;
  };
  right: {
    title: ReactText;
    content: ReactText;
  };
}> = ({ left, right }) => (
  <View style={[styles.cell]}>
    <View style={[styles.cellHeader]}>
      <Text style={[styles.cellHeaderText]}>{left.title}</Text>
      <Text style={[styles.cellHeaderText]}>{right.title}</Text>
    </View>
    <View style={styles.cellBody}>
      <Text numberOfLines={1} style={[styles.cellBodyText, { flex: 1 }]}>
        {left.content}
      </Text>
      <Text numberOfLines={1} style={[styles.cellBodyText, { flex: 0 }]}>
        {right.content}
      </Text>
    </View>
  </View>
);

export default Cell;
