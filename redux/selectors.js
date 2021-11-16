export const getLoggedInTokenState = (store) => store.loggedInToken;

export const getUserPositionState = (store) => ({
    userPosition: store.userPosition.userPosition,
});

export const getIsFetchingPositionState = (store) => ({
    isFetchingPosition: store.userPosition.isFetchingPosition,
});

export const getLoggedInState = (store) => {
    if (getLoggedInTokenState(store.auth)) {
        return store.auth;
    }
    return {
        loggedIn: false,
        loggedInToken: null,
        userInfo: {
            id: null,
            email: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            birthDate: null,
            gender: null,
            deviceId: null,
            orangePoints: null,
        },
    };
};

export const getUserHistoryState = (store) => {
    if (getLoggedInTokenState(store.auth)) {
        return {
            history: store.products.history,
        };
    }
    return {
        history: [],
    };
};

export const getUserFavoritesState = (store) => {
    if (getLoggedInTokenState(store.auth)) {
        return {
            favorites: store.products.favorites,
        };
    }

    return {
        favorites: [],
    };
};
