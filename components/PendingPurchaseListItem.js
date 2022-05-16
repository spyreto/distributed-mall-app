import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Image,
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
    orderStatusContainer: {},
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

export default function PendingPurchaseListItem({
    item,
    onPress,
}) {
    return (
        <TouchableHighlight underlayColor={colors.grayLight} onPress={onPress}>
            <View style={styles.mainContainer}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.infoContainer}>
                    <View style={styles.productInfoContainer}>
                        <View style={styles.purchaseInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.purchaseDate}>20/12/20</Text>
                            <Text style={styles.sellerName}>{item.seller}</Text>
                        </View>
                        <View style={styles.valueInfo}>
                            {item.payment === 'Money' ? (
                                <Text style={styles.priceEuro}>{item.price} &#8364;</Text>
                            ) : (
                                <View style={styles.pricePointsView}>
                                    <Text style={styles.pricePoints}>{item.price * 200}</Text>
                                    <Image
                                        source={orangePointsImg}
                                        style={styles.imgPoints}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.orderStatusContainer}>
                        <Text style={styles.orderStatusText}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

PendingPurchaseListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
};
