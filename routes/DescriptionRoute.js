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
                  <Text style={styles.label}>Κατασκευαστής:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Υλικό:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Χρώμα:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Περιγραφή:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 30:
          return (
              <View>
                  <Text style={styles.label}>Κατασκευαστής:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Τύπος:</Text>
                  <Text style={styles.infoText}>{productDetails.typeLabel}</Text>
                  <Text style={styles.label}>Υλικό:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Χρώμα:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Περιγραφή:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 35:
          return (
              <View>
                  <Text style={styles.label}>Κατασκευαστής:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Τύπος:</Text>
                  <Text style={styles.infoText}>{productDetails.typeLabel}</Text>
                  <Text style={styles.label}>Υλικό:</Text>
                  <Text style={styles.infoText}>{productDetails.materialLabel}</Text>
                  <Text style={styles.label}>Χρώμα:</Text>
                  <Text style={styles.infoText}>{productDetails.colorLabel}</Text>
                  <Text style={styles.label}>Τύπος κλεισίματος:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.typeOfClosingLabel}
                  </Text>
                  <Text style={styles.label}>Περιγραφή:</Text>
                  <Text style={styles.infoText}>{productDetails.description}</Text>
              </View>
          );
      case 40:
          return (
              <View>
                  <Text style={styles.label}>Κατασκευαστής:</Text>
                  <Text style={styles.infoText}>{productDetails.manufacturer}</Text>
                  <Text style={styles.label}>Λειτουργία:</Text>
                  <Text style={styles.infoText}>{productDetails.displayLabel}</Text>
                  <Text style={styles.label}>Μηχανισμός:</Text>
                  <Text style={styles.infoText}>{productDetails.mechanismLabel}</Text>
                  <Text style={styles.label}>Χρώμα καντράν:</Text>
                  <Text style={styles.infoText}>{productDetails.faceColorLabel}</Text>
                  <Text style={styles.label}>Χρώμα λουριού:</Text>
                  <Text style={styles.infoText}>{productDetails.bandColorLabel}</Text>
                  <Text style={styles.label}>Υλικό λουριούς:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.bandMaterialLabel}
                  </Text>
                  <Text style={styles.label}>Αδιαβροχοποίηση:</Text>
                  <Text style={styles.infoText}>
                      {productDetails.waterResistanceLabel}
                  </Text>
                  <Text style={styles.label}>Περιγραφή:</Text>
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
                      {error && <Text>Σφάλμα...</Text>}
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
