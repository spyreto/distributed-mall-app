import {
    SIGN_IN, SIGN_OUT, CHANGE_INFO, REFRESH_INFO,
} from '../actionTypes';

const initialState = {
    loggedIn: false,
    loggedInToken: null,
    pendingPurchases: [],
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

export default function (state = initialState, action) {
    switch (action.type) {
    case SIGN_IN: {
        const { loggedInToken, userInfo } = action.payload;

        return {
            loggedInToken,
            loggedIn: true,
            userInfo,
        };
    }
    case SIGN_OUT: {
        return {
            loggedInToken: null,
            loggedIn: false,
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
    }
    case CHANGE_INFO: {
        const {
            firstName, lastName, email, phoneNumber, birthDate,
        } = action.payload;

        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                email,
                firstName,
                lastName,
                phoneNumber,
                birthDate,
            },
        };
    }
    case REFRESH_INFO: {
        const { userInfo } = action.payload;

        return {
            ...state,
            userInfo,
        };
    }

    default:
        return state;
    }
}
