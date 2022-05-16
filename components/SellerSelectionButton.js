import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    FlatList,
    Image,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import methods from '../utils/methods';
import colors from '../utils/colors';

const keyExtractor = ({ id }) => id.toString();

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    closeModalButton: {
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: 6,
        elevation: 2,
        marginTop: 12,
    },
    closeModalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 6,
        textAlign: 'center',
    },
    companyName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 2,
    },
    distance: {
        fontSize: 12,
        marginTop: 2,
    },
    icon: {
        color: colors.grayDark,
        margin: 16,
    },
    imgPoints: {
        height: 12,
        width: 12,
    },
    modalView: {
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
        margin: 20,
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    priceEuro: {
        fontSize: 12,
        textAlign: 'right',
    },
    pricePoints: {
        color: colors.primary,
        fontSize: 12,
        marginRight: 5,
        textAlign: 'right',
    },
    pricePointsView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    sellerInfo: {
        flexDirection: 'column',
        marginLeft: 12,
        marginVertical: 10,
    },
    sellerInfoContainer: {
        borderColor: colors.gray,
        borderLeftWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sellerListItemContainer: {
        borderColor: colors.gray,
        borderRadius: 6,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 6,
        textAlign: 'center',
    },
    valueInfo: {
        flexDirection: 'column',
        marginRight: 12,
        marginVertical: 10,
    },
});

const dmLogoImg = require('../img/DMlogo.png');

export default class SellerButton extends React.Component {
  state = {
      modalVisible: false,
  };

 /* Modal remains open after returning with a back button from the map screen */
  backButtonOpenModal = () => {
      this.setState({ modalVisible: true });
  };

  /* Handling modal state */
  handleModalState = () => {
      this.setState((previousState) => ({
          modalVisible: !previousState.modalVisible,
      }));
  };

  renderSeller = ({ item }) => {
      const { onSellerChange, navigation } = this.props;

      return (
          <TouchableHighlight
              underlayColor={colors.grayLight}
              onPress={() => {
                  this.handleModalState();
                  onSellerChange(item);
              }}
          >
              <View style={styles.sellerListItemContainer}>
                  <TouchableOpacity
                      underlayColor={colors.grayLight}
                      onPress={() => {
                          navigation.navigate('Map', {
                              name: item.name,
                              sellerLocation: item.location,
                              backButtonOpenModal: this.backButtonOpenModal,
                          });
                          this.handleModalState();
                      }}
                  >
                      <Icon
                          name="map-marker-alt"
                          size={24}
                          style={styles.icon}
                      />
                  </TouchableOpacity>
                  <View style={styles.sellerInfoContainer}>
                      <View style={styles.sellerInfo}>
                          <Text style={styles.companyName}>{item.name}</Text>
                          <Text style={styles.distance}>
                Distance: {methods.distanceFormating(item.distance)}
                          </Text>
                      </View>
                      <View style={styles.valueInfo}>
                          <Text style={styles.priceEuro}>{item.price} &#8364;</Text>
                          <View style={styles.pricePointsView}>
                              <Text style={styles.pricePoints}>{item.price * 200}</Text>
                              <Image
                                  source={dmLogoImg}
                                  style={styles.imgPoints}
                              />
                          </View>
                      </View>
                  </View>
              </View>
          </TouchableHighlight>
      );
  };

  render() {
      const { modalVisible } = this.state;
      const { sellers } = this.props;

      /* Classification of sellers based on price */
      const sellersSorted = sellers.sort((a, b) => a.price > b.price);

      return (
          <View style={styles.centeredView}>
              <Modal animationType="slide" transparent={true} visible={modalVisible}>
                  <SafeAreaView style={styles.modalView}>
                      <FlatList
                          data={sellersSorted}
                          keyExtractor={keyExtractor}
                          renderItem={this.renderSeller}
                      />
                      <TouchableOpacity
                          style={styles.closeModalButton}
                          onPress={this.handleModalState}
                      >
                          <Text style={styles.closeModalButtonText}>CLOSE</Text>
                      </TouchableOpacity>
                  </SafeAreaView>
              </Modal>
              <TouchableOpacity style={styles.button} onPress={this.handleModalState}>
                  <Text style={styles.textButton}>SELECT SELLER</Text>
              </TouchableOpacity>
          </View>
      );
  }
}

SellerButton.propTypes = {
    navigation: PropTypes.object,
    sellers: PropTypes.array,
    onSellerChange: PropTypes.func,
};
