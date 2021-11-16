import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Platform,
    Text,
} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';
import DropDownPicker from '../components/DropDownPicker';
import TextField from '../components/TextField';
import DateField from '../components/DateField';
import SetPassword from '../components/SetPassword';
import Button from '../components/Button';

import { signIn } from '../redux/actions';

import { signUpApi } from '../utils/api';

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
    dropDownPicker: {
        height: 52,
        marginLeft: 12,
        width: 120,
    },
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
    signUpButtonContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 8,
    },
    textField: {
        marginHorizontal: 16,
    },
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableButton: false,
            modalVisible: false,
            modalMsg: null,
            statusError: false,
            deviceId: null,
            email: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            birthDate: null,
            gender: null,
            password: null,
            fieldsWithError: [],
            completedFields: [],
        };
    }

    async componentDidMount() {
        const deviceId = DeviceInfo.getDeviceId();
        this.setState({ deviceId });
    }

  setModalVisible = (msg, error) => {
      this.setState({ modalVisible: true, modalMsg: msg, statusError: error });
  };

  handleSignUpPress = () => {
      const {
          enableButton,
          deviceId,
          email,
          firstName,
          lastName,
          password,
          phoneNumber,
          birthDate,
          gender,
      } = this.state;

      if (enableButton) {
          signUpApi(
              deviceId,
              email,
              firstName,
              lastName,
              password,
              phoneNumber,
              birthDate,
              gender,
          ).then((response) => {
              if (response.status === 200) {
                  this.props.signIn(response.token, response.userInfo);
                  this.setModalVisible('Η εγγραφή σας ολοκληρώθηκε!', false);
              } else if (response.body.email) {
                  this.setModalVisible(
                      'To email που εισαγάγατε χρησιμοποιείται ήδη.',
                      true,
                  );
              } else if (response.body.error) {
                  this.setModalVisible(response.body.error, true);
              }
          });
      }
  };

  handleEmailChange = (email, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'email',
      );
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'email',
      );

      if (error) {
          fieldsWithError.push('email');
          this.setState({ enableButton: false, fieldsWithError });
      } else {
          completedFields.push('email');
          if (fieldsWithError.length === 0 && completedFields.length === 7) {
              this.setState({
                  email,
                  fieldsWithError,
                  completedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  email,
                  completedFields,
                  fieldsWithError,
                  enableButton: false,
              });
          }
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
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'firstName',
      );

      if (error) {
          fieldsWithError.push('firstName');
          this.setState({ enableButton: false, fieldsWithError });
      } else {
          completedFields.push('firstName');
          if (fieldsWithError.length === 0 && completedFields.length === 7) {
              this.setState({
                  firstName,
                  fieldsWithError,
                  completedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  firstName,
                  completedFields,
                  fieldsWithError,
                  enableButton: false,
              });
          }
      }
  };

  handleLastNameChange = (lastName, error) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'lastName',
      );
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'lastName',
      );

      if (error) {
          fieldsWithError.push('lastName');
          this.setState({ enableButton: false, fieldsWithError });
      } else {
          completedFields.push('lastName');
          if (fieldsWithError.length === 0 && completedFields.length === 7) {
              this.setState({
                  lastName,
                  fieldsWithError,
                  completedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  lastName,
                  completedFields,
                  fieldsWithError,
                  enableButton: false,
              });
          }
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
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'phoneNumber',
      );

      if (error) {
          fieldsWithError.push('phoneNumber');
          this.setState({ enableButton: false, fieldsWithError });
      } else {
          completedFields.push('phoneNumber');
          if (fieldsWithError.length === 0 && completedFields.length === 7) {
              this.setState({
                  phoneNumber,
                  fieldsWithError,
                  completedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  phoneNumber,
                  completedFields,
                  fieldsWithError,
                  enableButton: false,
              });
          }
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
      const fieldsWithError = Object.values(this.state.fieldsWithError);
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'birthDate',
      );

      completedFields.push('birthDate');
      if (fieldsWithError.length === 0 && completedFields.length === 7) {
          this.setState({
              birthDate,
              fieldsWithError,
              completedFields,
              enableButton: true,
          });
      } else {
          this.setState({
              birthDate,
              completedFields,
              fieldsWithError,
              enableButton: false,
          });
      }
  };

  handleGenderChange = (gender) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError);

      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'gender',
      );

      completedFields.push('gender');
      if (fieldsWithError.length === 0 && completedFields.length === 7) {
          this.setState({
              gender,
              fieldsWithError,
              completedFields,
              enableButton: true,
          });
      } else {
          this.setState({
              gender,
              completedFields,
              fieldsWithError,
              enableButton: false,
          });
      }
  };

  handlePasswordChange = (password) => {
      const fieldsWithError = Object.values(this.state.fieldsWithError).filter(
          (item) => item !== 'password',
      );
      const completedFields = Object.values(this.state.completedFields).filter(
          (item) => item !== 'password',
      );

      if (password !== null) {
          completedFields.push('password');
          if (fieldsWithError.length === 0 && completedFields.length === 7) {
              this.setState({
                  password,
                  fieldsWithError,
                  completedFields,
                  enableButton: true,
              });
          } else {
              this.setState({
                  password,
                  completedFields,
                  fieldsWithError,
                  enableButton: false,
              });
          }
      } else {
          fieldsWithError.push('password');
          this.setState({
              completedFields,
              fieldsWithError,
              enableButton: false,
          });
      }
  };

  renderModal = () => {
      const { modalMsg, statusError } = this.state;
      const { navigation } = this.props;

      if (statusError) {
          return (
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <MaterialIcons
                          name="error-outline"
                          size={64}
                          style={{ color: colors.grayDark }}
                      />
                      <Text style={styles.modalText}>{modalMsg}</Text>
                      <Button
                          onPress={() => this.setState({ modalVisible: false, enableButton: false })
                          }
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
                  <MaterialIcons
                      name="check"
                      size={64}
                      style={{ color: colors.grayDark }}
                  />
                  <Text style={styles.modalText}>{modalMsg}</Text>
                  <Button
                      onPress={() => {
                          this.setState({ modalVisible: false });
                          navigation.navigate('Profile', { screen: 'Profile' });
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
          enableButton, modalVisible, gender, birthDate,
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
                          keyboardType="email-address"
                          disabled={false}
                          onChangeText={this.handleEmailChange}
                          validation={this.emailValidation}
                      />
                      <TextField
                          style={styles.textField}
                          icon="user"
                          label="Όνομα"
                          disabled={false}
                          onChangeText={this.handleFirtNameChange}
                          validation={this.nameValidation}
                      />
                      <TextField
                          /* eslint-disable react-native/no-inline-styles */
                          style={{ marginLeft: 52, marginRight: 16 }}
                          label="Επώνυμο"
                          disabled={false}
                          onChangeText={this.handleLastNameChange}
                          validation={this.nameValidation}
                      />
                      <TextField
                          style={styles.textField}
                          label="Τηλέφωνο"
                          icon="phone"
                          keyboardType="phone-pad"
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
                      <View
                          style={{
                              flexDirection: 'row',
                              marginHorizontal: 16,
                              marginVertical: 16,
                              alignItems: 'center',
                          }}
                      >
                          <FontAwesome5
                              name="venus-mars"
                              size={24}
                              style={{ color: colors.gray, width: 24, height: 24 }}
                          />
                          <DropDownPicker
                              items={[
                                  { label: 'Άνδρας', value: 10 },
                                  { label: 'Γυναίκα', value: 20 },
                              ]}
                              defaultNull={gender === null}
                              containerStyle={styles.dropDownPicker}
                              placeholder="Φύλο"
                              onChangeItem={(item) => this.handleGenderChange(item.value)}
                          />
                      </View>
                      <SetPassword
                          icon="key"
                          style={styles.textField}
                          onPasswordChange={this.handlePasswordChange}
                          label="Κωδικός"
                          confirmationLabel="Επιβεβαίωση κωδικού"
                      />
                      <View style={styles.signUpButtonContainer}>
                          <Button
                              label="ΕΓΓΡΑΦΗ"
                              small={true}
                              enable={enableButton}
                              onPress={this.handleSignUpPress}
                          />
                      </View>
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

export default connect(null, { signIn })(SignUp);

SignUp.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object,
    signIn: PropTypes.func,
};
