import React from 'react';

import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Search from './screens/Search';
import Results from './screens/Results';
import Map from './screens/Map';
import Filter from './screens/Filter';
import ProductInfo from './screens/ProductInfo';

import Favorites from './screens/Favorites';

import Profile from './screens/Profile';
import History from './screens/History';
import PersonalInfo from './screens/PersonalInfo';
import ChangePassword from './screens/ChangePassword';
import ChangeInfo from './screens/ChangeInfo';
import FAQ from './screens/FAQ';
import ContactUs from './screens/ContactUs';

import ConnectionRequired from './screens/ConnectionRequired';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

import colors from './utils/colors';

const SearchRootStack = createStackNavigator();
const ProfileRootStack = createStackNavigator();
const FavoritesRootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function SearchStack({ navigation }) {
    return (
        <SearchRootStack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 56,
                },
                cardStyle: { backgroundColor: 'white' },
                headerTitleAlign: 'left',
                headerTintColor: colors.black,
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontSize: 20,
                },
            }}
        >
            <SearchRootStack.Screen
                name="Search"
                component={Search}
                options={{ title: 'Search' }}
            />
            <SearchRootStack.Screen
                name="Results"
                component={Results}
                options={({ route }) => ({
                    title: route.params.keyword,
                    headerLeft: () => (
                        <Icon
                            name="arrow-left"
                            size={24}
                            /* eslint-disable react-native/no-inline-styles */
                            style={{ color: colors.black, marginLeft: 16 }}
                            onPress={() => navigation.navigate('Search')}
                        />
                    ),
                    headerRight: () => (
                        <Icon
                            name="filter"
                            size={24}
                            /* eslint-disable react-native/no-inline-styles */
                            style={{ color: colors.black, marginRight: 16 }}
                            onPress={() => navigation.navigate('Filter', {
                                refreshScreen: route.params.refreshScreen,
                                filters: route.params.filters,
                            })
                            }
                        />
                    ),
                })}
            />
            <SearchRootStack.Screen
                name="Map"
                component={Map}
                options={({ route }) => ({
                    title: route.params.name,
                })}
            />
            <SearchRootStack.Screen
                name="Filter"
                component={Filter}
                options={({ route }) => ({
                    title: 'Filters',
                    headerLeft: () => (
                        <Icon
                            name="close"
                            size={24}
                            /* eslint-disable react-native/no-inline-styles */
                            style={{ color: colors.black, marginLeft: 16 }}
                            onPress={() => {
                                route.params.refreshScreen();
                                navigation.navigate('Results', { filters: undefined });
                            }}
                        />
                    ),
                })}
            />
            <SearchRootStack.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{ title: 'Product Info' }}
            />
            <SearchRootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'Sign In' }}
            />
            <SearchRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Sign Up' }}
            />
        </SearchRootStack.Navigator>
    );
}

function FavoritesStack() {
    return (
        <FavoritesRootStack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 56,
                },
                cardStyle: { backgroundColor: 'white' },
                headerTitleAlign: 'left',
                headerTintColor: colors.black,
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontSize: 20,
                },
            }}
        >
            <FavoritesRootStack.Screen
                name="Favorites"
                component={Favorites}
                options={{ title: 'Favorites' }}
            />
            <FavoritesRootStack.Screen
                name="ConnectionRequired"
                component={ConnectionRequired}
                options={{
                    title: 'Sign in required',
                }}
            />
            <FavoritesRootStack.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{ title: 'Product Info' }}
            />
            <FavoritesRootStack.Screen
                name="Map"
                component={Map}
                options={({ route }) => ({
                    title: route.params.name,
                })}
            />
            <FavoritesRootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'Sign In' }}
            />
            <FavoritesRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Sign Out' }}
            />
        </FavoritesRootStack.Navigator>
    );
}

function ProfileStack() {
    return (
        <ProfileRootStack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 56,
                },
                cardStyle: { backgroundColor: 'white' },
                headerTitleAlign: 'left',
                headerTintColor: colors.black,
                headerTitleStyle: {
                    fontWeight: 'normal',
                    fontSize: 20,
                },
            }}
        >
            <ProfileRootStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Account',
                }}
            />
            <ProfileRootStack.Screen
                name="History"
                component={History}
                options={{
                    title: 'History',
                }}
            />
            <ProfileRootStack.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{ title: 'Product Info' }}
            />
            <ProfileRootStack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{ title: 'Account Info' }}
            />
            <ProfileRootStack.Screen
                name="Map"
                component={Map}
                options={({ route }) => ({
                    title: route.params.name,
                })}
            />
            <ProfileRootStack.Screen
                name="FAQ"
                component={FAQ}
                options={{ title: 'FAQ' }}
            />
            <ProfileRootStack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{ title: 'Contact Us' }}
            />
            <ProfileRootStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: 'Change Password',
                }}
            />
            <ProfileRootStack.Screen
                name="ChangeInfo"
                component={ChangeInfo}
                options={{
                    title: 'Change Account Info',
                }}
            />
            <ProfileRootStack.Screen
                name="ConnectionRequired"
                component={ConnectionRequired}
                options={{
                    title: 'Connection required',
                }}
            />
            <ProfileRootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'Sign In' }}
            />
            <ProfileRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Sign Out' }}
            />
        </ProfileRootStack.Navigator>
    );
}

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Search"
            tabBarOptions={{
                style: {
                    backgroundColor: colors.primaryLight,
                    height: 56,
                },
                labelStyle: { fontSize: 12 },
                inactiveTintColor: colors.black,
                activeTintColor: colors.primaryDark,
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="magnify" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesStack}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs;

SearchStack.propTypes = {
    navigation: PropTypes.object,
};

FavoritesStack.propTypes = {
    navigation: PropTypes.object,
};
