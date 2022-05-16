import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    circle: {
        borderRadius: 14,
        borderWidth: 1,
        height: 28,
        marginRight: 5,
        width: 28,
    },
    container: {
        flexDirection: 'row',
    },
    icon: {
        color: colors.gray,
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    textButton: {
        color: colors.gray,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContainer: {
        justifyContent: 'center',
    },
});

export default class FavoriteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected,
        };
    }

  handleFavoriteButtonChange = () => {
      const { onFavoriteButtonChange } = this.props;

      onFavoriteButtonChange();

      this.setState((previousState) => ({
          isSelected: !previousState.isSelected,
      }));
  };

  render() {
      const { isSelected } = this.state;
      const { style } = this.props;

      return (
          <TouchableOpacity
              style={{ ...style, ...styles.container }}
              onPress={this.handleFavoriteButtonChange}
          >
              <View
                  style={[
                      styles.circle,
                      isSelected
                          ? { borderColor: colors.red }
                          : { borderColor: colors.gray },
                  ]}
              >
                  <Icon
                      name={isSelected ? 'heart' : 'heart-outline'}
                      size={24}
                      style={[
                          styles.icon,
                          isSelected ? { color: colors.red } : { color: colors.gray },
                      ]}
                  />
              </View>
              <View style={styles.textContainer}>
                  <Text style={styles.textButton}>
                      {isSelected
                          ? 'Remove from favorites'
                          : 'Add to Favorites'}
                  </Text>
              </View>
          </TouchableOpacity>
      );
  }
}

FavoriteButton.propTypes = {
    style: PropTypes.object,
    isSelected: PropTypes.bool,
    onFavoriteButtonChange: PropTypes.func,
};
