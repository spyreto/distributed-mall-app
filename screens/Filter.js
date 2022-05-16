import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

import DistanceSlider from '../components/DistanceSlider';
import PriceSlider from '../components/PriceSlider';
import Divider from '../components/Divider';

import SizeFilter from '../components/SizeFilter';
import ColorFilter from '../components/ColorFilter';
import BoxPickerFilter from '../components/BoxPickerFilter';
import Button from '../components/Button';

import methods from '../utils/methods';
import store from '../store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    distanceSlider: {
        marginTop: 32,
    },
    filter: {
        marginHorizontal: 16,
    },
    submitButton: {
        alignItems: 'center',
        marginVertical: 16,
    },
});

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.products = store.getState().products;
        this.filters = this.props.route.params.filters
            ? this.props.route.params.filters
            : {
                price: 0, distance: 0, manufacturers: [], categoryFilters: {},
            };

        this.maxPrice = methods.getMaxPrice(this.products);
        this.maxDistance = methods.getMaxDistance(this.products);
        this.manufacturers = methods.getManufacturers(this.products);

        this.state = {
            price: this.filters.price,
            distance: this.filters.distance,
            manufacturers: this.filters.manufacturers,
            categoryFilters: this.filters.filters,
        };
    }

  handleDistanceChange = (distance) => {
      this.setState({ distance });
  };

  handlePriceChange = (price) => {
      this.setState({ price });
  };

  handleManufacturersChange = (value) => {
      const manufacturers = [...this.state.manufacturers];

      if (manufacturers.includes(value)) {
          this.setState({
              manufacturers: manufacturers.filter((item) => item !== value),
          });
      } else {
          this.setState({ manufacturers: [...manufacturers, value] });
      }
  };

  handleSubmitButtonPress = () => {
      const { refreshScreen } = this.props.route.params;
      refreshScreen(this.state);
  };

  renderFilters = () => {
      switch (this.props.route.params.categoryType) {
      case 10:
      case 20:
          return (
              <View>
                  <SizeFilter label="Size" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Color" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Material" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 30:
          return (
              <View>
                  <BoxPickerFilter label="Type" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Material" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Color" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 35:
          return (
              <View>
                  <BoxPickerFilter label="Type" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Material" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Color" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Type of closing" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 40:
          return (
              <View>
                  <BoxPickerFilter label="Display" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Μechanism" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Face color" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Band color" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Βand material" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Water resistance" style={styles.filter} />
                  <Divider />
              </View>
          );
      default:
          return null;
      }
  };

  render() {
      const { price, distance, manufacturers } = this.state;

      return (
          <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                  <DistanceSlider
                      onDistanceChange={this.handleDistanceChange}
                      maxDistance={this.maxDistance}
                      value={distance}
                      style={styles.distanceSlider}
                  />
                  <PriceSlider
                      onPriceChange={this.handlePriceChange}
                      maxPrice={this.maxPrice}
                      value={price}
                  />
                  <View>
                      <Divider />
                      <BoxPickerFilter
                          label="Manufacturer"
                          style={styles.filter}
                          values={this.manufacturers}
                          initialSelectedValues={manufacturers}
                          onSelection={this.handleManufacturersChange}
                      />
                      <Divider />
                      {this.renderFilters()}
                      <View style={styles.submitButton}>
                          <Button
                              onPress={this.handleSubmitButtonPress}
                              label="APPLY"
                              small={true}
                          />
                      </View>
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

Filter.propTypes = {
    route: PropTypes.object,
};
