import store from '../store';

export default {
    getCategoryType(products) {
        const categoryTypes = products.map((x) => x.categoryType);
        if (categoryTypes.every((val, i, arr) => val === arr[0])) {
            return categoryTypes[0];
        }
        return 0;
    },

    getMaxPrice() {
        return Math.max(...store.getState().products.map((x) => x.minPrice));
    },

    getMaxDistance() {
        return Math.max(...store.getState().products.map((x) => x.minDistance));
    },

    getManufacturers() {
        const manufacturers = store.getState().products.map((x) => x.manufacturer);
        return [...new Set(manufacturers)];
    },

    /* Μορφοποίηση απόστασης χλμ ή μέτρα */
    distanceFormating(distance) {
        if (distance >= 1000) {
            return `${Math.round((distance / 1000) * 100) / 100} χλμ`;
        }
        return `${distance} μ`;
    },

    mainFilters(products, filters) {
        let { price, distance, manufacturers } = filters;

        if (price === 0) {
            price = this.getMaxPrice(products);
        }
        if (distance === 0) {
            distance = this.getMaxDistance(products);
        }
        if (manufacturers.length === 0) {
            manufacturers = this.getManufacturers(products);
        }

        return products.filter(
            (x) => price >= x.minPrice
        && distance >= x.minDistance
        && manufacturers.includes(x.manufacturer),
        );
    },

    /* Μορφοποίηση ημερομηνίας σε μορφή dd/mm/yy και yyyy-mm-dd */
    formatPyhtonDate(date) {
        return (
            `${date.getFullYear()
            }-${
                parseInt(date.getMonth() + 1, 10)
            }-${
                date.getDate()}`
        );
    },

    formatJSDate(date) {
        const formatedDate = new Date(date);
        return formatedDate;
    },

    getJSDatetToString(date) {
        return (
            `${date.getDate()
            }/${
                parseInt(date.getMonth() + 1, 10)
            }/${
                date.getFullYear()}`
        );
    },

    formatPhoneNumber(phoneNumber) {
        return `+30${phoneNumber}`;
    },

    isEmpty(str) {
        return !str || str.length === 0;
    },
    /* Έλεγχος εγκυρότητας email */
    validateEmail(email) {
        /* eslint-disable no-useless-escape */
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    /* Έλεγχος εγκυρότητας αριθμού κινητού τηλεφώνου */
    validatePhoneNumber(phoneNumber) {
        const re = /^(69)[0-9]{8}$/;
        return re.test(String(phoneNumber));
    },

    checkPassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[α-ωΑ-Ω-a-zA-Z]).{8,20}$/;
        return passwordRegex.test(password);
    },
};
