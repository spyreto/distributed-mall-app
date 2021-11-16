import { View, StyleSheet } from 'react-native';
import React from 'react';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        marginHorizontal: 16,
        marginVertical: 16,
    },
});

export default function Devider() {
    return (
        <View
            style={styles.container}
        />
    );
}
