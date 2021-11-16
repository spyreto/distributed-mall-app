import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import colors from '../utils/colors';
import { fetchAvailableSizes } from '../utils/api';

const styles = StyleSheet.create({
    circleContainer: {
        alignItems: 'center',
        backgroundColor: colors.grayLight,
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        marginHorizontal: 12,
        marginVertical: 6,
    },
    labelContainer: {
        flexDirection: 'row',
        marginBottom: 6,
        marginHorizontal: 16,
    },
    labelText: {
        fontSize: 18,
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueText: {
        fontSize: 14,
        paddingHorizontal: 12,
    },
});

export default class SizeBuyFilter extends React.Component {
  state = {
      selectedValue: null,
      quantity: null,
      availableSizes: [],
  };

  async componentDidMount() {
      const { productId, sellerId, categoryType } = this.props;

      const availableSizes = await fetchAvailableSizes(
          productId,
          sellerId,
          categoryType,
      );
      this.setState({ availableSizes });
  }

  hadleSizeSelection = (value, quantity) => {
      const { onSizeChange } = this.props;
      this.setState({ selectedValue: value, quantity });
      onSizeChange(value, quantity);
  };

  render() {
      const { label } = this.props;
      const { selectedValue, availableSizes } = this.state;

      return (
          <View>
              <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>{label}</Text>
              </View>
              <View style={styles.valueContainer}>
                  {availableSizes.map((value) => (
                      <View key={value.size}>
                          <TouchableOpacity
                              style={
                                  value.size === selectedValue
                                      ? [
                                          styles.circleContainer,
                                          { backgroundColor: colors.primary },
                                      ]
                                      : styles.circleContainer
                              }
                              onPress={() => this.hadleSizeSelection(value.size, value.quantity)
                              }
                          >
                              <Text style={styles.valueText}>{value.label}</Text>
                          </TouchableOpacity>
                      </View>
                  ))}
              </View>
          </View>
      );
  }
}

SizeBuyFilter.propTypes = {
    label: PropTypes.string,
    categoryType: PropTypes.string,
    onSizeChange: PropTypes.func,
    productId: PropTypes.number,
    sellerId: PropTypes.number,
};
