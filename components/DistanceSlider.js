import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';

import Slider from '@react-native-community/slider';

import colors from '../utils/colors';
import methods from '../utils/methods';

const styles = StyleSheet.create({
    container: {},
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

export default class DistanceSlider extends React.Component {
  state = {
      step: 100,
      distance: this.props.maxDistance,
      value: '',
  };

  componentDidMount() {
      if (this.props.value === 0) {
          this.setState({
              distance: this.props.maxDistance,
              value: methods.distanceFormating(this.props.maxDistance),
          });
      } else {
          this.setState({
              distance: this.props.value,
              value: methods.distanceFormating(this.props.value),
          });
      }
  }

  handleDistanceChange = (newDistance) => {
      const { onDistanceChange } = this.props;

      if (newDistance <= 1500) {
          this.setState({
              value: methods.distanceFormating(newDistance),
              step: 10,
              distance: newDistance,
          });
      } else {
          if (newDistance === 16000) {
              this.setState({
                  value: '> 16 χλμ',
                  distance: 16000,
              });
          }
          this.setState({
              value: methods.distanceFormating(newDistance),
              step: 100,
              distance: newDistance,
          });
      }
      onDistanceChange(newDistance);
  };

  render() {
      const {
          value, step, distance,
      } = this.state;
      const { style, maxDistance } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <View style={styles.textContainer}>
                  <Text style={styles.titleText}>Απόσταση</Text>
                  <Text style={styles.valueText}>{value}</Text>
              </View>
              <Slider
                  value={distance}
                  onValueChange={this.handleDistanceChange}
                  maximumValue={maxDistance}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.gray}
                  thumbTintColor={colors.primary}
                  thumbStyle={{ backgroundColor: colors.primary }}
                  step={step}
              />
          </View>
      );
  }
}

DistanceSlider.propTypes = {
    maxDistance: PropTypes.number,
    value: PropTypes.number,
    onDistanceChange: PropTypes.func,
    style: PropTypes.object,
};
