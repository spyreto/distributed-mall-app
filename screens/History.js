import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import HistoryListItem from '../components/HistoryListItem';

import { getUserPositionState, getUserHistoryState } from '../redux/selectors';

import { fetchProductByIdApi } from '../utils/api';

import colors from '../utils/colors';

const keyExtractor = ({ id }) => id;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
    icon: {
        color: colors.primary,
        margin: 16,
    },
    msgContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    msgText: {
        color: colors.primary,
        fontSize: 24,
    },
});

class History extends Component {
  handleListItemPress = (id) => {
      const { userPosition, navigation } = this.props;
      const { userLongitude, userLatitude } = userPosition;

      return fetchProductByIdApi(id, userLongitude, userLatitude).then(
          (response) => {
              navigation.navigate('ProductInfo', {
                  product: Object.values(response)[0],
              });
          },
      );
  };

  renderProduct = ({ item }) => {
      const { navigation } = this.props;

      return (
          <HistoryListItem
              item={item}
              onPress={() => this.handleListItemPress(item.id)}
              navigation={navigation}
          />
      );
  };

  render() {
      const { history } = this.props;

      const isEmpty = Object.keys(history).length !== 0;

      return (
          <View style={styles.container}>
              {isEmpty ? (
                  <FlatList
                      data={history}
                      renderItem={this.renderProduct}
                      keyExtractor={keyExtractor}
                  />
              ) : (
                  <View style={styles.msgContainer}>
                      <Icon
                          name="frown"
                          size={64}
                          style={styles.icon}
                      />
                      <Text style={styles.msgText}>Δεν έχετε ιστορικό...</Text>
                  </View>
              )}
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    const { userPosition } = getUserPositionState(state);
    const { history } = getUserHistoryState(state);

    return {
        userPosition,
        history,
    };
};

History.propTypes = {
    route: PropTypes.object,
    userInfo: PropTypes.object,
    navigation: PropTypes.object,
    userPosition: PropTypes.object,
    loggedInToken: PropTypes.string,
    history: PropTypes.object,
};

export default connect(mapStateToProps)(History);
