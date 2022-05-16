import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { CommonActions, StackActions } from '@react-navigation/native';
import ProductListItem from '../components/ProductListItem';

import { getUserPositionState } from '../redux/selectors';

import store from '../store';

import { fetchProducts } from '../utils/api';
import methods from '../utils/methods';
import colors from '../utils/colors';

const keyExtractor = ({ id }) => id.toString();

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

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: store.getState().products,
            loading: store.getState().isFetchingProducts,
            error: store.getState().error,
            hasProducts: store.getState().hasProducts,
            filters: {},
        };
    }

    async componentDidMount() {
        const { keyword, distance, filters } = this.props.route.params;
        const { userPosition } = this.props;
        const { userLongitude, userLatitude } = userPosition;

        this.unsubscribe = store.onChange(() => this.setState({
            products: store.getState().products,
            loading: store.getState().isFetchingProducts,
            hasProducts: store.getState().hasProducts,
            error: store.getState().error,
            filters,
        }));

        const fetchedProducts = await fetchProducts(
            keyword,
            distance,
            userLongitude,
            userLatitude,
        );

        /* Check if products have been found and update the hasProducts var */
        if (fetchedProducts.length === 0) {
            store.setState({ hasProducts: false });
        } else {
            store.setState({ hasProducts: true });
        }

        const categoryType = methods.getCategoryType(fetchedProducts);

        this.props.navigation.dispatch(
            CommonActions.setParams({
                refreshScreen: this.refresh,
                filters,
                categoryType,
            }),
        );

        if (filters === undefined) {
            store.setState({ products: fetchedProducts, isFetchingProducts: false });
        } else if (
            filters.categoryFilters === undefined
      && filters.price === 0
      && filters.distance === 0
      && filters.manufacturers.length === 0
        ) {
            store.setState({ products: fetchedProducts, isFetchingProducts: false });
        } else {
            this.setState({
                products: methods.mainFilters(fetchedProducts, filters),
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

  refresh = (filters) => {
      const { keyword, distance } = this.props.route.params;

      this.props.navigation.dispatch(
          StackActions.replace('Results', {
              keyword,
              distance,
              filters,
          }),
      );
  };

  renderProduct = ({ item }) => {
      const { navigation } = this.props;
      const {
          id,
          name,
          thumbnails,
          minPrice,
          manufacturer,
          sellers,
          minDistance,
      } = item;

      return (
          <ProductListItem
              id={id}
              name={name}
              image={Object.values(thumbnails)[0]}
              manufacturer={manufacturer}
              sellers={sellers}
              minPrice={minPrice}
              minDistance={methods.distanceFormating(minDistance)}
              onPress={() => navigation.navigate('ProductInfo', { product: item })}
              style={styles.listItem}
          />
      );
  };

  render() {
      const {
          products, loading, error, hasProducts,
      } = this.state;

      return (
          <View style={styles.container}>
              {loading && (
                  <View style={styles.msgContainer}>
                      <ActivityIndicator size={64} color={colors.primary} />
                  </View>
              )}
              {error && (
                  <View style={styles.msgContainer}>
                      <Icon
                          name="exclamation"
                          size={64}
                          style={styles.icon}
                      />
                      <Text style={styles.msgText}>An error occurred...</Text>
                  </View>
              )}
              {!loading && !error && hasProducts && (
                  <FlatList
                      data={products}
                      renderItem={this.renderProduct}
                      keyExtractor={keyExtractor}
                  />
              )}
              {!loading && !error && !hasProducts && (
                  <View style={styles.msgContainer}>
                      <Icon
                          name="frown"
                          size={64}
                          style={styles.icon}
                      />
                      <Text style={styles.msgText}>No products found...</Text>
                  </View>
              )}
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    const { userPosition } = getUserPositionState(state);
    return { userPosition };
};

export default connect(mapStateToProps)(Results);

Results.propTypes = {
    route: PropTypes.object,
    userInfo: PropTypes.object,
    navigation: PropTypes.object,
    loggedInToken: PropTypes.string,
    userPosition: PropTypes.object,
};
