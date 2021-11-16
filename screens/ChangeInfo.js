import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import TextField from '../components/TextField';
import DateField from '../components/DateField';
import Button from '../components/Button';

import { changeInfo } from '../redux/actions';
import { getLoggedInState } from '../redux/selectors';

import { changeInfoApi } from '../utils/api';

import colors from '../utils/colors';
import methods from '../utils/methods';

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
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
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    scroll: {
        backgroundColor: colors.transparent,
    },
    textField: {
        marginHorizontal: 16,
    },
});

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableButton: false,
            modalVisible: false,
            modalMsg: null,
            statusError: false,
            id: this.props.userInfo.id,
            email: this.props.userInfo.email,
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName,
            phoneNumber: this.props.userInfo.phoneNumber,
            birthDate: this.props.userInfo.birthDate,
            fieldsWithError: [],
            changedFields: [],
        };
    }

  setModalVisible = (msg, error) => {
      this.setState({ modalVisible: true, modalMsg: msg, statusError: error });
  };

  handleSavePress = () => {
      const {
          id,
          email,
          firstName,
          lastName,
          phoneNumber,
          birthDate,
      } = this.state;

      const { loggedInToken } = this.props;

      return changeInfoApi(
          id,
          email,
          firstName,
          lastName,
          phoneNumber,
          birthDate,
          loggedInToken,
      ).then((response) => {
          if (response.status === 200) {
              this.props.changeInfo(
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  birthDate,
              );
              this.setModalVisible(
                  'Η αλλαγή των στοιχείων σας ολοκληρώθηκε!',
                  false,
              );
          } else if (response.body.email) {
              this.setModalVisible(
                  'To email που εισαγάγατε χρησιμοποιείται ήδη.',
                  true,
              );
          } else if (response.body.phone_number) {
              this.setModalVisible(response.body.phone_number, true);
          }
      });
  };

  handleEmailChange = (email, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'email',
      );
      const changedFields = Object.values(this.state.changedFields).filter(
          (item) => item !== 'email',
      );

      if (error) {
          fieldsWithError.push('email');
          this.setState({ enableButton: false, fieldsWithError });
      } else if (email !== this.props.userInfo.email) {
          changedFields.push('email');
          if (fieldsWithError.length === 0) {
              this.setState({
                  email,
                  fieldsWithError,
                  changedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  email,
                  changedFields,
                  fieldsWithError,
              });
          }
      } else if (fieldsWithError.length === 0 && changedFields.length > 0) {
          this.setState({ enableButton: true });
      }
  };

  emailValidation = (email) => {
      if (methods.isEmpty(email)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      } if (!methods.validateEmail(email)) {
          return 'Παρακαλώ εισαγάτε το σωστό email σας.';
      }
      return null;
  };

  handleFirtNameChange = (firstName, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'firstName',
      );
      const changedFields = Object.values(this.state.changedFields).filter(
          (item) => item !== 'firstName',
      );

      if (error) {
          fieldsWithError.push('firstName');
          this.setState({ enableButton: false, fieldsWithError });
      } else if (firstName !== this.props.userInfo.firstName) {
          changedFields.push('firstName');
          if (fieldsWithError.length === 0) {
              this.setState({
                  firstName,
                  fieldsWithError,
                  changedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  firstName,
                  changedFields,
                  fieldsWithError,
              });
          }
      } else if (fieldsWithError.length === 0 && changedFields.length > 0) {
          this.setState({ enableButton: true });
      }
  };

  handleLastNameChange = (lastName, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'lastName',
      );
      const changedFields = Object.values(this.state.changedFields).filter(
          (item) => item !== 'lastName',
      );

      if (error) {
          fieldsWithError.push('lastName');
          this.setState({ enableButton: false, fieldsWithError });
      } else if (lastName !== this.props.userInfo.lastName) {
          changedFields.push('lastName');
          if (fieldsWithError.length === 0) {
              this.setState({
                  lastName,
                  fieldsWithError,
                  changedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  lastName,
                  changedFields,
                  fieldsWithError,
              });
          }
      } else if (fieldsWithError.length === 0 && changedFields.length > 0) {
          this.setState({ enableButton: true });
      }
  };

  nameValidation = (name) => {
      if (methods.isEmpty(name)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      }
      return null;
  };

  handlePhoneNumberChange = (phoneNumber, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'phoneNumber',
      );
      const changedFields = Object.values(this.state.changedFields).filter(
          (item) => item !== 'phoneNumber',
      );

      if (error) {
          fieldsWithError.push('phoneNumber');
          this.setState({ enableButton: false, fieldsWithError });
      } else if (phoneNumber !== this.props.userInfo.phoneNumber) {
          changedFields.push('phoneNumber');
          if (fieldsWithError.length === 0) {
              this.setState({
                  phoneNumber,
                  fieldsWithError,
                  changedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  phoneNumber,
                  changedFields,
                  fieldsWithError,
              });
          }
      } else if (fieldsWithError.length === 0 && changedFields.length > 0) {
          this.setState({ enableButton: true });
      }
  };

  phoneNumberValidation = (phoneNumber) => {
      if (methods.isEmpty(phoneNumber)) {
          return 'To πεδίο είναι υποχρεωτικό.';
      } if (!methods.validatePhoneNumber(phoneNumber)) {
          return 'Παρακαλώ εισαγάτε το σωστό αριθμό τηλεφώνου σας.';
      }
      return null;
  };

  handleBirthDateChange = (birthDate) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'birthDate',
      );
      const changedFields = Object.values(this.state.changedFields).filter(
          (item) => item !== 'birthDate',
      );

      if (birthDate !== this.props.userInfo.birthDate) {
          changedFields.push('birthDate');
          if (fieldsWithError.length === 0) {
              this.setState({
                  birthDate,
                  fieldsWithError,
                  changedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  birthDate,
                  changedFields,
                  fieldsWithError,
              });
          }
      } else if (fieldsWithError.length === 0 && changedFields.length > 0) {
          this.setState({ enableButton: true });
      }
  };

  renderModal = () => {
      const { modalMsg, statusError } = this.state;
      const { navigation } = this.props;
      const { refresh } = this.props.route.params;

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
                      onPress={() => {
                          refresh();
                          navigation.navigate('PersonalInfo');
                      }}
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
          email,
          firstName,
          lastName,
          phoneNumber,
          birthDate,
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
                          label="Email"
                          icon="at"
                          keyboardType="email-pushress"
                          initialValue={email}
                          disabled={false}
                          onChangeText={this.handleEmailChange}
                          validation={this.emailValidation}
                      />
                      <TextField
                          style={styles.textField}
                          icon="user"
                          label="Όνομα"
                          initialValue={firstName}
                          disabled={false}
                          onChangeText={this.handleFirtNameChange}
                          validation={this.nameValidation}
                      />
                      <TextField
                          /* eslint-disable react-native/no-inline-styles */
                          style={{ marginLeft: 52, marginRight: 16 }}
                          label="Επώνυμο"
                          initialValue={lastName}
                          disabled={false}
                          onChangeText={this.handleLastNameChange}
                          validation={this.nameValidation}
                      />
                      <TextField
                          style={styles.textField}
                          label="Τηλέφωνο"
                          icon="phone"
                          keyboardType="phone-pad"
                          initialValue={phoneNumber}
                          disabled={false}
                          onChangeText={this.handlePhoneNumberChange}
                          validation={this.phoneNumberValidation}
                      />
                      <DateField
                          style={styles.textField}
                          label="Ημερομηνια γεννησης"
                          icon="birthday-cake"
                          initialValue={birthDate}
                          onChangeDate={this.handleBirthDateChange}
                      />
                      <View style={styles.saveButton}>
                          <Button
                              label="ΑΠΟΘΗΚΕΥΣΗ"
                              small={true}
                              enable={enableButton}
                              onPress={enableButton ? this.handleSavePress : null}
                          />
                      </View>
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => {
    const { userInfo, loggedInToken } = getLoggedInState(state);
    return {
        userInfo,
        loggedInToken,
    };
};

ChangeInfo.propTypes = {
    route: PropTypes.object,
    userInfo: PropTypes.object,
    navigation: PropTypes.object,
    loggedInToken: PropTypes.string,
    changeInfo: PropTypes.object,
};

export default connect(mapStateToProps, { changeInfo })(ChangeInfo);
