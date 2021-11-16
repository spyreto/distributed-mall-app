import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';

import Slider from '@react-native-community/slider';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 18,
        marginLeft: 16,
    },
    valueText: {
        color: colors.gray,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 16,
    },
});

export default class PriceSlider extends React.Component {
  state = {
      price: null,
  };

  componentDidMount() {
      if (this.props.value === 0 || this.props.value === null) {
          this.setState({ price: this.props.maxPrice });
      } else {
          this.setState({ price: this.props.value });
      }
  }

  setInitialPrice = () => {
      if (this.props.value === 0) {
          return this.props.maxPrice;
      }
      return this.props.value;
  };

  handlePriceChange = (newPrice) => {
      const { onPriceChange } = this.props;
      onPriceChange(newPrice);
      this.setState({ price: newPrice });
  };

  render() {
      const { price } = this.state;
      const { maxPrice, style } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <View style={styles.textContainer}>
                  <Text style={styles.titleText}>Τιμή</Text>
                  <Text style={styles.valueText}>{price} &#8364;</Text>
              </View>

              <View>
                  <Slider
                      value={price}
                      onValueChange={this.handlePriceChange}
                      maximumValue={maxPrice}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.gray}
                      thumbTintColor={colors.primary}
                      thumbStyle={{ backgroundColor: colors.primary }}
                      step={1}
                      style={styles.slider}
                  />
              </View>
          </View>
      );
  }
}

PriceSlider.propTypes = {
    value: PropTypes.number,
    maxPrice: PropTypes.number,
    style: PropTypes.object,
    onPriceChange: PropTypes.func,
};
