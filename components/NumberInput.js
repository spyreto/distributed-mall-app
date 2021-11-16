import React from 'react';
import {
    StyleSheet, View, Text, TouchableHighlight,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        color: colors.primary,
        margin: 16,
    },
    iconDisable: {
        color: colors.black,
        margin: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    labelText: {
        fontSize: 18,
    },
    symbol: {
        borderColor: colors.grayLight,
        borderRadius: 16,
        borderWidth: 1,
    },
    valueContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 240,
    },
    valueText: {
        fontSize: 24,
        paddingHorizontal: 12,
    },
});

export default class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.initValue,
            minusEnable: false,
            plusEnable: this.setInitialPlusEnable(),
        };
    }

  setInitialPlusEnable = () => {
      const { maxValue, minValue, enable } = this.props;
      if (!enable) {
          return false;
      } if (maxValue === minValue) {
          return false;
      }
      return true;
  };

  componentDidUpdate(prevProps) {
      if (this.props.maxValue !== prevProps.maxValue) {
          this.updateNumbeInput();
      }
  }

  updateNumbeInput() {
      const { minValue, maxValue, onValueChange } = this.props;
      const value = 1;

      if (minValue === maxValue) {
          this.setState({
              selectedValue: value,
              minusEnable: false,
              plusEnable: false,
          });
          onValueChange(value);
      } else {
          this.setState({
              selectedValue: value,
              minusEnable: false,
              plusEnable: true,
          });
          onValueChange(value);
      }
  }

  handleMinusPress = () => {
      const { minValue, onValueChange } = this.props;
      const { selectedValue, plusEnable } = this.state;
      const nextValue = selectedValue - 1;

      if (plusEnable) {
          if (nextValue > minValue) {
              this.setState({ selectedValue: nextValue, minusEnable: true });
              onValueChange(nextValue);
          } else {
              this.setState({ selectedValue: nextValue, minusEnable: false });
              onValueChange(nextValue);
          }
      } else if (nextValue > minValue) {
          this.setState({ selectedValue: nextValue, plusEnable: true });
          onValueChange(nextValue);
      } else {
          this.setState({
              selectedValue: nextValue,
              minusEnable: false,
              plusEnable: true,
          });
          onValueChange(nextValue);
      }
  };

  handlePlusPress = () => {
      const { maxValue, onValueChange } = this.props;
      const { selectedValue, minusEnable } = this.state;
      const nextValue = selectedValue + 1;

      if (minusEnable) {
          if (nextValue < maxValue) {
              this.setState({ selectedValue: nextValue, plusEnable: true });
              onValueChange(nextValue);
          } else {
              this.setState({ selectedValue: nextValue, plusEnable: false });
              onValueChange(nextValue);
          }
      } else if (nextValue < maxValue) {
          this.setState({ selectedValue: nextValue, minusEnable: true });
          onValueChange(nextValue);
      } else {
          this.setState({
              selectedValue: nextValue,
              plusEnable: false,
              minusEnable: true,
          });
          onValueChange(nextValue);
      }
  };

  render() {
      const { selectedValue, minusEnable, plusEnable } = this.state;
      const { style, label } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>{label}</Text>
              </View>
              <View style={styles.valueContainer}>
                  {minusEnable ? (
                      <TouchableHighlight
                          style={styles.symbol}
                          underlayColor={colors.primaryLight}
                          onPress={this.handleMinusPress}
                      >
                          <Icon name="minus" size={16} style={styles.icon} />
                      </TouchableHighlight>
                  ) : (
                      <View
                          style={[styles.symbol, { backgroundColor: colors.grayLight }]}
                      >
                          <Icon name="minus" size={16} style={styles.iconDisable} />
                      </View>
                  )}
                  <Text style={styles.valueText}>{selectedValue}</Text>
                  {plusEnable ? (
                      <TouchableHighlight
                          style={styles.symbol}
                          underlayColor={colors.primaryLight}
                          onPress={this.handlePlusPress}
                      >
                          <Icon name="plus" size={16} style={styles.icon} />
                      </TouchableHighlight>
                  ) : (
                      <View
                          style={[styles.symbol, { backgroundColor: colors.grayLight }]}
                      >
                          <Icon name="plus" size={16} style={styles.iconDisable} />
                      </View>
                  )}
              </View>
          </View>
      );
  }
}

NumberInput.propTypes = {
    onValueChange: PropTypes.func,
    style: PropTypes.object,
    label: PropTypes.string,
    initValue: PropTypes.number,
    value: PropTypes.number,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    enable: PropTypes.bool,
};
