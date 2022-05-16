import {
    SET_PRODUCTS_DATA,
    CLEAR_PRODUCTS_DATA,
    REMOVE_FAVORITE,
    ADD_FAVORITE,
    ADD_HISTORY_ITEM,
} from '../actionTypes';

import methods from '../../utils/methods';

const initialState = {
    history: [],
    favorites: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_PRODUCTS_DATA: {
        const { favorites, history } = action.payload;

        return {
            favorites,
            history,
        };
    }
    case CLEAR_PRODUCTS_DATA: {
        return {
            history: [],
            favorites: [],
        };
    }
    case REMOVE_FAVORITE: {
        const { id } = action.payload;

        return {
            ...state,
            favorites: state.favorites.filter((item) => {
                if (item.id !== id) {
                    return true;
                }
                if (item.company === undefined) {
                    return false;
                }

                return true;
            }),
        };
    }
    case ADD_FAVORITE: {
        const { favorite } = action.payload;

        return {
            ...state,
            favorites: [...state.favorites, favorite],
        };
    }
    case ADD_HISTORY_ITEM: {
        const {
            product, selectedSeller, quantity, payment,
        } = action.payload;

        const today = new Date();

        const historyItem = {
            id: product.id,
            company: {
                id: selectedSeller.id,
                name: selectedSeller.name,
                location: selectedSeller.location,
            },
            name: product.name,
            image: product.images[0],
            thumbnail: product.thumbnails[0],
            dateAdded: methods.getJSDatetToString(today),
            paidWithMoney: payment,
            quantity,
            sellingPrice: selectedSeller.price * quantity,
            status: 'Waiting for receipt',
            statusCode: 10,
        };

        return {
            ...state,
            history: [historyItem, ...state.history],
            favorites: [historyItem, ...state.favorites],
        };
    }

    default:
        return state;
    }
}
