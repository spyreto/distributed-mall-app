import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    PermissionsAndroid,
    Alert,
} from 'react-native';

import PropTypes from 'prop-types';

import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import SearchInput from '../components/SearchInput';
import DistanceSlider from '../components/DistanceSlider';
import Button from '../components/Button';

import { setPosition } from '../redux/actions';
import { getIsFetchingPositionState } from '../redux/selectors';

import { fetchCategories } from '../utils/api';

import store from '../store';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    appContainer: {
        alignItems: 'center',
        flex: 1,
    },
    distanceSlider: {
        height: 40,
        marginVertical: 16,
        width: 304,
    },
    icon: {
        color: colors.primary,
        margin: 16,
    },
    logo: {
        alignSelf: 'center',
        height: 200,
        marginVertical: 8,
        width: 300,
    },
    msgContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    msgText: {
        color: colors.primary,
        fontSize: 24,
    },
    searchButton: {
        alignItems: 'center',
        marginVertical: 16,
    },
    searchInput: {
        height: 40,
        marginHorizontal: 12,
        marginVertical: 16,
        width: 280,
    },
});

const dmLogoImg = require('../img/DMlogo.png');

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: store.getState().categories,
            error: store.getState().error,
            distance: 16000,
            keyword: '',
        };
    }

    async componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        Geolocation.getCurrentPosition(
            (position) => {
                const longitude = JSON.stringify(position.coords.longitude);
                const latitude = JSON.stringify(position.coords.latitude);
                const userPosition = {
                    userLongitude: longitude,
                    userLatitude: latitude,
                };

                this.props.setPosition(userPosition);
            },
            /* eslint-disable no-unused-vars */
            (error) => Alert.alert(
                'Error',
                'An error occurred, please restart the application',
            ),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
        );

        this.unsubscribe = store.onChange(() => this.setState({
            categories: store.getState().categories,
            error: store.getState().error,
        }));

        const categories = await fetchCategories();

        store.setState({ categories, isFetchingCategories: false, filters: {} });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

  handleDistanceChange = (distance) => {
      this.setState({ distance });
  };

  handleKeywordChange = (keyword) => {
      this.setState({ keyword });
  };

  handleSearchButtonPress = () => {
      const { navigation } = this.props;
      const { distance, keyword, categories } = this.state;
      
      /* Check non-empty keyword */      
      if (keyword !== '') {
          navigation.navigate('Results', {
              keyword,
              distance,
              categories,
          });
      }
  };

  render() {
      const { error } = this.state;
      const { isFetchingPosition } = this.props;

      return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <ScrollView>
                  <StatusBar
                      backgroundColor={colors.primaryDark}
                      barStyle="dark-content"
                  />
                  <Image source={dmLogoImg} style={styles.logo} />
                  {isFetchingPosition && (
                      <View style={styles.msgContainer}>
                          <ActivityIndicator size={64} color={colors.primary} />
                      </View>
                  )}
                  {error && (
                      <View style={styles.msgContainer}>
                          <Icon
                              name="exclamation"
                              size={64}
                              style={styles.icon}
                          />
                          <Text style={styles.msgText}>An error occurred ...</Text>
                      </View>
                  )}
                  {!isFetchingPosition && !error && (
                      <KeyboardAvoidingView style={styles.appContainer}>
                          <View>
                              <SearchInput
                                  placeholder="Looking for..."
                                  onKeywordChange={this.handleKeywordChange}
                                  style={styles.searchInput}
                              />
                          </View>
                          <View>
                              <DistanceSlider
                                  onDistanceChange={this.handleDistanceChange}
                                  maxDistance={16000}
                                  style={styles.distanceSlider}
                                  value={16000}
                              />
                          </View>
                          <View style={styles.searchButton}>
                              <Button
                                  onPress={this.handleSearchButtonPress}
                                  label="SEARCH"
                                  small={false}
                              />
                          </View>
                      </KeyboardAvoidingView>
                  )}
              </ScrollView>
          </TouchableWithoutFeedback>
      );
  }
}

const mapStateToProps = (state) => {
    const { isFetchingPosition } = getIsFetchingPositionState(state);
    return {
        isFetchingPosition,
    };
};

export default connect(mapStateToProps, { setPosition })(Search);

Search.propTypes = {
    navigation: PropTypes.object,
    setPosition: PropTypes.func,
    isFetchingPosition: PropTypes.bool,
};
