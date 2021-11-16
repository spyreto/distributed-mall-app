import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';

import PropTypes from 'prop-types';

import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import TextField from '../components/TextField';
import Button from '../components/Button';

import { signIn, setProductsData } from '../redux/actions';

import { auth } from '../utils/api';
import colors from '../utils/colors';

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    container: {
        flex: 1,
    },
    contentContainer: {},
    logo: {
        alignSelf: 'center',
        height: 200,
        marginVertical: 16,
        width: 300,
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
    signInButtonContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    signUpButtonContainer: {
        alignItems: 'center',
    },
    signUpText: {
        color: colors.gray,
        fontSize: 16,
    },
    textField: {
        marginHorizontal: 16,
    },
});

const dmLogoImg = require('../img/DMlogo2.png');

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            modalVisible: false,
        };
    }

  setModalVisible = () => {
      this.setState((previousState) => ({
          modalVisible: !previousState.modalVisible,
      }));
  };

  handleSignInButtonPress = () => {
      const { prevScreen } = this.props.route.params;

      const { navigation } = this.props;
      if (this.state.email && this.state.password) {
          auth(this.state.email, this.state.password).then((response) => {
              if (response.token) {
                  this.props.signIn(response.token, response.userInfo);
                  this.props.setProductsData(response.favorites, response.history);
                  navigation.navigate(prevScreen);
              } else {
                  this.setModalVisible();
              }
          });
      }
  };

  render() {
      const { modalVisible } = this.state;
      const { navigation } = this.props;

      return (
          <SafeAreaView>
              <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={styles.contentContainer}
                  keyboardShouldPersistTaps="handled"
              >
                  <Modal isVisible={modalVisible}>
                      <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                              <Text style={styles.modalText}>
                  Εσφαλμένος κωδικός ή email!
                              </Text>
                              <Button
                                  onPress={this.setModalVisible}
                                  label="ΟΚ"
                                  small={true}
                              />
                          </View>
                      </View>
                  </Modal>
                  <View style={styles.container}>
                      <Image source={dmLogoImg} style={styles.logo} />
                      <TextField
                          style={styles.textField}
                          label="Email"
                          keyboardType="email-address"
                          onChangeText={(text) => {
                              this.setState({ email: text });
                          }}
                      />
                      <TextField
                          style={styles.textField}
                          label="Κωδικός"
                          secureTextEntry={true}
                          onChangeText={(text) => {
                              this.setState({ password: text });
                          }}
                      />
                      <View style={styles.signInButtonContainer}>
                          <Button
                              onPress={this.handleSignInButtonPress}
                              label="ΣΥΝΔΕΣΗ"
                              small={true}
                          />
                      </View>
                      <View style={styles.signUpButtonContainer}>
                          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                              <Text style={styles.signUpText}>Δημιουργία λογαριασμού</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

export default connect(null, { signIn, setProductsData })(SignIn);

SignIn.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object,
    signIn: PropTypes.func,
    setProductsData: PropTypes.func,
};
