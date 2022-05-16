import React from 'react';

import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    DropdownButton: {
        alignItems: 'center',
        borderColor: colors.gray,
        borderRadius: 6,
        borderWidth: 2,
        flexDirection: 'row',
    },
    icon: {
        color: colors.grayDark,
        paddingRight: 16,
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
    textDropdownButton: {
        color: colors.grayDark,
        fontSize: 18,
        paddingHorizontal: 16,
        paddingVertical: 6,
        textAlign: 'center',
    },
});

export default class Dropdown extends React.Component {
  state = {
      modalVisible: false,
      payment: false,
  };

  renderModal() {
      const { modalVisible } = this.state;

      return (
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
              <SafeAreaView style={styles.modalView}>
                  <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => {
                          this.setState({ modalVisible: !this.state.modalVisible });
                          this.setState({ payment: 'Money' });
                      }}
                  >
                      <Text style={styles.closeModalButtonText}>Money</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => {
                          this.setState({ modalVisible: !this.state.modalVisible });
                          this.setState({ payment: 'Points' });
                      }}
                  >
                      <Text style={styles.closeModalButtonText}>Points</Text>
                  </TouchableOpacity>
              </SafeAreaView>
          </Modal>
      );
  }

  render() {
      const { payment } = this.state;
      const { modalVisible } = this.state;

      return (
          <View>
              <TouchableOpacity
                  style={styles.DropdownButton}
                  onPress={() => {
                      this.setState({ modalVisible: true });
                  }}
              >
                  <Text style={styles.textDropdownButton}>
                      {payment || 'Pay with'}
                  </Text>
                  <Icon
                      name={modalVisible ? 'chevron-down' : 'chevron-right'}
                      size={18}
                      style={styles.icon}
                  />
              </TouchableOpacity>
              {this.renderModal()}
          </View>
      );
  }
}
