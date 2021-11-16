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
                  <SizeFilter label="Μέγεθος" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Χρώμα" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Υλικό" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 30:
          return (
              <View>
                  <BoxPickerFilter label="Τύπος" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Υλικό" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Χρώμα" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 35:
          return (
              <View>
                  <BoxPickerFilter label="Τύπος" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Υλικό" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Χρώμα" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Τύπος κλεισίματος" style={styles.filter} />
                  <Divider />
              </View>
          );
      case 40:
          return (
              <View>
                  <BoxPickerFilter label="Λειτουργία" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Μηχανισμός" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Χρώμα καντράν" style={styles.filter} />
                  <Divider />
                  <ColorFilter label="Χρώμα λουριού" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Υλικό λουριού" style={styles.filter} />
                  <Divider />
                  <BoxPickerFilter label="Αδιαβροχοποίηση" style={styles.filter} />
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
                          label="Κατασκευαστής"
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
                              label="ΕΦΑΡΜΟΓΗ"
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
