import React from 'react';
import {
    StyleSheet, Text, View, ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Button from '../components/Button';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        color: colors.grayDark,
    },
    iconLabelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 32,
    },
    labelText: {
        color: colors.grayDark,
        fontSize: 18,
        paddingVertical: 32,
        textAlign: 'center',
    },
    signInButtonContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 8,
    },
});

/* Login required to view your history */
export default function ConnectionRequired({ label, icon }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.iconLabelContainer}>
                    <Text style={styles.labelText}>{label}</Text>
                    <Icon name={icon} size={120} style={styles.icon} />
                </View>
                <View style={styles.signInButtonContainer}>
                    <Button label="SIGN IN" small={true} />
                </View>
            </View>
        </ScrollView>
    );
}

ConnectionRequired.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.object,
};
