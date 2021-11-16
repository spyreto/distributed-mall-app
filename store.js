import mainFilters from './utils/methods';

let state = {
    isFetchingCategories: true,
    isFetchingProducts: true,
    isFetchingProductDetails: true,
    isFetchingFavorites: true,
    isFetchingUser: true,
    isFetchingPosition: true,
    hasProducts: true,
    categories: [],
    products: [],
    productDetails: {},
    favorites: {},
    user: {},
    filters: {},
    userPosition: {
        userLatitude: 'unknown',
        userLongitude: 'unknown',
    },
    error: false,
    loggedIn: false,
    loggedInToken: null,
};

const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach((listener) => listener());
    },
    onChange(newListener) {
        listeners.push(newListener);
        return () => listeners.filter((listener) => listener !== newListener);
    },

    setFilters(products, filters) {
        const newState = mainFilters(products, filters);
        this.setState({ products: newState });
    },
};
