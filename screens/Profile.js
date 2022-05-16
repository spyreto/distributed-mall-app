import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    RefreshControl,
} from 'react-native';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ArrowButton from '../components/ArrowButton';
import Divider from '../components/Divider';

import FadeInView from '../components/FadeInView';
import SpinningImage from '../components/SpinningImage';
import ConnectionRequired from '../components/ConnectionRequired';

import { refreshInfo, setProductsData } from '../redux/actions';

import { getLoggedInState } from '../redux/selectors';

import { getUserInfoApi } from '../utils/api';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fadeInView: {
        alignItems: 'center',
    },
    imgPoints: {
        height: 200,
        width: 200,
    },
    menuContainer: {
        marginVertical: 24,
    },
    points: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
    },
    pointsContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    pointsLabel: {
        color: colors.primary,
        fontSize: 24,
    },
});

const orangePointsImg = require('../img/orangepoints.png');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    onRefresh() {
        const { loggedInToken } = this.props;

        this.setState({ refreshing: true });
        getUserInfoApi(loggedInToken).then((response) => {
            this.props.refreshInfo(response.userInfo);
            this.props.setProductsData(response.favorites, response.history);

            this.setState({ refreshing: false });
        });
    }

    render() {
        const {
            navigation, loggedIn, userInfo,
        } = this.props;
        const { refreshing } = this.state;

        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    loggedIn && (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    )
                }
            >
                {loggedIn ? (
                    <View>
                        <View style={styles.pointsContainer}>
                            <Text style={styles.pointsLabel}>You have collected</Text>
                            <SpinningImage
                                source={orangePointsImg}
                                style={styles.imgPoints}
                                duration={3000}
                            />
                            <FadeInView duration={3000} style={styles.fadeInView}>
                                <Text style={styles.points}>{userInfo.orangePoints}</Text>
                            </FadeInView>
                            <FadeInView duration={4000} style={styles.fadeInView}>
                                <Text style={styles.pointsLabel}>Orange points!</Text>
                            </FadeInView>
                        </View>
                        <View style={styles.menuContainer}>
                            <ArrowButton
                                label="Account info"
                                icon="user-circle"
                                onPress={() => navigation.navigate('PersonalInfo')}
                            />
                            <ArrowButton
                                label="History"
                                icon="history"
                                onPress={() => navigation.navigate('History')}
                            />
                            <Divider />
                            <ArrowButton
                                label="FAQ"
                                icon="question"
                                onPress={() => navigation.navigate('FAQ')}
                            />
                            <ArrowButton
                                label="Contact us"
                                icon="phone"
                                onPress={() => navigation.navigate('ContactUs')}
                            />
                        </View>
                    </View>
                ) : (
                    <ConnectionRequired
                        navigation={navigation}
                        label="Sign in is required to view your account"
                        icon="user"
                        stack="Profile"
                        prevScreen="Profile"
                    />
                )}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { loggedIn, loggedInToken, userInfo } = getLoggedInState(state);

    return {
        loggedInToken,
        loggedIn,
        userInfo,
    };
};

export default connect(mapStateToProps, { refreshInfo, setProductsData })(
    Profile,
);

Profile.propTypes = {
    route: PropTypes.object,
    userInfo: PropTypes.object,
    history: PropTypes.object,
    navigation: PropTypes.object,
    refreshInfo: PropTypes.func,
    loggedInToken: PropTypes.string,
    loggedIn: PropTypes.bool,
    setProductsData: PropTypes.func,
};
