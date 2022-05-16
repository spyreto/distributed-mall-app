import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import Button from './Button';

import { reservationApi } from '../utils/api';
import { addHistoryItem } from '../redux/actions';
import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalButton: {
        marginLeft: 8,
    },
    modalButtonText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 8,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 8,
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        justifyContent: 'center',
    },
    reservationButtonContainer: {
        alignItems: 'center',
    },
    supportingText: {
        color: colors.gray,
        fontSize: 16,
        textAlign: 'left',
    },
    supportingTextContainer: {
        marginBottom: 28,
        marginHorizontal: 24,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    titleTextContainer: {
        marginHorizontal: 24,
        marginVertical: 20,
    },
});

class ReservationButton extends React.Component {
  state = {
      modalVisible: false,
      errorModalVisible: false,
      messege: null,
  };

  /* Handling modal state */
  handleModalState = () => {
      this.setState({ modalVisible: !this.state.modalVisible });
  };

  /* Handling modal state */
  handleErrorModalState = () => {
      this.setState({ errorModalVisible: !this.state.errorModalVisible });
  };

  handleReservationButtonPress = () => {
      const {
          quantity, payment, selectedSeller, orangePoints,
      } = this.props;
      if (
          payment === 'Points'
      && !(quantity * selectedSeller.price * 200 < orangePoints)
      ) {
          const message = 'Your orange points are not enough ...';
          this.setState({ errorModalVisible: true, message });
      } else {
          this.handleModalState();
      }
  };

  handleConfirmReservationPress = () => {
      const {
          quantity,
          selectedSeller,
          payment,
          product,
          filters,
          loggedInToken,
          navigation,
      } = this.props;

      let paidWithMoney;

      if (payment === 'Money') {
          paidWithMoney = true;
      } else {
          paidWithMoney = false;
      }
      this.handleModalState();

      return reservationApi(
          loggedInToken,
          product.id,
          filters,
          quantity,
          paidWithMoney,
          selectedSeller.id,
      ).then((res) => {
          const { status, message } = res;
          if (status >= 400) {
              this.setState({ errorModalVisible: true, message });
          } else {
              this.setState({ modalVisible: false });

              navigation.navigate('Map', {
                  name: selectedSeller.name,
                  sellerLocation: selectedSeller.location,
              });

              this.props.addHistoryItem(product, selectedSeller, quantity, payment);
          }
      });
  };

  renderModal = () => {
      const {
          payment, selectedSeller,
      } = this.props;

      return (
          <View style={styles.modalContainer}>
              <View style={styles.titleTextContainer}>
                  <Text style={styles.titleText}>Reservation confirmation</Text>
              </View>
              <View style={styles.supportingTextContainer}>
                  <Text style={styles.supportingText}>
         Your order will be in the store until the end of store hours. 
         Please go to the store to complete the purchase
                      {payment === 'Money'
                          ? `and earn ${
                              parseInt((selectedSeller.price * 10), 10)
                          } orange points!`
                          : '.'}
                  </Text>
              </View>
              <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                      style={styles.modalButton}
                      onPress={this.handleModalState}
                  >
                      <Text style={styles.modalButtonText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.modalButton}
                      onPress={this.handleConfirmReservationPress}
                  >
                      <Text style={styles.modalButtonText}>CONFIRM</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  };

  renderErrorModal = () => {
      const { message } = this.state;
      return (
          <View style={styles.modalContainer}>
              <View style={styles.titleTextContainer}>
                  <Text style={styles.titleText}>Unable to reserve</Text>
              </View>
              <View style={styles.supportingTextContainer}>
                  <Text style={styles.supportingText}>{message}</Text>
              </View>
              <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                      style={styles.modalButton}
                      onPress={this.handleErrorModalState}
                  >
                      <Text style={styles.modalButtonText}>OK</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  };

  render() {
      const { modalVisible, errorModalVisible } = this.state;

      const {
          enable, style, label, small,
      } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <View style={styles.reservationButtonContainer}>
                  <Button
                      onPress={this.handleReservationButtonPress}
                      label={label}
                      small={small}
                      enable={enable}
                  />
              </View>
              <Modal isVisible={modalVisible} transparent={true}>
                  {this.renderModal()}
              </Modal>
              <Modal isVisible={errorModalVisible} transparent={true}>
                  {this.renderErrorModal()}
              </Modal>
          </View>
      );
  }
}

export default connect(null, { addHistoryItem })(ReservationButton);

ReservationButton.propTypes = {
    navigation: PropTypes.object,
    loggedInToken: PropTypes.string,
    addHistoryItem: PropTypes.func,
    product: PropTypes.object,
    quantity: PropTypes.number,
    filters: PropTypes.object,
    selectedSeller: PropTypes.object,
    paidWithMoney: PropTypes.bool,
    payment: PropTypes.string,
    orangePoints: PropTypes.number,
    enable: PropTypes.bool,
    small: PropTypes.bool,
    style: PropTypes.object,
    label: PropTypes.string,
};
