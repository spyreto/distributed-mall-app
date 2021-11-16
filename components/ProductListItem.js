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
    companyName: {
        color: colors.gray,
        fontSize: 11,
        marginTop: 2,
    },
    container: {
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 6,
    },
    distance: {
        color: colors.grayDark,
        fontSize: 11,
        marginTop: 2,
        paddingTop: 2,
    },
    distanceView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    fromText: {
        color: colors.gray,
        fontSize: 9,
        paddingRight: 2,
    },
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
    priceEuro: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    pricePoints: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
        paddingRight: 2,
    },
    pricePointsView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    priceView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    productInfo: {
        flex: 5,
        flexDirection: 'column',
        marginLeft: 12,
        marginVertical: 10,
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    valueInfo: {
        alignItems: 'flex-end',
        flex: 2,
        flexDirection: 'column',
        marginVertical: 10,
    },
});

const dmLogoImg = require('../img/DMlogo.png');

export default function ProductListItem({
    name,
    image,
    minPrice,
    sellers,
    minDistance,
    onPress,
    style,
}) {
    if (sellers.length > 1) {
        return (
            <TouchableHighlight underlayColor={colors.grayLight} onPress={onPress}>
                <View style={{ ...style, ...styles.container }}>
                    <Image source={{ uri: image }} style={styles.img} />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{name}</Text>
                        <Text style={styles.distance}>
              Πλησιέστερο {minDistance}
                        </Text>
                    </View>
                    <View style={styles.valueInfo}>
                        <View style={styles.priceView}>
                            <Text style={styles.fromText}>από </Text>
                            <Text style={styles.priceEuro}>{minPrice} &#8364;</Text>
                        </View>
                        <View style={styles.pricePointsView}>
                            <Text style={styles.pricePoints}>{minPrice * 200}</Text>
                            <Image
                                source={dmLogoImg}
                                style={styles.imgPoints}
                            />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    const sellerName = sellers[0].name;
    return (
        <TouchableHighlight underlayColor={colors.grayLight} onPress={onPress}>
            <View style={{ ...style, ...styles.container }}>
                <Image source={{ uri: image }} style={styles.img} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.companyName}>{sellerName}</Text>
                    <View style={styles.distanceView}>
                        <Text style={styles.distance}>{minDistance}</Text>
                    </View>
                </View>
                <View style={styles.valueInfo}>
                    <View style={styles.priceView}>
                        <Text style={styles.priceEuro}>{minPrice} &#8364;</Text>
                    </View>
                    <View style={styles.pricePointsView}>
                        <Text style={styles.pricePoints}>{minPrice * 200}</Text>
                        <Image
                            source={dmLogoImg}
                            style={styles.imgPoints}
                        />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

ProductListItem.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    minPrice: PropTypes.number,
    sellers: PropTypes.object,
    style: PropTypes.object,
    minDistance: PropTypes.number,
    onPress: PropTypes.func,
};
