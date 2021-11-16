import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const values = [
    {
        key: '10',
        text: 'XXS',
    },
    {
        key: '20',
        text: 'XS',
    },
    {
        key: '30',
        text: 'S',
    },
    {
        key: '40',
        text: 'M',
    },
    {
        key: '50',
        text: 'L',
    },
    {
        key: '60',
        text: 'XL',
    },
    {
        key: '70',
        text: 'XXL',
    },
];

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
    icon: {
        color: colors.black,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default class SizeFilter extends React.Component {
  state = {
      selectedValues: [],
      isOpen: false,
  };

  isSelected = (value) => {
      const selectedValues = [...this.state.selectedValues];
      return selectedValues.includes(value);
  };

  hadleSelection = (value) => {
      if (this.isSelected(value)) {
          this.setState({
              selectedValues: this.state.selectedValues.filter(
                  (item) => item !== value,
              ),
          });
      } else {
          this.setState({ selectedValues: [...this.state.selectedValues, value] });
      }
  };

  handleListOpen = () => {
      this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  };

  render() {
      const { isOpen } = this.state;
      const { label } = this.props;

      return (
          <View>
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
              <View style={styles.valueContainer}>
                  {isOpen
            && values.map((value) => (
                <View key={value.key}>
                    <TouchableOpacity
                        style={
                            this.isSelected(value.key)
                                ? [
                                    styles.circleContainer,
                                    { backgroundColor: colors.primary },
                                ]
                                : styles.circleContainer
                        }
                        onPress={() => this.hadleSelection(value.key)}
                    >
                        <Text style={styles.valueText}>{value.text}</Text>
                    </TouchableOpacity>
                </View>
            ))}
              </View>
          </View>
      );
  }
}

SizeFilter.propTypes = {
    label: PropTypes.string,
};
