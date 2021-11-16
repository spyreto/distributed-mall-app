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
                options={{ title: 'Αναζήτηση' }}
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
                    title: 'Φίλτρα',
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
                options={{ title: 'Πληροφορίες Προϊόντος' }}
            />
            <SearchRootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'Σύνδεση' }}
            />
            <SearchRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Εγγραφή' }}
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
                options={{ title: 'Αγαπημένα' }}
            />
            <FavoritesRootStack.Screen
                name="ConnectionRequired"
                component={ConnectionRequired}
                options={{
                    title: 'Απαιτείται σύνδεση',
                }}
            />
            <FavoritesRootStack.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{ title: 'Πληροφορίες Προϊόντος' }}
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
                options={{ title: 'Σύνδεση' }}
            />
            <FavoritesRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Εγγραφή' }}
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
                    title: 'Λογαριασμός',
                }}
            />
            <ProfileRootStack.Screen
                name="History"
                component={History}
                options={{
                    title: 'Ιστορικό',
                }}
            />
            <ProfileRootStack.Screen
                name="ProductInfo"
                component={ProductInfo}
                options={{ title: 'Πληροφορίες Προϊόντος' }}
            />
            <ProfileRootStack.Screen
                name="PersonalInfo"
                component={PersonalInfo}
                options={{ title: 'Προφίλ' }}
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
                options={{ title: 'Συχνές ερωτήσεις' }}
            />
            <ProfileRootStack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{ title: 'Επικοινωνία' }}
            />
            <ProfileRootStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: 'Αλλαγή κωδικού',
                }}
            />
            <ProfileRootStack.Screen
                name="ChangeInfo"
                component={ChangeInfo}
                options={{
                    title: 'Αλλαγή στοιχείων',
                }}
            />
            <ProfileRootStack.Screen
                name="ConnectionRequired"
                component={ConnectionRequired}
                options={{
                    title: 'Απαιτείται σύνδεση',
                }}
            />
            <ProfileRootStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'Σύνδεση' }}
            />
            <ProfileRootStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'Εγγραφή' }}
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
                    tabBarLabel: 'Αναζήτηση',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="magnify" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesStack}
                options={{
                    tabBarLabel: 'Αγαπημένα',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Λογαριασμός',
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
