import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import TextField from '../components/TextField';
import ArrowButton from '../components/ArrowButton';
import Divider from '../components/Divider';

import { signOut, clearProductsData } from '../redux/actions';
import { getLoggedInState } from '../redux/selectors';

import methods from '../utils/methods';
import colors from '../utils/colors';

const styles = StyleSheet.create({
    arrowButton: {
        marginLeft: 52,
    },
    container: {
        flex: 1,
        marginTop: Platform.select({ ios: 8, android: 32 }),
    },
    scroll: {
        backgroundColor: colors.transparent,
    },
    textField: {
        marginHorizontal: 16,
    },
    textFieldLastName: {
        marginLeft: 52,
        marginRight: 16,
    },
});

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
        };
    }

  refresh = () => {
      this.props.navigation.dispatch(StackActions.replace('PersonalInfo'));
  };

  logout = () => {
      const { navigation } = this.props;
      this.props.clearProductsData();
      this.props.signOut();
      navigation.navigate('Profile');
  };

  render() {
      const { navigation } = this.props;
      const { userInfo } = this.state;

      const birthDate = methods.getJSDatetToString(userInfo.birthDate);

      return (
          <SafeAreaView>
              <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={styles.contentContainer}
                  keyboardShouldPersistTaps="handled"
              >
                  <View style={styles.container}>
                      <TextField
                          style={styles.textField}
                          label="Email"
                          icon="at"
                          keyboardType="email-address"
                          initialValue={userInfo.email}
                          disabled={true}
                      />
                      <TextField
                          style={styles.textField}
                          icon="user"
                          label="Όνομα"
                          initialValue={userInfo.firstName}
                          disabled={true}
                      />
                      <TextField
                          style={styles.textFieldLastName}
                          label="Επώνυμο"
                          initialValue={userInfo.lastName}
                          disabled={true}
                      />
                      <TextField
                          style={styles.textField}
                          label="Τηλέφωνο"
                          icon="phone"
                          keyboardType="phone-pad"
                          initialValue={userInfo.phoneNumber}
                          disabled={true}
                      />
                      <TextField
                          style={styles.textField}
                          label="Ημερομηνια γεννησης"
                          icon="birthday-cake"
                          initialValue={birthDate}
                          disabled={true}
                      />
                      <Divider />
                      <ArrowButton
                          label="Αλλαγή στοιχείων"
                          onPress={() => navigation.navigate('ChangeInfo', { refresh: this.refresh })
                          }
                          style={styles.arrowButton}
                      />
                      <ArrowButton
                          label="Αλλαγή κωδικού"
                          onPress={() => navigation.navigate('ChangePassword', {
                              loggedInToken: userInfo.loggedInToken,
                          })
                          }
                          style={styles.arrowButton}
                      />
                      <ArrowButton
                          label="Αποσύνδεση"
                          onPress={this.logout}
                          style={styles.arrowButton}
                      />
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

const mapStateToProps = (state) => {
    const { userInfo } = getLoggedInState(state);
    return {
        userInfo,
    };
};

export default connect(mapStateToProps, { signOut, clearProductsData })(
    ProfileInfo,
);

ProfileInfo.propTypes = {
    userInfo: PropTypes.object,
    navigation: PropTypes.object,
    loggedInToken: PropTypes.string,
    signOut: PropTypes.func,
    clearProductsData: PropTypes.func,
};
