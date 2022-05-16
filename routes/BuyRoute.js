import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import { SliderBox } from 'react-native-image-slider-box';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import FavoriteButton from '../components/FavoriteButton';
import SellerSelectionButton from '../components/SellerSelectionButton';
import SizeBuyFilter from '../components/SizeBuyFilter';
import Divider from '../components/Divider';
import ChoiceChip from '../components/ChoiceChip';
import NumberInput from '../components/NumberInput';
import ReservationButton from '../components/ReservationButton';
import FadeInView from '../components/FadeInView';

import { removeFavorite, addFavorite } from '../redux/actions';
import { getLoggedInState, getUserFavoritesState } from '../redux/selectors';

import { removeFavoriteApi, addFavoriteApi } from '../utils/api';

import colors from '../utils/colors';
import methods from '../utils/methods';

const styles = StyleSheet.create({
    bannerButton: {
        marginLeft: 8,
    },
    bannerButtonText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 8,
    },
    bannerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 8,
    },
    bannerContainer: {
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        borderTopColor: colors.grayLight,
        borderTopWidth: 3,
        flexDirection: 'column',
    },
    bannerText: {
        fontSize: 14,
        textAlign: 'left',
    },
    bannerTextContainer: {
        marginBottom: 12,
        marginHorizontal: 16,
        marginTop: 22,
    },
    buyButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    choiceChip: {
        marginHorizontal: 16,
    },
    companyName: {
        color: colors.gray,
        fontSize: 12,
        marginTop: 2,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    distance: {
        color: colors.gray,
        fontSize: 12,
        marginTop: 2,
    },
    favoriteButton: {
        marginHorizontal: 16,
        marginTop: 12,
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgPoints: {
        height: 14,
        width: 14,
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    msgContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    msgIcon: {
        color: colors.primary,
        margin: 16,
    },
    msgText: {
        color: colors.primary,
        fontSize: 24,
    },
    priceEuro: {
        fontSize: 14,
    },
    pricePoints: {
        color: colors.primary,
        fontSize: 14,
        marginRight: 5,
    },
    pricePointsView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    productInfo: {
        flex: 3,
        flexDirection: 'column',
        marginHorizontal: 16,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    quantityInput: {
        marginHorizontal: 16,
    },
    scrollViewContainer: {
        flex: 1,
    },
    sellerButton: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    valueInfo: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'column',
        marginRight: 12,
    },
});

const orangePointsImg = require('../img/orangepoints.png');

class BuyRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.setIsFavoriteInitialState(),
            selectedSeller: this.setInitialSeller(this.props.product.sellers),
            payment: null,
            sizeFilter: null,
            maxQuantity: this.setInitialMaxQuantity(this.props.product.sellers),
            quantity: null,
            enableBuyButton: false,
            userPosition: this.props,
            userConnectionBanner: true,
        };
    }

  setIsFavoriteInitialState = () => {
      const { product, favorites } = this.props;
      return (
          favorites.filter((item) => item.id === product.id && !item.company)
              .length > 0
      );
  };

  setInitialSeller = (sellers) => {
      if (sellers.length === 1) {
          return Object.values(sellers)[0];
      }
      return {
          id: null,
          name: null,
          price: null,
          location: null,
          distance: null,
      };
  };

  setInitialMaxQuantity = (sellers) => {
      if (sellers.length === 1) {
          const { categoryType } = this.props.product;

          if (categoryType === 10 || categoryType === 20) {
              return null;
          }
          return Object.values(sellers)[0].quantity;
      }
      return null;
  };

  /* Handling the state of "connect to buy" banner*/
  handleBannerState = () => {
      this.setState({ userConnectionBanner: !this.state.userConnectionBanner });
  };

  // Handling add to Favorites
  handleFavoriteButtonChange = () => {
      const { isFavorite } = this.state;
      const { product, loggedInToken } = this.props;

      if (isFavorite) {
          this.props.removeFavorite(product.id);

          this.setState((previousState) => ({
              isFavorite: !previousState.isFavorite,
          }));
          return removeFavoriteApi(product.id, loggedInToken);
      }
      this.props.addFavorite(
          product.id,
          product.name,
          Object.values(product.images)[0],
          Object.values(product.thumbnails)[0],
      );

      this.setState((previousState) => ({
          isFavorite: !previousState.isFavorite,
      }));
      return addFavoriteApi(product.id, loggedInToken);
  };

  handleSellerChange = (selectedSeller) => {
      const { categoryType } = this.props.product;
      const { sizeFilter, payment } = this.state;
      const { loggedIn } = this.props;

      if (selectedSeller.name && payment && loggedIn) {
          switch (categoryType) {
          case 10:
          case 20:
              if (sizeFilter) {
                  this.setState({ enableBuyButton: true });
              }
              break;
          default:
              this.setState({ enableBuyButton: true });
          }
      }

      if (categoryType !== 10 && categoryType !== 20) {
          this.setState({
              selectedSeller,
              maxQuantity: selectedSeller.quantity,
          });
      } else {
          this.setState({ selectedSeller });
      }
  };

  handleQuantityChange = (quantity) => {
      this.setState({ quantity });
  };

  handlePaymentChange = (payment) => {
      const { categoryType } = this.props.product;
      const { sizeFilter, selectedSeller } = this.state;
      const { loggedIn } = this.props;

      if (selectedSeller.name && payment && loggedIn) {
          switch (categoryType) {
          case 10:
          case 20:
              if (sizeFilter) {
                  this.setState({ enableBuyButton: true });
              }
              break;
          default:
              this.setState({ enableBuyButton: true });
          }
      }
      this.setState({ payment });
  };

  handleSizeFilterChange = (sizeFilter, maxQuantity) => {
      const { loggedIn } = this.props;
      const { payment, selectedSeller } = this.state;

      if (selectedSeller.name && payment && loggedIn && sizeFilter) {
          this.setState({
              enableBuyButton: true,
              sizeFilter,
              quantity: 1,
              maxQuantity,
          });
      } else {
          this.setState({
              sizeFilter,
              quantity: 1,
              maxQuantity,
          });
      }
  };

  // Display filters depending on the product type
  renderFilters = (categoryType, productId, sellerId) => {
      switch (categoryType) {
      case 10:
      case 20:
          return (
              <View>
                  <SizeBuyFilter
                      label="Size"
                      productId={productId}
                      sellerId={sellerId}
                      categoryType={categoryType}
                      onSizeChange={this.handleSizeFilterChange}
                  />
                  <Divider />
              </View>
          );
      default:
          return null;
      }
  };

  render() {
      const {
          selectedSeller,
          payment,
          quantity,
          enableBuyButton,
          userPosition,
          userConnectionBanner,
          sizeFilter,
          isFavorite,
          maxQuantity,
      } = this.state;

      const {
          product, navigation, loggedIn, loggedInToken, userInfo,
      } = this.props;
      const {
          id, name, images, categoryType, sellers,
      } = product;

      return (
          <SafeAreaView style={styles.container}>
              {sellers.length > 0 && !loggedIn && userConnectionBanner && (
                  <FadeInView style={styles.bannerContainer} duration={2000}>
                      <View style={styles.bannerTextContainer}>
                          <Text style={styles.bannerText}>
                Sign in is required to purchase products.
                          </Text>
                      </View>
                      <View style={styles.bannerButtonsContainer}>
                          <TouchableOpacity
                              style={styles.bannerButton}
                              onPress={this.handleBannerState}
                          >
                              <Text style={styles.bannerButtonText}>
                 CONTINUE AS GUEST
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.bannerButton}
                              onPress={() => navigation.navigate('SignIn', { prevScreen: 'ProductInfo' })
                              }
                          >
                              <Text style={styles.bannerButtonText}>SIGN IN</Text>
                          </TouchableOpacity>
                      </View>
                  </FadeInView>
              )}
              <ScrollView style={styles.scrollViewContainer}>
                  {loggedIn && (
                      <FavoriteButton
                          onFavoriteButtonChange={this.handleFavoriteButtonChange}
                          style={styles.favoriteButton}
                          isSelected={isFavorite}
                      />
                  )}
                  <View style={styles.imgContainer}>
                      <SliderBox
                          images={images}
                          sliderBoxHeight={250}
                          resizeMethod={'resize'}
                          resizeMode={'center'}
                          dotColor={colors.primary}
                          inactiveDotColor={colors.primaryDark}
                          imageLoadingColor={colors.primary}
                      />
                  </View>
                  <View style={styles.infoContainer}>
                      <View style={styles.productInfo}>
                          <Text style={styles.productName}>{name}</Text>
                          {selectedSeller.name && (
                              <TouchableOpacity
                                  style={styles.sellerInfo}
                                  underlayColor={colors.grayLight}
                                  onPress={() => {
                                      navigation.navigate('Map', {
                                          name: selectedSeller.name,
                                          sellerLocation: selectedSeller.location,
                                      });
                                  }}
                              >
                                  <Text style={styles.companyName}>{selectedSeller.name}</Text>
                                  <Text style={styles.distance}>
                                      {methods.distanceFormating(selectedSeller.distance)}
                                  </Text>
                              </TouchableOpacity>
                          )}
                      </View>
                      {selectedSeller.name && (
                          <View style={styles.valueInfo}>
                              <Text style={styles.priceEuro}>
                                  {selectedSeller.price} &#8364;
                              </Text>
                              <View style={styles.pricePointsView}>
                                  <Text style={styles.pricePoints}>
                                      {selectedSeller.price * 200}
                                  </Text>
                                  <Image
                                      source={orangePointsImg}
                                      style={styles.imgPoints}
                                  />
                              </View>
                          </View>
                      )}
                  </View>
                  {sellers.length > 1 && (
                      <View>
                          <Divider />
                          <View style={styles.sellerButton}>
                              <SellerSelectionButton
                                  onSellerChange={this.handleSellerChange}
                                  sellers={sellers}
                                  userPosition={userPosition}
                                  navigation={navigation}
                              />
                          </View>
                      </View>
                  )}

                  <Divider />
                  {sellers.length > 0 ? (
                      <View>
                          {selectedSeller.name
                && this.renderFilters(categoryType, id, selectedSeller.id)}
                          <NumberInput
                              label="Quantity"
                              style={styles.quantityInput}
                              onValueChange={this.handleQuantityChange}
                              initValue={1}
                              minValue={1}
                              maxValue={maxQuantity}
                              enable={maxQuantity !== null}
                          />
                          <Divider />
                          <ChoiceChip
                              label="Payment method"
                              data={['Money', 'Points']}
                              onSelctionChange={this.handlePaymentChange}
                              style={styles.choiceChip}
                          />
                          <View style={styles.buyButton}>
                              <ReservationButton
                                  label="RESERVATION"
                                  enable={enableBuyButton}
                                  small={true}
                                  quantity={quantity}
                                  payment={payment}
                                  filters={sizeFilter}
                                  orangePoints={userInfo.orangePoints}
                                  loggedInToken={loggedInToken}
                                  product={product}
                                  selectedSeller={selectedSeller}
                                  navigation={navigation}
                              />
                          </View>
                      </View>
                  ) : (
                      <View style={styles.msgContainer}>
                          <Icon
                              name="frown"
                              size={64}
                              style={styles.msgIcon}
                          />
                          <Text style={styles.msgText}>No stores found ...</Text>
                      </View>
                  )}
              </ScrollView>
          </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => {
    const { loggedIn, loggedInToken, userInfo } = getLoggedInState(state);
    const { favorites } = getUserFavoritesState(state);

    return {
        loggedIn,
        loggedInToken,
        favorites,
        userInfo,
    };
};

export default connect(mapStateToProps, { addFavorite, removeFavorite })(
    BuyRoute,
);

BuyRoute.propTypes = {
    userInfo: PropTypes.object,
    navigation: PropTypes.object,
    loggedInToken: PropTypes.string,
    loggedIn: PropTypes.bool,
    product: PropTypes.object,
    favorites: PropTypes.object,
    removeFavorite: PropTypes.func,
    addFavorite: PropTypes.func,
};
