import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    arrow: {
        alignItems: 'center',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        textAlign: 'center',
    },
    dropDown: {
        backgroundColor: colors.white,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    dropDownBox: {
        alignItems: 'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        justifyContent: 'center',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    dropDownDisplay: {
        alignItems: 'center',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    dropDownItem: {
        justifyContent: 'center',
        paddingVertical: 8,
        width: '100%',
    },
    hidden: {
        display: 'none',
        position: 'relative',
    },
    labelStyle: {
        fontSize: 16,
        textAlign: 'center',
    },
    listItemStyle: {
        color: colors.gray,
        fontSize: 16,
        textAlign: 'center',
    },
    noBottomRadius: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    scrollViewContainer: {
        width: '100%',
    },
});

class DropDownPicker extends React.Component {
    constructor(props) {
        super(props);

        let choice;

        if (
            props.defaultNull
      || (Object.prototype.hasOwnProperty.call(props, 'defaultValue') && props.defaultValue === null)
        ) {
            choice = this.null();
        } else if (props.defaultValue) {
            choice = props.items.find((item) => item.value === props.defaultValue);
        } else if (
            props.items.filter(
                (item) => Object.prototype.hasOwnProperty.call(item, 'selected') && item.selected === true,
            ).length > 0
        ) {
            choice = props.items.filter(
                (item) => Object.prototype.hasOwnProperty.call(item, 'selected') && item.selected === true,
            ).shift();
        } else if (props.items.length > 0) {
            choice = props.items[props.defaultIndex ?? 0];
        } else {
            choice = this.null();
        }

        this.state = {
            choice: {
                label: choice.label,
                value: choice.value,
            },
            visible: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultNull === true) {
            return {
                choice: {
                    label: null,
                    value: null,
                },
                visible: props.disabled ? false : state.visible,
            };
        }

        return null;
    }

    null() {
        return {
            label: null,
            value: null,
        };
    }

    toggle() {
        this.setState({
            visible: !this.state.visible,
        });
    }

    select(item, index) {
        this.setState({
            choice: {
                label: item.label,
                value: item.value,
            },
            visible: false,
        });

        this.props.defaultNull = false;

        // onChangeItem callback
        this.props.onChangeItem(item, index);
    }

    getLayout(layout) {
        this.setState({
            top: layout.height - 1,
        });
    }

    render() {
        const { visible, choice } = this.state;
        const { defaultNull, placeholder, disabled } = this.props;
        const label = defaultNull && choice.label === null ? placeholder : choice.label;
        const opacity = disabled ? 0.5 : 1;
        return (
            <View
                style={[
                    this.props.containerStyle,
                    {
                        ...Platform.select({
                            ios: {
                                zIndex: this.props.zIndex,
                            },
                        }),
                    },
                ]}
            >
                <TouchableOpacity
                    onLayout={(event) => {
                        this.getLayout(event.nativeEvent.layout);
                    }}
                    disabled={disabled}
                    onPress={() => this.toggle()}
                    activeOpacity={1}
                    style={
                        visible
                            ? [
                                styles.dropDown,
                                this.props.style,
                                {
                                    flexDirection: 'row',
                                    flex: 1,
                                    borderColor: colors.primary,
                                    borderWidth: 1,
                                },
                            ]
                            : [
                                styles.dropDown,
                                this.props.style,
                                styles.noBottomRadius,
                                {
                                    flexDirection: 'row',
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: colors.gray,
                                },
                            ]
                    }
                >
                    <View style={styles.dropDownDisplay}>
                        <Text
                            style={
                                choice.label === label
                                    ? [styles.labelStyle, { opacity }]
                                    : [styles.labelStyle, { color: colors.gray }, { opacity }]
                            }
                        >
                            {label}
                        </Text>
                    </View>
                    {this.props.showArrow && (
                        <View style={styles.arrow}>
                            <View style={[this.props.arrowStyle, { opacity }]}>
                                {!visible
                                    ? this.props.customArrowUp ?? (
                                        <Icon
                                            name="chevron-down"
                                            size={16}
                                            style={{ color: colors.gray }}
                                        />
                                    )
                                    : this.props.customArrowDown ?? (
                                        <Icon
                                            name="chevron-up"
                                            size={16}
                                            style={{ color: colors.primary }}
                                        />
                                    )}
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                <View
                    style={
                        visible
                            ? [
                                styles.dropDown,
                                styles.dropDownBox,
                                {
                                    top: this.state.top,
                                    maxHeight: this.props.dropDownMaxHeight,
                                    zIndex: this.props.zIndex,
                                    borderColor: colors.primary,
                                    borderWidth: 1,
                                },
                            ]
                            : [
                                styles.dropDown,
                                styles.dropDownBox,
                                styles.hidden,
                                {
                                    top: this.state.top,
                                    maxHeight: this.props.dropDownMaxHeight,
                                    zIndex: this.props.zIndex,
                                    borderColor: colors.gray,
                                },
                            ]
                    }
                >
                    <ScrollView
                        style={[styles.scrollViewContainer, this.props.zIndex]}
                        nestedScrollEnabled={true}
                    >
                        {this.props.items.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => this.select(item, index)}
                                style={[
                                    styles.dropDownItem,
                                    this.props.itemStyle,
                                    choice.value === item.value && this.props.activeItemStyle,
                                ]}
                            >
                                <Text style={styles.listItemStyle}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

DropDownPicker.defaultProps = {
    defaultNull: false,
    placeholder: 'Select an item',
    dropDownMaxHeight: 150,
    style: {},
    containerStyle: {},
    itemStyle: {},
    activeItemStyle: {},
    arrowStyle: {},
    showArrow: true,
    arrowSize: 15,
    customArrowUp: null,
    customArrowDown: null,
    zIndex: 5000,
    disabled: false,
    onChangeItem: () => {},
};

DropDownPicker.propTypes = {
    items: PropTypes.array.isRequired,
    defaultIndex: PropTypes.number,
    defaultValue: PropTypes.any,
    defaultNull: PropTypes.bool,
    placeholder: PropTypes.string,
    dropDownMaxHeight: PropTypes.number,
    style: PropTypes.object,
    containerStyle: PropTypes.object,
    activeItemStyle: PropTypes.object,
    activeLabelStyle: PropTypes.object,
    itemStyle: PropTypes.object,
    showArrow: PropTypes.bool,
    arrowStyle: PropTypes.object,
    arrowSize: PropTypes.number,
    customArrowUp: PropTypes.any,
    customArrowDown: PropTypes.any,
    zIndex: PropTypes.number,
    disabled: PropTypes.bool,
    onChangeItem: PropTypes.func,
};

export default DropDownPicker;
