import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import PropTypes from 'prop-types';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {},
    keywordInput: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        color: colors.black,
        fontSize: 18,
    },
});

export default class SearchInput extends React.Component {
  state = {
      keyword: '',
  };

  handleKeywordChange = (keyword) => {
      const { onKeywordChange } = this.props;
      onKeywordChange(keyword);
      this.setState({ keyword });
  };

  render() {
      const { placeholder, style } = this.props;
      const { keyword } = this.state;

      return (
          <View style={{ ...style, ...styles.container }}>
              <TextInput
                  autoCorrect={false}
                  value={keyword}
                  placeholder={placeholder}
                  placeholderTextColor={colors.gray}
                  style={styles.keywordInput}
                  clearButtonMode="always"
                  onChangeText={this.handleKeywordChange}
              />
          </View>
      );
  }
}

SearchInput.propTypes = {
    onKeywordChange: PropTypes.func,
    placeholder: PropTypes.string,
    style: PropTypes.object,
};
