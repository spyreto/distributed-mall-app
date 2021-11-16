import React, { Component } from 'react';
import {
    StyleSheet, Text, View, FlatList,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import FavoriteListItem from '../components/FavoriteListItem';
import ConnectionRequired from '../components/ConnectionRequired';

import { removeFavorite } from '../redux/actions';
import { getUserPositionState, getLoggedInState, getUserFavoritesState } from '../redux/selectors';

import { fetchProductByIdApi, removeFavoriteApi } from '../utils/api';

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
    listItem: {
        marginHorizontal: 16,
        marginVertical: 6,
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

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: this.props,
        };
    }

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

  /* χρειρισμός επιλογής αφαίρεση από τα αγαπημένα */
  handleFavoriteButtonPress = (id) => {
      const { loggedInToken } = this.props;

      this.props.removeFavorite(id);
      return removeFavoriteApi(id, loggedInToken);
  };

  renderFavorite = ({ item }) => {
      const { navigation } = this.props;

      return (
          <FavoriteListItem
              item={item}
              onPress={() => this.handleListItemPress(item.id)}
              onFavoriteButtonPress={() => this.handleFavoriteButtonPress(item.id)}
              style={styles.listItem}
              navigation={navigation}
          />
      );
  };

  render() {
      const { navigation, loggedIn, favorites } = this.props;

      const isEmpty = favorites === undefined;

      return (
          <View style={styles.container}>
              {!loggedIn && (
                  <ConnectionRequired
                      navigation={navigation}
                      label="Απαιτείται σύνδεση για την προβολή των αγαπημένων σας"
                      icon="heart"
                      stack="Favorites"
                      prevScreen="Favorites"
                  />
              )}
              {loggedIn && isEmpty ? (
                  <View style={styles.msgContainer}>
                      <Icon
                          name="frown"
                          size={64}
                          style={styles.icon}
                      />
                      <Text style={styles.msgText}>Δεν έχετε αγαπημένα προϊόντα...</Text>
                  </View>
              ) : (
                  <FlatList
                      data={favorites}
                      renderItem={this.renderFavorite}
                      keyExtractor={keyExtractor}
                  />
              )}
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    const { userPosition } = getUserPositionState(state);
    const { loggedIn, loggedInToken } = getLoggedInState(state);
    const { favorites } = getUserFavoritesState(state);

    return {
        loggedIn,
        loggedInToken,
        favorites,
        userPosition,
    };
};

Favorites.propTypes = {
    loggedIn: PropTypes.bool,
    loggedInToken: PropTypes.string,
    userPosition: PropTypes.object,
    navigation: PropTypes.object,
    favorites: PropTypes.array,
    removeFavorite: PropTypes.func,
};

export default connect(mapStateToProps, { removeFavorite })(Favorites);
