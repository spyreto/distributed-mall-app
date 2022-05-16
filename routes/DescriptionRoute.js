import React, { Component } from 'react';
import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

import { fetchProductDetails } from '../utils/api';

import store from '../store';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    info: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    infoText: {
        color: colors.grayDark,
        fontSize: 16,
        textAlign: 'justify',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 12,
    },
});

export default class DescriptionRoute extends Component {
  state = {
      productDetails: store.getState().productDetails,
      loading: store.getState().isFetchingProductDetails,
      error: store.getState().error,
  };

  async componentDidMount() {
      const { id, categoryType } = this.props;

      this.unsubscribe = store.onChange(() => this.setState({
          productDetails: store.getState().productDetails,
          loading: store.getState().isFetchingProductDetails,
          error: store.getState().error,
      }));
      const productDetails = await fetchProductDetails(id, categoryType);

      store.setState({ productDetails, isFetchingProductDetails: false });
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  renderInfo = () => {
      const { productDetails } = this.state;
      const { categoryType } = this.props;

      switch (categoryType) {
      case 10:
      case 20:
          return (
              <View>
                  <Text style={styles.label}>Manufacturer:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Material:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Color:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Description:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 30:
          return (
              <View>
                  <Text style={styles.label}>Manufacturer:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.infoText}>{productDetails.typeLabel}</Text>
                  <Text style={styles.label}>Material:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Color:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Description:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 35:
          return (
              <View>
                  <Text style={styles.label}>Manufacturer:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.infoText}>{productDetails.typeLabel}</Text>
                  <Text style={styles.label}>Material:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Color:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Type of closing:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.typeOfClosingLabel}
                  </Text>
                  <Text style={styles.label}>Description:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 40:
          return (
              <View>
                  <Text style={styles.label}>Manufacturer:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Display:</Text>
                  <Text style={styles.infoText}>{productDetails.displayLabel}</Text>
                  <Text style={styles.label}>Μechanism</Text>
                  <Text style={styles.infoText}>{productDetails.mechanismLabel}</Text>
                  <Text style={styles.label}>Face color:</Text>
                  <Text style={styles.infoText}>{productDetails.faceColorLabel}</Text>
                  <Text style={styles.label}>Band color:</Text>
                  <Text style={styles.infoText}>{productDetails.bandColorLabel}</Text>
                  <Text style={styles.label}>Βand material:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.bandMaterialLabel}
                  </Text>
                  <Text style={styles.label}>Water resistance:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.waterResistanceLabel}
                  </Text>
                  <Text style={styles.label}>Description:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      default:
          return null;
      }
  };

  render() {
      const { loading, error } = this.state;

      return (
          <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                  <View style={styles.info}>
                      {loading && <ActivityIndicator size="large" />}
                      {error && <Text>Error...</Text>}
                      {!loading && !error && this.renderInfo()}
                  </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}

DescriptionRoute.propTypes = {
    categoryType: PropTypes.string,
    id: PropTypes.number,
};
