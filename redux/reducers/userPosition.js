import { SET_POSITION } from '../actionTypes';

const initialState = {
    userPosition: {
        userLatitude: 'unknown',
        userLongitude: 'unknown',
    },
    isFetchingPosition: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_POSITION: {
        const { userLongitude, userLatitude } = action.payload.userPosition;

        return {
            userPosition: {
                userLongitude,
                userLatitude,
            },
            isFetchingPosition: false,
        };
    }
    default:
        return state;
    }
}
