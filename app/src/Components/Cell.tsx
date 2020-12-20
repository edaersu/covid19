import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../Globals/colors';

const styles = StyleSheet.create({
  cell: {},
  cellHeader: {
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

const Cell: React.FC<{ title: string; content: string; right?: boolean }> = ({
  title,
  content,
  right,
}) => (
  <View style={[styles.cell]}>
    <View style={[styles.cellHeader]}>
      <Text style={[styles.cellHeaderText, right && styles.alignTextRight]}>{title}</Text>
    </View>
    <View style={styles.cellBody}>
      <Text style={[styles.cellBodyText, right && styles.alignTextRight]}>{content}</Text>
    </View>
  </View>
);

export default Cell;
