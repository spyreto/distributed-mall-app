import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    img: {
        alignSelf: 'center',
        borderRadius: 6,
        height: 100,
        width: 100,
    },
    imgPoints: {
        height: 12,
        width: 12,
    },
    infoContainer: {
        flex: 1,
    },
    mainContainer: {
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 10,
    },
    orderStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 12,
    },
    orderStatusText: {
        color: colors.gray,
        fontSize: 12,
        textAlign: 'right',
    },
    priceEuro: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    pricePoints: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 5,
    },
    pricePointsView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    productInfoContainer: {
        flexDirection: 'row',
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    purchaseDate: {
        color: colors.gray,
        fontSize: 11,
        marginTop: 2,
    },
    purchaseInfo: {
        flex: 3,
        flexDirection: 'column',
        marginLeft: 12,
        marginVertical: 10,
    },
    quantity: {
        color: colors.gray,
        fontSize: 12,
        marginTop: 2,
    },
    sellerName: {
        color: colors.gray,
        fontSize: 11,
        marginTop: 2,
    },
    valueInfo: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
    },
});

const orangePointsImg = require('../img/orangepoints.png');

export default function HistoryListItem({ item, onPress, navigation }) {
    return (
        <TouchableHighlight underlayColor={colors.grayLight} onPress={onPress}>
            <View style={styles.mainContainer}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.infoContainer}>
                    <View style={styles.productInfoContainer}>
                        <View style={styles.purchaseInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <TouchableOpacity
                                underlayColor={colors.grayLight}
                                onPress={() => {
                                    navigation.navigate('Map', {
                                        name: item.company.name,
                                        sellerLocation: item.company.location,
                                    });
                                }}
                            >
                                <Text style={styles.purchaseDate}>{item.dateAdded}</Text>
                                <Text style={styles.sellerName}>{item.company.name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.valueInfo}>
                            {item.paidWithMoney ? (
                                <Text style={styles.priceEuro}>
                                    {item.sellingPrice} &#8364;
                                </Text>
                            ) : (
                                <View style={styles.pricePointsView}>
                                    <Text style={styles.pricePoints}>
                                        {item.quantity * item.sellingPrice * 200}
                                    </Text>
                                    <Image
                                        source={orangePointsImg}
                                        style={styles.imgPoints}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.orderStatusContainer}>
                        <Text style={styles.quantity}>Ποσότητα: {item.quantity}</Text>
                        <Text style={styles.orderStatusText}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

HistoryListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    navigation: PropTypes.object,
};
