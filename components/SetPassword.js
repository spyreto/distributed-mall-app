import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OutlinedTextField } from 'react-native-material-textfield';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';
import methods from '../utils/methods';

const styles = StyleSheet.create({
    confirmContainer: {
        marginLeft: 36,
    },
    container: {
        flex: 1,
        marginVertical: 8,
    },
    fieldContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    icon: {
        height: 24,
        marginRight: 12,
        width: 24,
    },
    textFieldContainer: {
        flex: 1,
    },
});

export default class SetPassword extends React.Component {
  state = {
      passwordErrorMsg: '',
      passwordConfirmErrorMsg: '',
      onFocus: false,
      onFocusConfirm: false,
      password: null,
      passwordConfirm: null,
  };

  onFocusPress = () => {
      this.setState((previousState) => ({ onFocus: !previousState.onFocus }));
  };

  onFocusConfirmPress = () => {
      this.setState((previousState) => ({
          onFocusConfirm: !previousState.onFocusConfirm,
      }));
  };

  handleOnChangePassword = (password) => {
      const { passwordConfirm } = this.state;
      const { onPasswordChange } = this.props;

      if (methods.isEmpty(password)) {
          this.setState({
              password,
              passwordErrorMsg: 'To πεδίο είναι υποχρεωτικό.',
          });
      } else if (password !== passwordConfirm) {
          if (!methods.isEmpty(passwordConfirm)) {
              this.setState({
                  password,
                  passwordErrorMsg: 'Τα πεδιά του κωδικού δεν ταιριάζουν.',
                  passwordConfirmErrorMsg: 'Τα πεδιά του κωδικού δεν ταιριάζουν.',
              });
          } else {
              this.setState({ password });
          }
      } else if (password.length < 8) {
          this.setState({
              password,
              passwordErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.',
              passwordConfirmErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.',
          });
      } else if (!methods.checkPassword(password)) {
          this.setState({
              password,
              passwordErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον ένα γράμμα και έναν αριθμό',
              passwordConfirmErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον ένα γράμμα και έναν αριθμό',
          });
      } else {
          this.setState({
              password,
              passwordErrorMsg: null,
              passwordConfirmErrorMsg: null,
          });
          onPasswordChange(password);
      }
  };

  handleOnChangePasswordConfirm = (passwordConfirm) => {
      const { password } = this.state;
      const { onPasswordChange } = this.props;

      if (methods.isEmpty(passwordConfirm)) {
          this.setState({
              passwordConfirm,
              passwordConfirmErrorMsg: 'To πεδίο είναι υποχρεωτικό.',
          });
      } else if (password !== passwordConfirm) {
          this.setState({
              passwordConfirm,
              passwordErrorMsg: 'Τα πεδιά του κωδικού δεν ταιριάζουν.',
              passwordConfirmErrorMsg: 'Τα πεδιά του κωδικού δεν ταιριάζουν.',
          });
      } else if (password.length < 8) {
          this.setState({
              passwordConfirm,
              passwordErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.',
              passwordConfirmErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.',
          });
      } else if (!methods.checkPassword(password)) {
          this.setState({
              passwordConfirm,
              passwordErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον ένα γράμμα και έναν αριθμό',
              passwordConfirmErrorMsg:
          'O κωδικός πρέπει να περιέχει τουλάχιστον ένα γράμμα και έναν αριθμό',
          });
      } else {
          this.setState({
              passwordConfirm,
              passwordErrorMsg: null,
              passwordConfirmErrorMsg: null,
          });
          onPasswordChange(password);
      }
  };

  render() {
      const {
          passwordErrorMsg,
          passwordConfirmErrorMsg,
          onFocus,
      } = this.state;
      const {
          icon, style, label, confirmationLabel,
      } = this.props;

      return (
          <View style={{ ...style, ...styles.container }}>
              <View style={styles.fieldContainer}>
                  {icon && (
                      <Icon
                          name={icon}
                          size={24}
                          style={
                              onFocus
                                  ? [styles.icon, { color: colors.primary }]
                                  : [styles.icon, { color: colors.gray }]
                          }
                      />
                  )}
                  <View style={styles.textFieldContainer}>
                      <OutlinedTextField
                          label={label}
                          placeholderTextColor={colors.grayDark}
                          secureTextEntry={true}
                          baseColor={colors.gray}
                          tintColor={colors.primary}
                          onFocus={this.onFocusPress}
                          onBlur={this.onFocusPress}
                          onChangeText={this.handleOnChangePassword}
                          error={passwordErrorMsg}
                      />
                  </View>
              </View>
              <View style={styles.confirmContainer}>
                  <OutlinedTextField
                      label={confirmationLabel}
                      placeholderTextColor={colors.grayDark}
                      secureTextEntry={true}
                      baseColor={colors.gray}
                      tintColor={colors.primary}
                      onFocus={this.onFocusConfirmPress}
                      onBlur={this.onFocusConfirmPress}
                      onChangeText={this.handleOnChangePasswordConfirm}
                      error={passwordConfirmErrorMsg}
                  />
              </View>
          </View>
      );
  }
}

SetPassword.propTypes = {
    icon: PropTypes.string,
    confirmationLabel: PropTypes.string,
    onPasswordChange: PropTypes.func,
    label: PropTypes.string,
    style: PropTypes.object,
};
