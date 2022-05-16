import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

import MapView, { Marker, Callout } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
    navigationToSellerText: {
        color: colors.gray,
        fontSize: 16,
        textAlign: 'center',
    },
    sellerNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginBottom: 1,
        };
    }

    componentWillUnmount() {
    /* Open the modal with the sellers when returning to the product screen */
        const { backButtonOpenModal } = this.props.route.params;
        if (backButtonOpenModal) {
            backButtonOpenModal();
        }
    }

  onMapReady = () => {
      this.setState({ marginBottom: 0 });
  };

  /* Navigation function via google maps app */
  handleGetDirections = () => {
      /* Seller's location */
      const { sellerLocation } = this.props.route.params;
      /* User's location  */
      const { userPosition } = this.props;

      const data = {
          source: userPosition,
          destination: sellerLocation,
          params: [
              {
                  key: 'travelmode',
                  value: 'walking', // may be "walking", "bicycling" or "transit" as well
              },
              {
                  key: 'dir_action',
                  value: 'navigate', // this instantly initializes navigation using the given travel mode
              },
          ],
          waypoints: [],
      };

      getDirections(data);
  };

  render() {
      const { sellerLocation } = this.props.route.params;
      const { name } = this.props.route.params;
      const sellerLocationToDouble = {
          latitude: parseFloat(sellerLocation.latitude),
          longitude: parseFloat(sellerLocation.longitude),
      };

      return (
          <MapView
              style={{ ...styles.mapView, marginBottom: this.state.marginBottom }}
              onMapReady={this.onMapReady}
              zoomControlEnabled={true}
              showsUserLocation={true}
              showsMyLocationButton={true}
              region={{
                  latitude: sellerLocationToDouble.latitude,
                  longitude: sellerLocationToDouble.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}
          >
              <Marker coordinate={sellerLocationToDouble}>
                  <Callout onPress={this.handleGetDirections}>
                      <Text style={styles.sellerNameText}>{name}</Text>
                      <Text style={styles.navigationToSellerText}>
              Directions to the store{' '}
                      </Text>
                  </Callout>
              </Marker>
          </MapView>
      );
  }
}

Map.propTypes = {
    route: PropTypes.object,
    userPosition: PropTypes.object,
};
