import {
    SIGN_IN,
    SIGN_OUT,
    CHANGE_INFO,
    REFRESH_INFO,
    SET_PRODUCTS_DATA,
    CLEAR_PRODUCTS_DATA,
    REMOVE_FAVORITE,
    ADD_FAVORITE,
    ADD_HISTORY_ITEM,
    SET_POSITION,
} from './actionTypes';

export const signIn = (
    loggedInToken,
    userInfo,
) => ({
    type: SIGN_IN,
    payload: {
        loggedInToken,
        userInfo,
    },
});

export const signOut = () => ({
    type: SIGN_OUT,
});

export const changeInfo = (
    firstName,
    lastName,
    email,
    phoneNumber,
    birthDate,
) => ({
    type: CHANGE_INFO,
    payload: {
        email,
        firstName,
        lastName,
        phoneNumber,
        birthDate,
    },
});

export const refreshInfo = (userInfo) => ({
    type: REFRESH_INFO,
    payload: {
        userInfo,
    },
});

export const setProductsData = (favorites, history) => ({
    type: SET_PRODUCTS_DATA,
    payload: {
        favorites,
        history,
    },
});

export const clearProductsData = () => ({
    type: CLEAR_PRODUCTS_DATA,
});

export const removeFavorite = (id) => ({
    type: REMOVE_FAVORITE,
    payload: {
        id,
    },
});

export const addFavorite = (id, name, image, thumbnail) => ({
    type: ADD_FAVORITE,
    payload: {
        favorite: {
            id, name, image, thumbnail,
        },
    },
});

export const addHistoryItem = (product, selectedSeller, quantity, payment) => ({
    type: ADD_HISTORY_ITEM,
    payload: {
        product,
        selectedSeller,
        quantity,
        payment,
    },
});

export const setPosition = (userPosition) => ({
    type: SET_POSITION,
    payload: { userPosition },
});
