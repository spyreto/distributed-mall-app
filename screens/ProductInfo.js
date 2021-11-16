import React from 'react';
import { StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import { TabView, TabBar } from 'react-native-tab-view';

import BuyRoute from '../routes/BuyRoute';
import DescriptionRoute from '../routes/DescriptionRoute';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.primaryLight,
        height: 48,
    },
    tabBarLabel: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabIndicator: {
        backgroundColor: colors.primary,
        height: 2,
    },
});

export default class ProductInfo extends React.Component {
  state = {
      isFavorite: false,
      index: 0,
      routes: [
          { key: 'buy', title: 'ΑΓΟΡΑ' },
          { key: 'description', title: 'ΠΕΡΙΓΡΑΦΗ' },
      ],
  };

  handleIndexChange = (index) => this.setState({ index });

  renderTabBar = (props) => (
      <TabBar
          {...props}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
          labelStyle={styles.tabBarLabel}
          pressColor={colors.primaryDark}
      />
  );

  renderScene = ({ route }) => {
      const { product } = this.props.route.params;
      const { navigation } = this.props;

      switch (route.key) {
      case 'buy':
          return <BuyRoute product={product} navigation={navigation} />;
      case 'description':
          return (
              <DescriptionRoute
                  id={product.id}
                  categoryType={product.categoryType}
              />
          );
      default:
          return null;
      }
  };

  render() {
      return (
          <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this.handleIndexChange}
          />
      );
  }
}

ProductInfo.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object,
};
