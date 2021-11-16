import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {},

    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    labelText: {
        fontSize: 18,
    },

    selectionBox: {
        alignItems: 'center',
        borderColor: colors.black,
        borderRadius: 2,
        borderWidth: 1,
        height: 24,
        justifyContent: 'center',
        marginRight: 32,
        width: 24,
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    selectionText: {
        color: colors.grayDark,
        fontSize: 14,
    },
});

export default class BoxPickerFilter extends React.Component {
  state = {
      selectedValues: this.props.initialSelectedValues,
      isOpen: false,
  };

  componentDidMount() {
      if (this.props.initialSelectedValues.length !== 0) {
          this.setState({ isOpen: true });
      }
  }

  isSelected = (value) => {
      const selectedValues = [...this.state.selectedValues];
      return selectedValues.includes(value);
  };

  handleListOpen = () => {
      this.setState((previousState) => ({ isOpen: !previousState.isOpen }));
  };

  hadleSelection = (value) => {
      const { onSelection } = this.props;
      onSelection(value);

      const selectedValues = [...this.state.selectedValues];

      if (selectedValues.includes(value)) {
          this.setState({
              selectedValues: selectedValues.filter((item) => item !== value),
          });
      } else {
          this.setState({ selectedValues: [...selectedValues, value] });
      }
  };

  render() {
      const { isOpen } = this.state;
      const { label, style, values } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <TouchableOpacity
                  style={styles.labelContainer}
                  onPress={this.handleListOpen}
              >
                  <Text style={styles.labelText}>{label}</Text>
                  <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={18} />
              </TouchableOpacity>
              {isOpen
          && values.map((value) => (
              <View key={value} style={styles.selectionContainer}>
                  {this.isSelected(value) ? (
                      <TouchableOpacity
                          style={[
                              styles.selectionBox,
                              { backgroundColor: colors.primary },
                          ]}
                          onPress={() => this.hadleSelection(value)}
                      >
                          <Icon name="check" size={18} />
                      </TouchableOpacity>
                  ) : (
                      <TouchableOpacity
                          style={styles.selectionBox}
                          onPress={() => this.hadleSelection(value)}
                      />
                  )}
                  <Text style={styles.selectionText}>{value} </Text>
              </View>
          ))}
          </View>
      );
  }
}

BoxPickerFilter.propTypes = {
    initialSelectedValues: PropTypes.object,
    style: PropTypes.object,
    values: PropTypes.object,
    onSelection: PropTypes.func,
    label: PropTypes.string,
};
