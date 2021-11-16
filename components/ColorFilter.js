import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const colorsList = [
    'red',
    'pink',
    'lightpink',
    'orange',
    'Gold',
    'yellow',
    'purple',
    'green',
    'blue',
    'LightBlue',
    'brown',
    'gray',
    'silver',
    'beige',
    'black',
    'white',
];

const styles = StyleSheet.create({
    circleContainer: {
        alignItems: 'center',
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        marginLeft: 12,
        marginVertical: 6,
        width: 32,
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {},
    icon: {
        color: colors.black,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    labelText: {
        fontSize: 18,
    },
});

export default class ColorFilter extends React.Component {
  state = {
      selectedValues: [],
      isOpen: false,
  };

  isSelected = (value) => {
      const selectedValues = [...this.state.selectedValues];
      return selectedValues.includes(value);
  };

  handleListOpen = () => {
      this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  };

  hadleSelection = (material) => {
      if (this.isSelected(material)) {
          this.setState({
              selectedValues: this.state.selectedValues.filter(
                  (item) => item !== material,
              ),
          });
      } else {
          this.setState({
              selectedValues: [...this.state.selectedValues, material],
          });
      }
  };

  render() {
      const { isOpen } = this.state;
      const { label, style } = this.props;

      return (
          /* eslint-disable react-native/no-inline-styles */
          <View style={{ ...style, ...styles.container }}>
              <TouchableOpacity
                  style={styles.labelContainer}
                  onPress={this.handleListOpen}
              >
                  <Text style={styles.labelText}>{label}</Text>
                  <Icon
                      name={isOpen ? 'chevron-down' : 'chevron-right'}
                      size={18}
                      style={styles.icon}
                  />
              </TouchableOpacity>
              <View style={styles.colorContainer}>
                  {isOpen
            && colorsList.map((color) => (
                <View key={color}>
                    {this.isSelected(color) ? (
                        <TouchableOpacity
                            style={[
                                styles.circleContainer,
                                color === colors.white
                                    ? { borderWidth: 1, borderColor: colors.black }
                                    : {
                                        borderWidth: 4,
                                        borderColor: color.toLowerCase(),
                                    },
                            ]}
                            onPress={() => this.hadleSelection(color)}
                        >
                            <Icon
                                name="check"
                                size={16}
                                style={
                                    color === colors.white
                                        ? { color: colors.black }
                                        : { color: color.toLowerCase() }
                                }
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.circleContainer,
                                {
                                    backgroundColor: color.toLowerCase(),
                                    borderColor: colors.black,
                                    borderWidth: 1,
                                },
                            ]}
                            onPress={() => this.hadleSelection(color)}
                        />
                    )}
                </View>
            ))}
              </View>
          </View>
      );
  }
}

ColorFilter.propTypes = {
    label: PropTypes.string,
    data: PropTypes.object,
    onSelctionChange: PropTypes.func,
    style: PropTypes.object,
};
