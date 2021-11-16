import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    SafeAreaView,
    Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome5';

import TextField from '../components/TextField';
import Button from '../components/Button';

import colors from '../utils/colors';
import methods from '../utils/methods';

import { changePasswordApi } from '../utils/api';

const styles = StyleSheet.create({
    changeButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    container: {
        flex: 1,
        marginTop: Platform.select({ ios: 8, android: 32 }),
    },
    contentContainer: {},
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        elevation: 5,
        margin: 20,
        padding: 35,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    scroll: {
        backgroundColor: colors.transparent,
    },
    textField: {
        marginHorizontal: 16,
    },
});

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableButton: false,
            modalVisible: false,
            modalMsg: null,
            statusError: false,
            oldPassword: null,
            newPassword: null,
            newPasswordConfirm: null,
        };
    }

  handleChangePress = () => {
      const { oldPassword, newPassword } = this.state;
      const { loggedInToken } = this.props.route.params;
      const { id } = this.props;

      return changePasswordApi(
          id,
          oldPassword,
          newPassword,
          loggedInToken,
      ).then((response) => {
          if (response.status === 200) {
              this.setModalVisible('Η αλλαγή του κωδικού σας ολοκληρώθηκε!', false);
          } else if (response.body) {
              this.setModalVisible(response.body, true);
          }
      });
  };

  handleOldPasswordChange = (oldPassword) => {
      const { newPassword, newPasswordConfirm } = this.state;

      if (newPassword !== null && newPasswordConfirm !== null) {
          if (
              oldPassword.length > 0
        && newPassword.length > 0
        && newPasswordConfirm !== newPassword
          ) {
              this.setState({ oldPassword, enableButton: true });
          } else {
              this.setState({ oldPassword, enableButton: false });
          }
      } else {
          this.setState({ oldPassword, enableButton: false });
      }
  };

  oldPasswordValidation = (oldPassword) => {
      if (methods.isEmpty(oldPassword)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      }
      return null;
  };

  handleNewPasswordChange = (newPassword) => {
      const { oldPassword, newPasswordConfirm } = this.state;

      if (
          oldPassword !== null
      && newPassword !== null
      && newPasswordConfirm !== newPassword
      ) {
          this.setState({ newPassword, enableButton: true });
      } else {
          this.setState({ newPassword, enableButton: false });
      }
  };

  newPasswordValidation = (newPassword) => {
      const { newPasswordConfirm } = this.state;
      if (methods.isEmpty(newPassword)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      } if (newPassword !== newPasswordConfirm) {
          return 'Τα πεδιά του νέου κωδικού δεν ταιριάζουν.';
      }
      return null;
  };

  handleNewPasswordConfirmChange = (newPasswordConfirm) => {
      const { oldPassword, newPassword } = this.state;

      if (
          oldPassword !== null
      && newPasswordConfirm !== null
      && newPasswordConfirm !== newPassword
      ) {
          this.setState({
              newPasswordConfirm,
              enableButton: true,
          });
      } else {
          this.setState({
              newPasswordConfirm,
              enableButton: false,
          });
      }
  };

  newPasswordConfirmValidation = (newPasswordConfirm) => {
      const { newPassword } = this.state;
      if (methods.isEmpty(newPasswordConfirm)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      } if (newPassword !== newPasswordConfirm) {
          return 'Τα πεδιά του νέου κωδικού δεν ταιριάζουν.';
      }
      return null;
  };

  renderModal = () => {
      const { modalMsg, statusError } = this.state;
      const { navigation } = this.props;

      if (statusError) {
          return (
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Icon
                          name="error-outline"
                          size={64}
                          style={{ color: colors.grayDark }}
                      />
                      <Text style={styles.modalText}>{modalMsg}</Text>
                      <Button
                          onPress={() => this.setState({ modalVisible: false })}
                          label="ΟΚ"
                          small={true}
                      />
                  </View>
              </View>
          );
      }
      return (
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Icon name="check" size={64} style={{ color: colors.grayDark }} />
                  <Text style={styles.modalText}>{modalMsg}</Text>
                  <Button
                      onPress={() => navigation.navigate('PersonalInfo')}
                      label="ΟΚ"
                      small={true}
                  />
              </View>
          </View>
      );
  };

  render() {
      const {
          enableButton,
          modalVisible,
      } = this.state;

      return (
          <SafeAreaView>
              <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={styles.contentContainer}
                  keyboardShouldPersistTaps="handled"
              >
                  <Modal isVisible={modalVisible}>{this.renderModal()}</Modal>
                  <View style={styles.container}>
                      <TextField
                          style={styles.textField}
                          label="Προηγούμενος κωδικός"
                          secureTextEntry={true}
                          disabled={false}
                          onChangeText={this.handleOldPasswordChange}
                          validation={this.oldPasswordValidation}
                      />
                      <TextField
                          style={styles.textField}
                          label="Νέος κωδικός"
                          secureTextEntry={true}
                          disabled={false}
                          onChangeText={this.handleNewPasswordChange}
                          validation={this.newPasswordValidation}
                      />
                      <TextField
                          style={styles.textField}
                          label="Επιβεβαίωση νέος κωδικού"
                          secureTextEntry={true}
                          disabled={false}
                          onChangeText={this.handleNewPasswordConfirmChange}
                          validation={this.newPasswordConfirmValidation}
                      />
                      <View style={styles.changeButton}>
                          <Button
                              label="ΑΛΛΑΓΗ"
                              small={true}
                              enable={enableButton}
                              onPress={enableButton ? this.handleChangePress : null}
                          />
                      </View>
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

Profile.propTypes = {
    id: PropTypes.number,
    route: PropTypes.object,
    navigation: PropTypes.object,
};
